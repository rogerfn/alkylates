# -*- coding: utf-8 -*-
"""
Created on Sun Apr 10 15:47:41 2022

@author: hufnaglm
"""


import pandas as pd
import numpy as np
import datetime
import sqlite3
from sqlite3 import Error
import pyodbc
import os

try:
    from .helpers import str2nan
except:
    try:
        from helpers import str2nan
    except:
        from utils.helpers import str2nan


class sql_connector:
    def __init__(self):

        driver =  "{PostgreSQL Unicode}"
        self.cstring = f"""DRIVER={driver};SERVER={os.getenv('alk_SERVER')};DATABASE={os.getenv('alk_DB')};UID={os.getenv('alk_USER')};PWD={os.getenv('alk_PASS')}"""
        
    def create_connection(self):
        """ create a database connection to the SQLite database
            specified by the db_file
        :param db_file: database file
        :return: Connection object or None
        """
        conn = None
        # try:
        #     conn = sqlite3.connect(self.db_file)
        # except Error as e:
        #     print(e)
        try:
            conn = pyodbc.connect(self.cstring)
        except Error as e:
            print(e)

        return conn

    
    def excecute_sql(self,command,dtuple=None,returnvalue=True):
        
        conn = self.create_connection()
        cur = conn.cursor()
        try:
            if dtuple != None:
                cur.execute(command,dtuple)
                conn.commit()
                conn.close()
            else:
                cur.execute(command)
                if returnvalue:
                    rows = cur.fetchall()    
                else:
                    rows = []
                conn.commit()
                conn.close()
                if len(rows):
                    return rows
            
        except Error as e:
            print("ERROR: could not run the following")
            print(command)        
            print("ERROR - MESSAGE:..........")
            print(e)
            conn.close()


    def get_homologue_data(self):
        """
        get all homologues (LIMS) data from the database 
    
           
        Returns
        -------
        data_hom : dictionary of data frames
        
        """
        
        command = """ 
            SELECT s.name, f.name, h.name, h.value 
            FROM homologues h
            left join site s on
               h."site_id" = s.id
            left join feedstock f on
               h."feedstock_id" = f.id
        """
        tmp = self.excecute_sql(command)
        data_hom = pd.DataFrame([list(l) for l in tmp])
        data_hom.columns = ['site', 'feedstock', 'homologue', 'value']
        data_hom = data_hom.pivot(index=['site','feedstock'], columns='homologue', values='value')
        data_hom['TNP'] = data_hom.sum(axis=1)
        data_hom = data_hom.reindex(sorted(data_hom.columns), axis=1)
        
        return data_hom
       
    
    def get_dbinput_data(self):
        """
        get all input data from the database 
    
            
        Returns
        -------
        data_in : dictionary of data frames
    
        """
        
        command = """ 
            SELECT s.name, f.name, u.name, u.value 
            FROM user_input_db u
            left join site s on
               u."site_id" = s.id
            left join feedstock f on
               u."feedstock_id" = f.id
        """
        tmp = self.excecute_sql(command)
        data_in = pd.DataFrame([list(l) for l in tmp])
        data_in.columns = ['site', 'feedstock', 'name', 'value']
        data_in = data_in.pivot(index=['site','feedstock'], columns='name', values='value')
        cols = [s.replace('\n',' ') for s in data_in.columns]
        cols = [s if str(s)[-1] !=' ' else str(s) [:-1] for s in cols]
        data_in.columns = cols
        
        return data_in
    
    def get_dbinput_iseditable(self):
        """
        get all input data from the database 
    
        Returns
        -------
        data_in : dictionary of data frames
    
        """
        
        command = """ 
            SELECT s.name, f.name, u.name, u.is_editable 
            FROM user_input_db u
            left join site s on
               u."site_id" = s.id
            left join feedstock f on
               u."feedstock_id" = f.id
        """
        tmp = self.excecute_sql(command)
        data_in = pd.DataFrame([list(l) for l in tmp])
        data_in.columns = ['site', 'feedstock', 'name', 'value']
        data_in = data_in.pivot(index=['site','feedstock'], columns='name', values='value')
        cols = [s.replace('\n',' ') for s in data_in.columns]
        cols = [s if str(s)[-1] !=' ' else str(s) [:-1] for s in cols]
        data_in.columns = cols
        data_in = data_in.replace(np.nan,0)
        data_in = data_in.replace(0,False)
        data_in = data_in.replace(1,True)
        
        return data_in
    
    
    def get_price_data(self):
        """
        get all price (Platts) data from the database 
           
        Returns
        -------
        data_p : data frame
        """
        
        command = """ 
            SELECT c.name, p.date, p.value, u.name, s.name
            FROM price p
            left join commodity c on
               p."commodity_id" = c.id
            left join unit u on
               p."unit_id" = u.id
            left join source s on
               p."source_id" = s.id
        """
        tmp = self.excecute_sql(command)
        data_p = pd.DataFrame([list(l) for l in tmp])
        data_p.columns = ['commodity','date', 'value','unit','source']
        if type(data_p['date'].values[0]) == str:
            data_p['date']=[datetime.datetime.strptime(d,'%d-%m-%Y') for d in data_p['date']]
        data_p = data_p.pivot(index=['commodity','unit','source'], columns='date', values='value')
        
        return data_p
    
    def get_price_is_calculated(self):
        """
        get all price (Platts) data from the database 
           
        Returns
        -------
        data_pc : data frame with 1 and zeor indicating which values need to be calculated
        """
        
        command = """ 
            SELECT c.name, p.date, p.is_calculated, u.name, s.name
            FROM price p
            left join commodity c on
               p."commodity_id" = c.id
            left join unit u on
               p."unit_id" = u.id
            left join source s on
               p."source_id" = s.id
        """
        tmp = self.excecute_sql(command)
        data_pc = pd.DataFrame([list(l) for l in tmp])
        data_pc.columns = ['commodity','date', 'value','unit','source']
        if type(data_pc['date'].values[0]) == str:
            data_pc['date']=[datetime.datetime.strptime(d,'%d-%m-%Y') for d in data_pc['date']]
        data_pc = data_pc.pivot(index=['commodity','unit','source'], columns='date', values='value')
        
        return data_pc
    
    
    def get_input_data(self):
        """
        read all input data from the database
    
    
        Returns
        -------
        df_input_dict : dictionary of dataframes
    
        """
        
        # read Augusta Isosiv planning data
        command = """ 
            SELECT f.name, i.date, i.value, u.name
            FROM isosiv i
            left join feedstock f on
               i."feedstock_id" = f.id
            left join unit u on
               i."unit_id" = u.id
        """
        tmp = self.excecute_sql(command)
        df_ISOSIV = pd.DataFrame([list(l) for l in tmp])
        df_ISOSIV.columns = ['feedstock', 'date', 'value', 'unit']
        if type(df_ISOSIV['date'].values[0]) == str:
            df_ISOSIV['date']=[datetime.datetime.strptime(d,'%d-%m-%Y') for d in df_ISOSIV['date']]
        df_ISOSIV = df_ISOSIV.pivot(index=['feedstock','unit'], columns='date', values='value')
        
        
        # read Sarroc Molex planning data
        command = """ 
            SELECT f.name, m.date, m.value, u.name
            FROM molex m
            left join feedstock f on
               m."feedstock_id" = f.id
            left join unit u on
               m."unit_id" = u.id
        """
        tmp = self.excecute_sql(command)
        df_MOLEX = pd.DataFrame([list(l) for l in tmp])
        df_MOLEX.columns = ['feedstock', 'date', 'value', 'unit']
        if type(df_MOLEX['date'].values[0]) == str:
            df_MOLEX['date']=[datetime.datetime.strptime(d,'%d-%m-%Y') for d in df_MOLEX['date']]
        df_MOLEX = df_MOLEX.pivot(index=['feedstock','unit'], columns='date', values='value')
        
        # read kero Perium data
        command = """ 
            SELECT f.name, kp.date, kp.value, u.name
            FROM kero_premium kp
            left join feedstock f on
               kp."feedstock_id" = f.id
            left join unit u on
               kp."unit_id" = u.id
        """
        tmp = self.excecute_sql(command)
        df_Kero_Prem = pd.DataFrame([list(l) for l in tmp])
        df_Kero_Prem.columns = ['feedstock', 'date', 'value', 'unit']
        if type(df_Kero_Prem['date'].values[0]) == str:
            df_Kero_Prem['date']=[datetime.datetime.strptime(d,'%d-%m-%Y') for d in df_Kero_Prem['date']]
        df_Kero_Prem = df_Kero_Prem.pivot(index=['feedstock','unit'], columns='date', values='value')
        
        # combine all input data in one dictionary
        df_input_dict = {
                         'ISOSIV': df_ISOSIV,
                         'MOLEX':df_MOLEX,
                         'Kero_premium':df_Kero_Prem,
                         }
        
        for key in df_input_dict:
            df_input_dict[key] = df_input_dict[key].rename( index={'Sonatrach plus*': 'Sonatrach add'})
            df_input_dict[key] = df_input_dict[key].rename( index={'EGPC': 'EGCP'})
        
        return df_input_dict
    
    
    
    def upload_used_values(self,table,scenario,data,tabletype):
        modified_at = datetime.datetime.now()    
    
        # drop old tmp data if there are any
        try:
            command = f"""drop table {table}"""
            self.excecute_sql(command,returnvalue=False)
        except:
            pass                        
        
        # melt data to be able to upload them in the right format
        if type(data)==dict:
            if tabletype == 'dbprice':
                data = data['Euro']
                ind = data.index.to_frame() 
                tmp = pd.concat([data,ind],axis=1).reset_index(drop=True)
                tmp = tmp.melt(id_vars=['commodity','unit','source'])
                tmp['scenario'] = scenario
                tmp.rename(columns={'variable': 'date'}, inplace=True)
            if tabletype == 'dbplan':
                tmp = pd.DataFrame()
                for key in data:
                    dk = pd.concat({key: data[key]}, names=['type'])
                    tmp = pd.concat([tmp,dk])
                ind = tmp.index.to_frame() 
                tmp = pd.concat([tmp,ind],axis=1).reset_index(drop=True)
                tmp = tmp.melt(id_vars=['feedstock','unit','type'])
                tmp['scenario'] = scenario
                tmp.rename(columns={'variable': 'date'}, inplace=True)
                
        else:    
            ind = data.index.to_frame() 
            tmp = pd.concat([data,ind],axis=1).reset_index(drop=True)
            if tabletype == 'dbfeed':
                tmp = tmp.melt(id_vars=['site','feedstock'])
                tmp['scenario'] = scenario
        tmp['modified_at'] = modified_at
    
        # create the tmp table
        command = f"""
                       CREATE TABLE {table} (
                  """
        fc = ''          
        for col in tmp:
            if 'id' in col:
                if col=='id':
                    print(table)
                    c = f""" id INTEGER PRIMARY KEY AUTOINCREMENT,"""
                else:
                    foreign_table = col.split('_id')[0].lower().replace(' ','_')
                    c = f"""{col.lower().replace(' ','_')} INTEGER,"""
                    fc = fc+f"""    FOREIGN KEY({col.lower().replace(' ','_')}) REFERENCES {foreign_table}(id),"""
            elif ('date' == col) or (col=='modified_at'):
                c = f""""{col.lower().replace(' ','_')}" datetime,"""
            else:
                try:
                    tmp[col].astype(float)
                    isfloat=True
                except:
                    isfloat=False
                    
                if isfloat:
                    c = f""" {col.lower().replace(' ','_')} float,"""       
                else:
                    c = f""" {col.lower().replace(' ','_')} VARCHAR(1000),"""       
            command = command + c         
        command = command + fc
        if command[-1]==',':
            command = command[:-1]
        command = command + '   );'
        self.excecute_sql(command,returnvalue=False)
        
        for col in tmp:
            if ('date' in col) or (col=='modified_at'):
                tmp[col] = [datetime.datetime.strftime(d,'%d-%m-%Y') for d in pd.to_datetime(tmp[col].values)]
    
        # make fastupload to the data base to be able to do all updates and comparisons there
        values = [tuple(row) for row in tmp.values]
        conn = self.create_connection()
        cur = conn.cursor()
        
        try:
            cur.executemany(f"""insert into {table}({','.join(tmp.columns)}) values ({'?,'*(len(tmp.columns)-1)+'?'})""", values)
            conn.commit()
        except:
            print('ERROR: cannot do executemany')
            pass
        conn.close()
    
        [isin,sid] = self.check_scenario(scenario)
    
        if tabletype == 'dbfeed':
            self.update_scenario_dbtable(isin,sid)
        elif  tabletype == 'dbprice':
            self.update_scenario_dbprice(isin,sid)
        elif  tabletype == 'dbplan':
            self.update_scenario_dbplan(isin,sid)
    
    
    def check_scenario(self, scenario):
        #modified_at = datetime.datetime.strftime(datetime.datetime.now(),'%d-%m-%Y')
        modified_at = datetime.datetime.now()
        #add new scenario if needed
        command = f"""SELECT * from scenario 
                      WHERE name ='{scenario}'"""
        res = self.excecute_sql(command)
        if (res != None) and (len(res) > 0):
            sid = res[0][0]
            isin = True
        else:
            isin = False
        command = f"""INSERT INTO scenario (name, modified_at)
                    SELECT ?,?
                    WHERE NOT EXISTS (SELECT 1 FROM scenario WHERE name = '{scenario}');
                  """
        vals = (scenario,modified_at)
        self.excecute_sql(command,vals,returnvalue=False)
        
        
        command = f"""SELECT * from scenario 
                      WHERE name ='{scenario}'"""
        res = self.excecute_sql(command)
        return isin,sid
    
    
    def update_scenario_dbtable(self,isin,sid):
        modified_at = datetime.datetime.now()    
        # convert sites into site id    
        command = """UPDATE tmp SET site = (SELECT id FROM site WHERE name = tmp.site)"""
        self.excecute_sql(command,returnvalue=False)
    
        command = """UPDATE tmp SET feedstock = (SELECT id FROM feedstock WHERE name = tmp.feedstock)"""
        self.excecute_sql(command,returnvalue=False)
    
        # change scneario name to ID
        command = """UPDATE tmp SET scenario = (SELECT id FROM scenario WHERE name = tmp.scenario)"""
        self.excecute_sql(command,returnvalue=False)
    
    
        # insert if scenario did not exist otherwise remove all old values for this
        # scenario and insert the new ones
        if isin:
            command = f""" delete from scenario_db_values
                           where scenario_id = {sid}
                       """
            self.excecute_sql(command,returnvalue=False)
    
        command = f""" INSERT INTO scenario_db_values (site_id,feedstock_id,name,value,scenario_id,modified_at) 
                       SELECT site,feedstock,variable,value,scenario,modified_at 
                       FROM tmp
                   """
        self.excecute_sql(command,returnvalue=False)
    
    
    def update_scenario_dbprice(self,isin,sid):
        
        # convert sites into site id    
        command = """UPDATE tmp SET unit = (SELECT id FROM site WHERE name = tmp.unit)"""
        self.excecute_sql(command,returnvalue=False)
    
        command = """UPDATE tmp SET source = (SELECT id FROM source WHERE name = tmp.source)"""
        self.excecute_sql(command,returnvalue=False)
    
        command = """UPDATE tmp SET commodity = (SELECT id FROM commodity WHERE name = tmp.commodity)"""
        self.excecute_sql(command,returnvalue=False)
    
     
        # change scneario name to ID
        command = """UPDATE tmp SET scenario = (SELECT id FROM scenario WHERE name = tmp.scenario)"""
        self.excecute_sql(command,returnvalue=False)
    
    
        # insert if scenario did not exist otherwise remove all old values for this
        # scenario and insert the new ones
        if isin:
            command = f""" delete from scenario_price_values
                           where scenario_id = {sid}
                       """
            self.excecute_sql(command,returnvalue=False)
    
        command = f""" INSERT INTO scenario_price_values 
                           (commodity_id, source_id,unit_id,date,value,scenario_id,modified_at) 
                       SELECT commodity, source, unit, date, value, scenario, modified_at
                       FROM tmp
                   """
        self.excecute_sql(command,returnvalue=False)
    
    
    
    def update_scenario_dbplan(self,isin,sid):
        
        # convert sites into site id    
        command = """UPDATE tmp SET unit = (SELECT id FROM site WHERE name = tmp.unit)"""
        self.excecute_sql(command,returnvalue=False)
    
        command = """UPDATE tmp SET feedstock = (SELECT id FROM feedstock WHERE name = tmp.feedstock)"""
        self.excecute_sql(command,returnvalue=False)
    
     
        # change scneario name to ID
        command = """UPDATE tmp SET scenario = (SELECT id FROM scenario WHERE name = tmp.scenario)"""
        self.excecute_sql(command,returnvalue=False)
    
    
        # insert if scenario did not exist otherwise remove all old values for this
        # scenario and insert the new ones
        if isin:
            command = f""" delete from scenario_plan_values
                           where scenario_id = {sid}
                       """
            self.excecute_sql(command,returnvalue=False)
    
        command = f""" INSERT INTO scenario_plan_values 
                           (feedstock_id, date, value, unit_id, type, scenario_id, modified_at) 
                       SELECT feedstock, date, value, unit, type, scenario, modified_at
                       FROM tmp
                   """
        self.excecute_sql(command,returnvalue=False)
        
        
    def reset_database_from_excel_dbfile(self):        

        xls_path ='\\'.join(self.db_file.split('\\')[:-1]+['database.xlsx'])
        xls = pd.ExcelFile(xls_path)
        conn = self.create_connection()

        primtables = ['scenario','site','feedstock','source','commodity','unit']        
        sectables = [s for s in xls.sheet_names if s not in primtables]
        primtables = [s for s in xls.sheet_names if s in primtables]
        
        for sheet in sectables:
            sheet = sheet.lower().replace(' ','_')
            try:
                command = f'Drop Table {sheet};'
                self.excecute_sql(command,returnvalue=False)
                print(f'Dropping {sheet}')
            except:
                print(f'cannot drop {sheet}')
                pass

        for sheet in primtables:
            sheet = sheet.lower().replace(' ','_')
            try:
                command = f'Drop Table {sheet};'
                self.excecute_sql(command,returnvalue=False)
                print(f'Dropping {sheet}')
            except:
                print(f'cannot drop {sheet}')
                pass

        for sheet in xls.sheet_names:
            sheet = sheet.lower().replace(' ','_')
            data = pd.read_excel(xls_path,sheet_name=sheet)
            data.columns = [col.lower().replace('\n',' ').replace(' ','_') for col in data]

            command = f"""CREATE TABLE {sheet} ("""
            fc = ''          
            for col in data:
                if 'id' in col:
                    if col=='id':
                        print(sheet)
                        c = f""" id INTEGER PRIMARY KEY,"""
                    else:
                        foreign_table = col.split('_id')[0].lower().replace(' ','_')
                        c = f"""{col.lower().replace(' ','_')} INTEGER,"""
                        fc = fc+f"""    FOREIGN KEY({col.lower().replace(' ','_')}) REFERENCES {foreign_table}(id),"""
                elif ('date' == col) or ('modified_at' == col):
                    c = f""""{col.lower().replace(' ','_')}" date,"""
                elif ('calculated' in col.lower()) or ('editable' in col.lower()):
                    c = f""""{col.lower().replace(' ','_')}" integer,"""
                    
                else:
                    try:
                        data[col].astype(float)
                        isfloat=True
                    except:
                        isfloat=False
                        
                    if isfloat:
                        c = f""" {col.lower().replace(' ','_')} float,"""       
                    else:
                        c = f""" {col.lower().replace(' ','_')} VARCHAR(1000),"""       
                command = command + c         
            command = command + fc
            if command[-1]==',':
                command = command[:-1]
            command = command + '   );'
            self.excecute_sql(command,returnvalue=False)
        
    
        print('-------------------------')
        for sheet in xls.sheet_names:
            print(sheet)
            sheet = sheet.lower().replace(' ','_')
            data = pd.read_excel(xls_path,sheet_name=sheet)
            data.columns = [col.lower().replace('\n',' ').replace(' ','_') for col in data]
            data['modified_at'] = datetime.datetime.now()
            for col in data:
                if ('date' in col) or ('modified_at' == col):
                    if ('date' in col):
                        data[col] = [datetime.datetime.strptime(d,'%b-%y') for d in data[col].values]
                    #data[col] = [datetime.datetime.strftime(d,'%d-%m-%Y ') for d in pd.to_datetime(data[col].values)]
                    data[col] = [datetime.datetime.strftime(d,'%m-%d-%Y ') for d in pd.to_datetime(data[col].values)]
    
            #data = data.drop('id',axis = 1)
            sheet = sheet.lower().replace('\n',' ')
            colnames = [col.lower().replace('\n',' ').replace(' ','_') for col in data]
            #colnames = f"'" + "','".join(colnames) + "'"
            colnames = ",".join(colnames) 
            for i,row in enumerate(data.index.values):
                command = f""" INSERT INTO {sheet} ({colnames}) VALUES ({','.join(["?" for col in data])})"""
                #command = f""" INSERT INTO {sheet} ({colnames}) VALUES ({','.join(["%s" for col in data])})"""
                dtuple = tuple([int(v) if (('id' in data.columns.values[i]) or  
                                           ('calculated' in data.columns.values[i]) or
                                           ('editable' in data.columns.values[i]))
                                 else v for i,v in enumerate(data.loc[row].values)])
                self.excecute_sql(command,dtuple,returnvalue=False)
    
    
            
    
    
    
    
    
    
    
    
    
    
    
    
    
    