# -*- coding: utf-8 -*-
"""
Created on Sun Apr 10 15:50:10 2022

@author: hufnaglm
"""

import pandas as pd
import numpy as np
import datetime
from copy import deepcopy

try:
    #from .sql_connector import sql_connector
    from .read_complete_input_files import read_complete_input_data
except:
    try:
        #from .sql_connector import sql_connector
        from .read_complete_input_files  import read_complete_input_data
    except:
        #from .sql_connector import sql_connector
        from .read_complete_input_files import read_complete_input_data



class make_calculations:
    def __init__(self,data_hom, data_in, data_p,
                 df_plan_dict, show_res=False):

        self.show_res = show_res
        
        # these are the interemediate and final calculation steps which are available
        self. res_categories = ['Return Stream Price',
                                'Feedstock Price',
                                'Feedstock Premium',
                                'Energy Costs',
                                'Other Costs',
                                'np value in feed',
                                'Variable Costs',
                                'Adder',
                                'LnP Production']

        print('Reading input data')

        # load data base data (mainly LIMS)
        self.df_dbfeed = pd.concat([deepcopy(data_hom),deepcopy(data_in)],axis=1)
        self.df_RMprice = deepcopy(data_p)
        self.df_plan_dict = deepcopy(df_plan_dict)
        
        # set the levels and keys of the dictionary that stores the results
        self.dates = self.df_RMprice['Dollar'].columns.values
        self.currencies = [key for key in self.df_RMprice]
        self.sites = self.df_dbfeed.index.unique(level='site').values
        self.sites_feedstocks={}
        for site in self.sites:
            self.sites_feedstocks[site] = \
                self.df_dbfeed.loc[site].index.unique(level='feedstock').values
    
    
    def update_res(self):

        # caluclate the Sonatrach Plus data and show them
        self.sona_plus_dict = self.calc_sonatrach_plus_prices()
               
        # calculate the results for the different steps and intermediate results 
        # shown in the spreadsheet
        self.res = self.setup_res_dict()
        
        # add feedstock data to res dict
        self.add_feedstock()
        
        # calculate all values and store them in a dictionary
        self.calculate_all_values()
                        
        if self.show_res:
            self.plot_sonatrach_plus_prices()
            self.show_values_2_compare_with_excel()    
            
            
    def setup_res_dict(self):
        df_result_dict = {}
        for rc in self.res_categories:
            df_result_dict[rc] = {}
            for currency in self.currencies:
                df_result_dict[rc][currency] = {}
                for site in self.sites_feedstocks:
                    df_result_dict[rc][currency][site] = \
                        pd.DataFrame(index=self.sites_feedstocks[site], 
                                     columns=self.dates)
        return df_result_dict

    
    def calculate_all_values(self):
        for currency in self.currencies:
            for site in self.sites_feedstocks:
                for fs in self.sites_feedstocks[site]:
                    for date in self.dates:
                        self.calc_add_res(currency, site, fs, date) 
                        

    def add_feedstock(self):
        site='Augusta'
        inputs='ISOSIV'
        multiplier = self.df_dbfeed.loc[site]['Useful LnP TnP']
        tmp  = self.df_plan_dict[inputs].copy()
        aug = pd.DataFrame(tmp.values*multiplier.values.reshape(-1,1),
                           columns = tmp.columns,
                           index = tmp.index)
        #aug = pd.concat({site: aug}, names=['site'])
        aug = aug.replace(np.nan,0)
        self.res['LnP Production']['Dollar'][site] = aug
        self.res['LnP Production']['Euro'][site] = aug
        
        site='Sarroch'
        inputs='MOLEX'
        multiplier = self.df_dbfeed.loc[site]['Useful LnP TnP']
        tmp  = self.df_plan_dict[inputs].copy()
        sar = pd.DataFrame(tmp.values*multiplier.values.reshape(-1,1),
                           columns = tmp.columns,
                           index = tmp.index)
        sar = sar.replace(np.nan,0)
        self.res['LnP Production']['Dollar'][site] = sar
        self.res['LnP Production']['Euro'][site] = sar
    
    
    def calc_add_res(self,currency, site, fs, date):
        
        # Calculate Return Stream Price
        self.res['Return Stream Price'][currency][site].loc[fs,date] = \
            self.get_return_stream_price(date, currency, site, fs)
            
        # Calculate Return Feedstock premium @ escalation density
        try:
            LnP = self.res['LnP Production'][currency][site].loc[fs,date].values[0]
        except:
            LnP=0
        LnP = 0 if np.isnan(LnP) else LnP
        self.res['Feedstock Premium'][currency][site].loc[fs,date] =\
            self.get_feedstock_prem(LnP, date, currency, site, fs)
            
        # calculate price 
        FP = self.res['Feedstock Premium'][currency][site].loc[fs,date]
        FP = 0 if np.isnan(FP) else FP
        self.res['Feedstock Price'][currency][site].loc[fs,date] = \
            self.get_feedstock_price(FP, date, currency, site, fs)
            
        # Energy costs
        self.res['Energy Costs'][currency][site].loc[fs,date] = \
            self.get_energy_price(date, currency, site, fs)
        # Other costs
        self.res['Other Costs'][currency][site].loc[fs,date] = \
            self.get_other_costs(date, currency, site, fs)
            
        # nP value in the feed
        FP = self.res['Feedstock Price'][currency][site].loc[fs,date]
        FP = 0 if np.isnan(FP) else FP
        RSP = self.res['Return Stream Price'][currency][site].loc[fs,date] 
        RSP = 0 if np.isnan(RSP) else RSP
        self.res['np value in feed'][currency][site].loc[fs,date] = \
            self.get_nP_value_in_feed(FP, RSP, date, currency, site, fs)                
        # nP variable costs    
        a = self.res['np value in feed'][currency][site].loc[fs,date]
        b = self.res['Energy Costs'][currency][site].loc[fs,date]
        c = self.res['Other Costs'][currency][site].loc[fs,date]
        self.res['Variable Costs'][currency][site].loc[fs,date] = a + b + c
        
        # ADDER
        VC =  self.res['Variable Costs'][currency][site].loc[fs,date]
        self.res['Adder'][currency][site].loc[fs,date] = \
            self.get_adder(VC, date, currency, site, fs)                


    def get_from_dbfeed(self, site='Augusta', feedstock='Sonatrach',
                        col='density feed (kg/mc)'):
        """
        get a single value from the database feed dataframe 
    
        Parameters
        ----------
        df_dbfeed : dictionary of dataframes
        site : strin
            DESCRIPTION. The default is 'Augusta'.
        feedstock : string
            DESCRIPTION. The default is 'Sonatrach'.
        col : string
            DESCRIPTION. The default is 'density feed (kg/mc)'.
    
        Returns
        -------
        val : float
        """    
        
        val = self.df_dbfeed.loc[site].loc[feedstock].loc[col]
        error = False
        while (type(val)==np.ndarray) and error==False:
            if len(val)>1:
                error = True
            else:    
                val = val[0]
        if error:
            print('There was more than one value for that request')
            stop
        else:    
            return val
    
    
    def calc_Sonatrach(self,currency='Dollar', whichone='base'):
        """
        calculate the numbers shown in the Sonatrach Plus Sheet
    
        Parameters
        ----------
        df_RMprice : dictionary of dataframes with price data
        df_dbfeed : dictionary of dataframes with input data
        currency : string
            DESCRIPTION. The default is 'Dollar'.
        whichone : string
            DESCRIPTION. The default is 'base'.
    
        Returns
        -------
        mydict : dictionary with price, premium and total values
        """
        
        whichone = whichone.lower().replace(' ','_')
        date = self.df_RMprice[currency].loc['Jet High FOB Med'].columns.values
        price = self.df_RMprice[currency].loc['Jet High FOB Med'].values[0]
        qual = self.get_from_dbfeed(site='Augusta', 
                                    feedstock='Sonatrach',
                                    col='density feed (kg/mc)')
        if whichone == 'base':
            premium = ((price+17.5)*0.8/qual-price)
        elif whichone == 'ulsd':
            premium = ((price+11)*0.845/qual-price)
        elif whichone == 'price_floor':
            premium = ((price+17.5-10)*0.8/qual-price)-4
        elif whichone == 'cup':
            premium = ((price+17.5)*0.8/qual-price)+15
        total = price + premium
    
        mydict = {}
        mydict['price'] = price
        mydict['premium'] = premium
        mydict['total'] = total
        
        return mydict
    
    
    def calc_sonatrach_plus_prices(self):
        """
        calculate the numbers shown in the Sonatrach Plus Sheet
    
        Parameters
        ----------
        df_RMprice : dictionary of dataframes with price data
        df_dbfeed : dictionary of dataframes with input data
    
        Returns
        -------
        sona_plus_dict : dictionary of data frames
            contains the Sonatrac Base, Price ULSD, Price Floor, Price CUP
    
        """
        sona_plus_dict={}
        sona_plus_dict['date'] = self.df_RMprice['Dollar'].columns.values
        
        sona_plus_dict['Sonatrach Base'] = self.calc_Sonatrach(currency='Dollar', 
                                                               whichone='base')
        sona_plus_dict['Price ULSD'] = self.calc_Sonatrach(currency='Dollar',
                                                           whichone='ulsd')
        sona_plus_dict['Price Floor'] = self.calc_Sonatrach(currency='Dollar', 
                                                            whichone='price_floor')
        sona_plus_dict['Price CUP'] = self.calc_Sonatrach(currency='Dollar', 
                                                          whichone='cup')
    
        return sona_plus_dict
    
    
    def plot_sonatrach_plus_prices(self):
        """
        reproduce the graph shown in the Sonatrach Plus Sheet
    
        Parameters
        ----------
        sona_plus_dict : TYPE
            DESCRIPTION.
    
        Returns
        -------
        None.
    
        """
        df = pd.DataFrame()
        for i in self.sona_plus_dict:
            if i != 'date':
                tmp = pd.DataFrame(index = self.sona_plus_dict['date'],
                                  data= self.sona_plus_dict[i]['total'])
                df = pd.concat([df,tmp],axis=1)
        df.plot()
    
    
    def get_from_price_table(self,curr='Euro', ind='VN AU', 
                             date=pd.Timestamp('2019-09-01 00:00:00')):
        try:
            return self.df_RMprice[curr].loc[ind,:][date].values[0]
        except:
            print(f'ERROR: self.get_from_price_table for {curr, ind, date}')
            return 0
        
    
    def get_from_db(self,col="Premium Return (S/mt)",site='Augusta', fs='Trafigura'):
        try:
            return self.df_dbfeed.loc[site].loc[fs].loc[col]
        except:
            print(f'ERROR: get_from_db for {site, fs, col}')
            return 0
        
        
    def get_from_input_table(self,category='Kero_premium',
                             fs='',date=datetime.datetime.now()):
        try:
            return self.df_plan_dict[category].loc[fs][date].values[0]                          
        except:
            #print(f'ERROR: get_from_input_table for {category, fs, date}')
            return 0 


    def get_feedstock_prem(self,LnP, date, currency, site, fs):
        res = 0
        multiplier = {'Augusta':0.8,
                      'Sarroch':0.845}
        if LnP > 0:
            if site == 'Augusta':
                a = self.get_from_db(col='Premium kero ($/mt) Med-Term',
                                site=site, fs=fs)
                b = self.get_from_price_table(curr='Dollar', 
                                     ind='Jet High FOB Med',date=date)
                c = self.get_from_price_table(curr='Dollar', 
                                     ind='ULSD 10ppmS FOB Med Cargo',date=date)
                k = self.get_from_input_table(category='Kero_premium', 
                                     fs=fs,date=date)
                d = self.get_from_db(col="density feed (kg/mc)",
                                site=site, fs=fs)
                e = self.get_from_price_table(curr='Dollar', 
                                     ind='Ex, rate',date=date)
        
                if fs == 'Sonatrach':
                    res = (a + b) * (multiplier[site]/d) - b
                elif 'Sonatrach plus' in fs:
                    res = ((a + c)* (0.845/d) -b)
                elif 'Sonatrach add' in fs:
                    res = (a + b)* (multiplier[site]/d) - b
                else:
                    res = (k + b) * (multiplier[site]/d) - b
        
        
            elif site == 'Sarroch':
                a = self.get_from_price_table(curr='Dollar', 
                                     ind='Gasoil 0,1% High FOB Med',date=date)
                b = self.get_from_db(col='Premium kero ($/mt) Med-Term',
                                site=site, fs=fs)
                d = self.get_from_db(col="density feed (kg/mc)",
                                site=site, fs=fs)
                f = self.get_from_price_table( curr='Dollar', 
                                     ind='Jet High FOB Med',date=date)
                g = self.get_from_price_table(curr='Dollar', 
                                     ind='ULSD 10ppmS CIF NWE Cargo',date=date)
                e = self.get_from_price_table(curr='Dollar', 
                                     ind='Ex, rate',date=date)
                if ('Gal a BuAttifel' in fs) or  ('Gal a Azeri' in fs):
                    res = (a*multiplier[site]/d-a+b)
                elif  ('Gal a NIL/Amna' in fs):
                    res = ((b+f)*(0.8/d)-f)
                elif  ('kero' in fs):
                    res = (f*multiplier[site]/d-f+b)
                elif  ('Chevron' in fs):
                    res = (g+9)*(multiplier[site]/d)-g+30
        
            if currency == 'Euro':
                res = res/e
        return res
        
    
    def get_return_stream_price(self, date, currency, site, fs):
        res = 0
        multiplier = {'Augusta':0.8,
                      'Sarroch':0.845}
        
        a = self.get_from_price_table(curr='Dollar', ind='Jet High FOB Med',date=date)
        b = self.get_from_db(col="Premium Return (S/mt)",site=site, fs=fs)
        c = self.get_from_price_table(curr='Dollar', ind='Gasoil 0,1% High FOB Med',date=date)
        f = self.get_from_price_table(curr='Dollar', ind='ULSD 10ppmS FOB Med Cargo',date=date)
        d = self.get_from_db(col="density return (kg/mc)",site=site, fs=fs)
        e = self.get_from_price_table(curr='Dollar',ind='Ex, rate',date=date)
        if site == 'Augusta':
            res = (a+b)*(multiplier[site]/d)/e
        elif site == 'Sarroch':
            if 'Gal' in fs:
                res = (c*multiplier[site]/d)/e
            elif 'kero' in fs:
                res = (a*multiplier[site]/d)
            elif 'Chevron' in fs:
                res = ((f+b)*multiplier[site]/d)/e
        if currency == 'Dollar':        
           res = res*e    
    
        return res
        
  
    def get_feedstock_price(self, Feedstock_Prem, date, currency, site, fs):
        res = 0
        a = self.get_from_price_table(curr='Dollar', 
                             ind='Jet High FOB Med',date=date)
        b = self.get_from_price_table(curr='Dollar', 
                             ind='Gasoil 0,1% High FOB Med',date=date)
        c = self.get_from_price_table(curr='Dollar', 
                             ind='ULSD 10ppmS CIF NWE Cargo',date=date)
        e = self.get_from_price_table(curr='Dollar', 
                             ind='Ex, rate',date=date)
        if site == 'Augusta':
            if currency == 'Euro':
                res = Feedstock_Prem + a/e
            else:
                res = Feedstock_Prem + a
    
        elif site == 'Sarroch':
            if 'Gal' in fs:
                if currency == 'Euro':
                    res = Feedstock_Prem + b/e
                else:
                    res = Feedstock_Prem + b
            elif 'kero' in fs:
                if currency == 'Euro':
                    res = Feedstock_Prem + a/e
                else:
                    res = Feedstock_Prem + a
            elif 'Chevron' in fs:
                if currency == 'Euro':
                    res = Feedstock_Prem + c/e
                else:
                    res = Feedstock_Prem + c
        return res
    
    
    def get_energy_price(self, date, currency, site, fs):
        res = 0
        e = self.get_from_price_table(curr='Dollar', 
                             ind='Ex, rate',date=date)
        if site == 'Augusta':
            a = self.get_from_db(col='NG yield',
                            site=site, fs=fs)
            b = self.get_from_price_table(curr=currency, 
                                 ind='Natural gas EU Aug',date=date)
            c = self.get_from_db(col='Electricity yield',
                            site=site, fs=fs)
            d = self.get_from_price_table(curr=currency, 
                                 ind='Electricity Augusta',date=date)
            res = a*b + c*d
        elif site == 'Sarroch':
            a = self.get_from_db(col='Electricity yield',
                            site=site, fs=fs)
            b = self.get_from_price_table(curr=currency, 
                                 ind='Natural gas SARROCH',date=date)
            res = a*b
        if currency == 'Dollar':
            res = res/e
    
        return res
    
    
    def get_other_costs(self, date, currency, site, fs):
        res = 0
        e = self.get_from_price_table(curr='Dollar', 
                             ind='Ex, rate',date=date)
        if site == 'Augusta':
            f = self.get_from_price_table(curr=currency, 
                                 ind='Hydrogen price',date=date)
            res = f*22
        elif site == 'Sarroch':
            b = self.get_from_price_table(curr=currency, 
                                 ind='Natural gas SARROCH',date=date)
            c = self.get_from_db(col='H2 rich gas yield',
                            site=site, fs=fs)
            res = c*1.5*b*1000+4*b/0.312
    
        if currency == 'Dollar':
            res = res/e
            
        return res            
    
    
    def get_nP_value_in_feed(self, Feedstock_Price, Return_Stream_Price, date, 
                             currency, site, fs):
    
        VN_price = self.get_from_price_table(curr='Euro', 
                                            ind='VN AU', date=date)
        Gasoil_price = self.get_from_price_table(curr='Euro', 
                                            ind='Gasoil AU',date=date)
        Benzinetta_price = self.get_from_price_table(curr='Euro', 
                                            ind='Benzinetta',date=date)
        
        res =  0
        a = Feedstock_Price
        b = self.get_from_db(col='Feed yield (mt/mt)',
                        site=site, fs=fs)
        c = Return_Stream_Price
        d = self.get_from_db(col='Return yield (mt/mt)',
                        site=site, fs=fs)
        e = self.get_from_db(col='Gasoil yield (ton/ton)',
                        site=site, fs=fs)
        f = self.get_from_db(col='VN yield (ton/ton)',
                        site=site, fs=fs)
        g = self.get_from_db(col='Benzinetta yield (mt/mt)',
                        site=site, fs=fs)
        if site == 'Augusta':
            res = (a*b)-(c*d+Gasoil_price*e+VN_price*f)
    
        elif site == 'Sarroch':
            res = (a*b)-(c*d + Benzinetta_price*g)
        
        return res
    
    
    def get_adder(self, Variable_Costs, date, currency, site, fs):
        res = 0
        a = Variable_Costs
        b = self.get_from_price_table(curr='Dollar', 
                             ind='Jet High FOB Med',date=date)
        e = self.get_from_price_table(curr='Dollar', 
                             ind='Ex, rate',date=date)
        if currency == 'Euro':
            res = a-b/e
        else:
            res = a*e-b
        return res    
    
    
    def show_values_2_compare_with_excel(self):
        sorter = ['Trafigura','Sonatrach','Sonatrach plus','Sonatrach add','Ras Lanuf',
                  'Ras Laffan','ENI Livorno','EGCP','Jubail','ENI Taranto','Ruwais',
                  'Zawia','Skikda']
        print(self.res['Return Stream Price']['Euro']['Augusta'].loc[sorter])
        print(self.res['Feedstock Price']['Euro']['Augusta'].loc[sorter])
        print(self.res['Feedstock Premium']['Euro']['Augusta'].loc[sorter])
        print(self.res['Energy Costs']['Euro']['Augusta'].loc[sorter])
        print(self.res['Other Costs']['Euro']['Augusta'].loc[sorter])
        print(self.res['np value in feed']['Euro']['Augusta'].loc[sorter])
        print(self.res['Variable Costs']['Euro']['Augusta'].loc[sorter])
        print(self.res['Adder']['Euro']['Augusta'].loc[sorter])
        print(self.res['LnP Production']['Euro']['Augusta'].loc[sorter])
    
    
    
    
    