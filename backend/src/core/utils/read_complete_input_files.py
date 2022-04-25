# -*- coding: utf-8 -*-
"""
Created on Sun Apr 10 15:49:38 2022

@author: hufnaglm
"""
import pandas as pd
import numpy as np
import datetime

try:
    from .sql_connector import sql_connector
except:
    try:
        from sql_connector import sql_connector
    except:
        from utils.sql_connector import sql_connector


class read_complete_input_data:
    def __init__(self):
        self.sql = sql_connector() 

        # load data base data (mainly LIMS)
        self.df_dbfeed = self.get_dbfeed_data()
        
        # load price data (mainly Platts)
        self.df_RMprice = self.get_complete_price_data()
        
        # load planning data (coming from excel)
        self.df_plan_dict = self.sql.get_input_data()

    
    def get_complete_price_data(self):
        df_price = self.sql.get_RMprice_data()
        df_p_iscalc = self.sql.get_price_is_calculated()
        return self.calculate_prices(df_price,df_p_iscalc) 
        
        
    def calculate_prices(self,df_price,df_p_iscalc):
        col = 'Electricity Augusta'
        ind = (df_p_iscalc.loc[col,:]==1).values[0]
        df_price['Euro'].loc[col,ind] = ((df_price['Euro'].loc['NG Argus',ind].values*2.09)+5.3)/1000
        df_price['Dollar'].loc[col,ind] =   df_price['Euro'].loc[col,ind].values \
                                                            * df_price['Euro'].loc['Ex, rate',ind].values
        
        col = 'Electricity Sarroch'
        ind = (df_p_iscalc.loc[col,:]==1).values[0]
        df_price['Euro'].loc[col,ind] = ((df_price['Euro'].loc['NG Argus',ind].values*1.74)+24.5)/1000
        df_price['Dollar'].loc[col,ind] =   df_price['Euro'].loc[col,ind].values \
                                                            * df_price['Euro'].loc['Ex, rate',ind].values

        col = 'Gasoil AU'
        ind = (df_p_iscalc.loc[col,:]==1).values[0]
        df_price['Euro'].loc[col,ind] = df_price['Euro'].loc['Gasoil 0,1% High FOB Med',ind].values*0.72
        df_price['Dollar'].loc[col,ind] =   df_price['Euro'].loc[col,ind].values \
                                                            * df_price['Euro'].loc['Ex, rate',ind].values

        col = 'VN AU'
        ind = (df_p_iscalc.loc[col,:]==1).values[0]
        df_price['Euro'].loc[col,ind] = df_price['Dollar'].loc['VN High FOB Med',ind].values-30.
        df_price['Dollar'].loc[col,ind] =   df_price['Euro'].loc[col,ind].values \
                                                            * df_price['Euro'].loc['Ex, rate',ind].values

        col = 'Benzinetta'
        ind = (df_p_iscalc.loc[col,:]==1).values[0]
        df_price['Euro'].loc[col,ind] = df_price['Dollar'].loc['VN High FOB Med',ind].values*0.7
        df_price['Dollar'].loc[col,ind] =   df_price['Euro'].loc[col,ind].values \
                                                            * df_price['Euro'].loc['Ex, rate',ind].values

        col = 'Benzene EU'
        source1 = 'Formula'
        source2 = 'ICIS NWE contract'
        ind = (df_p_iscalc.loc[col,:]==1).values[0]
        df_price['Euro'].loc[pd.IndexSlice[col,:,source1], ind] = \
            df_price['Euro'].loc[pd.IndexSlice[col,:,source2], ind].values[0]-3
        df_price['Dollar'].loc[pd.IndexSlice[col,:,source1], ind] = df_price['Euro'].loc[pd.IndexSlice[col,:,source1], ind].values[0] \
                                                            * df_price['Euro'].loc['Ex, rate',ind].values
        
        col = 'Natural gas SARROCH'
        ind = (df_p_iscalc.loc[col,:]==1).values[0]
        df_price['Euro'].loc[col,ind] = ((df_price['Euro'].loc['Fuel Oil 1% CIF Med',ind].values)/0.97+3.826+0.93*1.185)/1000
        df_price['Dollar'].loc[col,ind] =   df_price['Euro'].loc[col,ind].values \
                                                            * df_price['Euro'].loc['Ex, rate',ind].values
        
        col = 'Natural gas EU Aug'
        ind = (df_p_iscalc.loc[col,:]==1).values[0]
        df_price['Euro'].loc[col,ind] = (df_price['Euro'].loc['NG Argus',ind].values+4.98)*1.05833/100
        df_price['Dollar'].loc[col,ind] =   df_price['Euro'].loc[col,ind].values \
                                                            * df_price['Euro'].loc['Ex, rate',ind].values

        col = 'Hydrogen price'
        ind = (df_p_iscalc.loc[col,:]==1).values[0]
        a = df_price['Euro'].loc['Natural gas EU Aug',ind].values[0]
        b = df_price['Euro'].loc['Electricity Augusta',ind].values[0]
        df_price['Euro'].loc[col,ind] = a*19/8.5+1.5*b/1000
        df_price['Dollar'].loc[col,ind] =   df_price['Euro'].loc[col,ind].values \
                                                            * df_price['Euro'].loc['Ex, rate',ind].values
        return df_price

    def get_dbfeed_data(self):
        self.data_hom = self.sql.get_homologue_data()
        self.data_in = self.sql.get_dbinput_data()
        self.data_in_editable = self.sql.get_dbinput_iseditable()
        self.calculate_missing_inputs()
        
        df_dbfeed = pd.concat([self.data_hom,self.data_in],axis=1)
        return df_dbfeed


    def calculate_missing_inputs(self):
        """
        calculate all intermediate values needed
        
        Returns
        -------
        data_in : dictionary of data frames
    
        """
        # calculate 'Premium kero ($/mt) Med-Term'
        calculate = self.data_in.index.values[ 
              np.isnan(self.data_in['Premium kero ($/mt) Med-Term'].values)]
        tmp = self.data_hom.loc[calculate,'TNP']
        calc = tmp.copy()
        calc[tmp.values<35] = 12
        calc[tmp.values<=40] = 14
        calc[tmp.values>40] = 15+0.75*(tmp[tmp.values>40]-40)
        self.data_in.loc[calculate,'Premium kero ($/mt) Med-Term'] = calc
        
        self.data_in['Gasoil yield (ton/ton)'] = 0
        
        # calculate 'Useful LnP TnP'
        self.add_useful_LnP_TnP()
    
        # calculate 'density return (kg/mc)'
        self.add_density_return()
    
        # calculate 'Feed yield (mt/mt)'
        self.add_feed_yield()
        
        # calculate 'Useful HnP TnP'
        self.add_useful_HnP_TnP()
    
        # calculate 'Useful total TnP'
        self.add_useful_total_TnP()
    
        # calculate 'VN yield (ton/ton)'
        self.add_VN_yield()
        
        # calculate 'Return yield (mt/mt)'
        self.add_return_yield()
        
        # calculate 'NG yield'
        self.add_NG_yield()
        
        # calculate 'Energy yield'
        self.add_energy_yield()

    
    def add_useful_LnP_TnP(self):
        """
        calculate useful LnP TnP
        ['Trafigura','Sonatrach','Sonatrach plus','Sonatrach add','Ras Lanuf','Ras Laffan','ENI Livorno','EGCP']    
    
        ('LnP adsorption recovery' * (1-'loses due to cracking') /'nP purity') * 
        (C10*'C10 recovery'+'C11'+'C12'+'C13'+'C14' * 'C14 recovery' + 'C15' * 'C15 recovery')
    
        ['Jubail','ENI Taranto','Ruwais','Zawia','Skikda']
        ('LnP adsorption recovery' * (1-'loses due to cracking') / 'nP purity')\
        *('C10' * 'C10 recovery' + 'C11' + 'C12' + 'C13' + 'C14' * 'C14 recovery')
        
        Sarroch
        (('LnP adsorption recovery' * (1-loses due to cracking') / 'nP purity')\
         ('C10' * 'C10 recovery' + 'C11' + 'C12' + 'C13'))
        
    
        Parameters
        ----------
        data_in : dictionary of data frames
        data_hom : dictionary of data frames
        
        Returns
        -------
        data_in : dictionary of data frames
    
        """
        self.data_in['Useful LnP TnP'] = np.nan
        AI = self.data_in['LnP adsorption recovery'] 
        AG = self.data_in['loses due to cracking']
        AF = self.data_in['nP purity']
        D =  self.data_hom['C10']
        AC = self.data_in['C10 recovery']
        E =  self.data_hom['C11']
        F =  self.data_hom['C12']
        G =  self.data_hom['C13']
        H =  self.data_hom['C14']
        AD = self.data_in['C14 recovery']
        I =  self.data_hom['C15']
        AE = self.data_in['C15 recovery']
    
        rows = ['Trafigura','Sonatrach','Sonatrach plus','Sonatrach add',
                'Ras Lanuf','Ras Laffan','ENI Livorno','EGCP']
        site = 'Augusta'  
        self.data_in['Useful LnP TnP'].loc[site].loc[rows] =\
            (AI.loc[site].loc[rows]*(1-AG.loc[site].loc[rows])/AF.loc[site].loc[rows])*\
            (D.loc[site].loc[rows]*AC.loc[site].loc[rows]+\
             E.loc[site].loc[rows]+F.loc[site].loc[rows]+G.loc[site].loc[rows]+H.loc[site].loc[rows]\
             *AD.loc[site].loc[rows]+I.loc[site].loc[rows]*AE.loc[site].loc[rows])
    
        rows = ['Jubail','ENI Taranto','Ruwais','Zawia','Skikda']
        self.data_in['Useful LnP TnP'].loc['Augusta'].loc[rows] =\
            (AI.loc[site].loc[rows]*(1-AG.loc[site].loc[rows])/AF.loc[site].loc[rows])\
           *(D.loc[site].loc[rows]*AC.loc[site].loc[rows]+E.loc[site].loc[rows]+\
             F.loc[site].loc[rows]+G.loc[site].loc[rows]+H.loc[site].loc[rows]*AD.loc[site].loc[rows])
        
        site = 'Sarroch'  
        self.data_in['Useful LnP TnP'].loc[site].loc[self.data_in['Useful LnP TnP'].loc[site].index.values] =\
            ((AI.loc[site]*(1-AG.loc[site])/AF.loc[site])*\
            (D.loc[site]*AC.loc[site]+E.loc[site]+\
             F.loc[site]+G.loc[site])).loc[self.data_in['Useful LnP TnP'].loc[site].index.values]
        
        self.data_in['Useful LnP TnP'] = self.data_in['Useful LnP TnP']/100.

    
    def add_density_return(self):
        """
        calculate density return
        ('density feed (kg/mc)' - ('Useful LnP TnP' * 0.75)) / (1 - 'Useful LnP TnP')
    
        Parameters
        ----------
        data_in : dictionary of data frames
    
        Returns
        -------
        data_in : dictionary of data frames
    
        """
        R = self.data_in['density feed (kg/mc)']
        AK = self.data_in['Useful LnP TnP']
        self.data_in['density return (kg/mc)'] = (R-(AK*0.75))/(1-AK)
    

    def add_feed_yield(self):
        """
        calculate Feed yield:
            1/'Useful LnP TnP'
    
        Parameters
        ----------
        data_in : dictionary of data frames
    
        Yields
        ------
        data_in : dictionary of data frames
        """
        self.data_in['Feed yield (mt/mt)'] = 1/self.data_in['Useful LnP TnP']


    def add_useful_HnP_TnP(self):
        """
        calculate useful HnP TnP
        ('HnP adsorption recovery' * ( 1 - 'loses due to cracking') / 'nP purity') *\
        ('C14' + 'C15' + 'C16' + 'C17' + 'C18' * 'C18+ recovery') / 100
    
        Parameters
        ----------
        data_in : dictionary of data frames
        data_hom : dictionary of data frames
    
        Returns
        -------
        data_in : dictionary of data frames
    
        """
        self.data_in['Useful HnP TnP'] = np.nan
        site = 'Sarroch'
    
        AJ = self.data_in['HnP adsorption recovery'] 
        AG = self.data_in['loses due to cracking']
        AF = self.data_in['nP purity']
        AH = self.data_in['C18+ recovery']
        H =  self.data_hom['C14']
        I =  self.data_hom['C15']
        J =  self.data_hom['C16']
        K =  self.data_hom['C17']
        L =  self.data_hom['C18+']
        rows = self.data_in['Useful HnP TnP'].loc[site].index.values
        self.data_in['Useful HnP TnP'].loc[site].loc[rows] =\
            +(AJ.loc[site].loc[rows]*(1-AG.loc[site].loc[rows])/AF.loc[site].loc[rows])*\
             (H.loc[site].loc[rows]+I.loc[site].loc[rows]+J.loc[site].loc[rows]+\
              K.loc[site].loc[rows]+L.loc[site].loc[rows]*AH.loc[site].loc[rows])/100
    

    def add_useful_total_TnP(self):
        """
        calculate useful total TnP
        'Useful total TnP' = 'Useful LnP TnP' + 'Useful HnP TnP'
        '% TnP' = 'Useful LnP TnP' / 'Useful HnP TnP'
    
        Parameters
        ----------
        data_in : dictionary of data frames
    
        Returns
        -------
        data_in : dictionary of data frames
    
        """
        self.data_in['Useful total TnP'] = np.nan
        self.data_in['% LnP'] = np.nan
        site = 'Sarroch'
        rows = self.data_in['Useful HnP TnP'].loc[site].index.values
    
        self.data_in['Useful total TnP'].loc[site].loc[rows] =\
            self.data_in['Useful LnP TnP'].loc[site].loc[rows]+\
            self.data_in['Useful HnP TnP'].loc[site].loc[rows]
    
        self.data_in['% LnP'].loc[site].loc[rows] =\
            self.data_in['Useful LnP TnP'].loc[site].loc[rows]/\
            self.data_in['Useful total TnP'].loc[site].loc[rows]
    
    
    def add_VN_yield(self):
        """
        Calculates VN yield
        (C9+C10*(1-'C10 reovery')) / ( ('C9- Trafigura' + 'C10 Trafigura' * (1 - 'C10 recovery Trafigura')) ) * 0.04
    
        Parameters
        ----------
        data_in : dictionary of data frames with input data 
        data_hom : dictionary of data frames withhomologue data from LIMS
    
        Yields
        ------
        data_in : dictionary of data frames
        """
        
        self.data_in['VN yield (ton/ton)'] = np.nan
        base = 0.04
        site = 'Augusta'
        ref_feedstock = ['Trafigura']
        rows = ['Trafigura','Sonatrach','Sonatrach plus','Sonatrach add']
        self.data_in['VN yield (ton/ton)'].loc[site].loc[rows] = base
        
        rows = [r for r in self.data_in['VN yield (ton/ton)'].loc[site].index.values 
                if r not in rows]
        C = self.data_hom['C9-'].loc[site].loc[rows]
        D = self.data_hom['C10'].loc[site].loc[rows]
        AC = self.data_in['C10 recovery'].loc[site].loc[rows]
    
        C_T = self.data_hom['C9-'].loc[site].loc[ref_feedstock]
        D_T = self.data_hom['C10'].loc[site].loc[ref_feedstock]
        AC_T = self.data_in['C10 recovery'].loc[site].loc[ref_feedstock]
        nom = (C_T+D_T*(1-AC_T)).values[0]
     
        self.data_in['VN yield (ton/ton)'].loc[site].loc[rows] = (C+D*(1-AC))/(nom)*base
        

    
    def add_return_yield(self):
        """
        calculates the return yield
        Augusta:
        'Feed yield (mt/mt)' - 'VN yield (ton/ton)' - 'Gasoil yield (ton/ton)' - 'loses' - 1
    
        Sarroch:
        'Feed yield (mt/mt)' - 1 - 'Benzinetta yield (mt/mt)' - 'loses'
            
        Parameters
        ----------
        data_in : dictionary of data frames
    
        Yields
        ------
        data_in : dictionary of data frames
        """
    
        self.data_in['Return yield (mt/mt)'] = np.nan
        T = self.data_in['Feed yield (mt/mt)']
        V = self.data_in['VN yield (ton/ton)']
        W = self.data_in['Gasoil yield (ton/ton)']
        X = self.data_in['Benzinetta yield (mt/mt)']
        Y = self.data_in['loses']
        
        site = 'Augusta'
        rows = self.data_in['Return yield (mt/mt)'].loc[site].index.values
        self.data_in['Return yield (mt/mt)'].loc[site].loc[rows] = \
            T.loc[site].loc[rows]-V.loc[site].loc[rows]-W.loc[site].loc[rows]-Y.loc[site].loc[rows]-1
        
        site = 'Sarroch'
        rows = self.data_in['Return yield (mt/mt)'].loc[site].index.values
        self.data_in['Return yield (mt/mt)'].loc[site].loc[rows] = \
            T.loc[site].loc[rows]-1-X.loc[site].loc[rows]-Y.loc[site].loc[rows]
    
    
    
    def add_NG_yield(self):
        """
        add NG Yield
        ['Sonatrach','Sonatrach plus','Sonatrach add']
        330
        
        ['EGCP','Zawia']
        330 + 17.5 * (-'Useful LnP TnP' + 'Useful LnP TnP Sonatrach') * 100
    
        all other
        330 + 5 * (-'Useful LnP TnP' + 'Useful LnP TnP Sonatrach') * 100
        
        Parameters
        ----------
        data_in : dictionary of data frames
    
        Yields
        ------
        data_in : dictionary of data frames
        """
        
        self.data_in['NG yield'] = np.nan
        base = 330
        ref_feedstock = ['Sonatrach']
        base_useLnPTnP = self.data_in['Useful LnP TnP'].loc['Augusta'].loc[ref_feedstock].values[0]
        AK = self.data_in['Useful LnP TnP']
        site = 'Augusta'
    
        rows = ['Sonatrach','Sonatrach plus','Sonatrach add']
        self.data_in['NG yield'].loc[site].loc[rows] = base
       
        rows2 = ['EGCP','Zawia']
        self.data_in['NG yield'].loc[site].loc[rows2] = \
            base+17.5*(-AK.loc[site].loc[rows2]+base_useLnPTnP)*100
    
        rows = [r for r in self.data_in['VN yield (ton/ton)'].loc[site].index.values 
                if (r not in rows+rows2)]
        self.data_in['NG yield'].loc[site].loc[rows] = \
            base+5*(-AK.loc[site].loc[rows]+base_useLnPTnP)*100
        

    def add_energy_yield(self):
        """
        Calculate the energy yield:
        for ['Sonatrach','Sonatrach plus','Sonatrach add']
        185
        
        for ['EGCP','Zawia']
        185 + 9 * (-'Useful LnP TnP' + 'Useful LnP TnP Sonatrach') * 100
            
        all other 
        185 + 2 * (-'Useful LnP TnP' + 'Useful LnP TnP Sonatrach') * 100
    
        Parameters
        ----------
        data_in : dictionalry of data_frames
        
        Yields
        ------
        data_in : dictionalry of data_frames
        """
        base = 185
        ref_feedstock = ['Sonatrach']
        base_useLnPTnP = self.data_in['Useful LnP TnP'].loc['Augusta'].loc[ref_feedstock].values[0]
        AK = self.data_in['Useful LnP TnP']
        site = 'Augusta'
    
        rows = ['Sonatrach','Sonatrach plus','Sonatrach add']
        self.data_in['Electricity yield'].loc[site].loc[rows] = base
       
        rows2 = ['EGCP','Zawia']
        self.data_in['Electricity yield'].loc[site].loc[rows2] = \
            base+9*(-AK.loc[site].loc[rows2]+base_useLnPTnP)*100
    
        rows = [r for r in self.data_in['VN yield (ton/ton)'].loc[site].index.values 
                if (r not in rows+rows2)]
        self.data_in['Electricity yield'].loc[site].loc[rows] = \
            base+2*(-AK.loc[site].loc[rows]+base_useLnPTnP)*100
        

