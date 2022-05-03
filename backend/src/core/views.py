from re import S
import requests
import numpy as np
import pandas as pd
import datetime
import os
from copy import deepcopy

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from core.utils.make_calculations import make_calculations
from core.utils.make_calculations import read_complete_input_data
from .models import Homologues, KeroPremium, Price, UserInputDb, Isosiv, Molex

def read_quality():
    quality = Homologues.objects.all()
    data_hom = quality.distinct().values('site__name','feedstock__name','name','value')
    data_hom = pd.DataFrame(data_hom)
    data_hom.columns = ['site','feedstock','homologue','value']
    data_hom = data_hom.pivot(index=['site','feedstock'], columns='homologue', values='value')
    data_hom['TNP'] = data_hom.sum(axis=1)
    return data_hom

def read_price():
    # get the price per material/commodity
    price = Price.objects.all()
    data_p = price.distinct().values('commodity__name','date','value','unit__name','source__name')
    data_p = pd.DataFrame(data_p)
    data_p.columns = ['commodity','date', 'value','unit','source']
    if type(data_p['date'].values[0]) == str:
        data_p['date']=[datetime.datetime.strptime(d,'%d-%m-%Y') for d in data_p['date']]
    data_p = data_p.pivot(index=['commodity','unit','source'], columns='date', values='value')
    
    # get the indicator that shows if the value in this cell shall be calculated
    data_p_iscalc = price.distinct().values('commodity__name','date','is_calculated','unit__name','source__name')
    data_p_iscalc = pd.DataFrame(data_p_iscalc)
    data_p_iscalc.columns = ['commodity','date', 'is_calculated','unit','source']
    if type(data_p_iscalc['date'].values[0]) == str:
        data_p_iscalc['date']=[datetime.datetime.strptime(d,'%d-%m-%Y') for d in data_p_iscalc['date']]
    data_p_iscalc = data_p_iscalc.pivot(index=['commodity','unit','source'], columns='date', values='is_calculated')
    
    # fill and calculate the missing values
    calcs = read_complete_input_data()
    data_p = calcs.get_RMprice_data(data_p)
    data_p = calcs.calculate_prices(data_p,data_p_iscalc) 
    return data_p

def read_input():
    uinput = UserInputDb.objects.all()
    data_in = uinput.distinct().values('site__name','feedstock__name','name','value')
    data_in = pd.DataFrame(data_in)
    data_in.columns = ['site', 'feedstock', 'name', 'value']
    data_in = data_in.pivot(index=['site','feedstock'], columns='name', values='value')
    cols = [s.replace('\n',' ') for s in data_in.columns]
    cols = [s if str(s)[-1] !=' ' else str(s) [:-1] for s in cols]
    data_in.columns = cols
    return data_in

def read_input_editable():
    uinput = UserInputDb.objects.all()
    data_in = uinput.distinct().values('site__name','feedstock__name','name','is_editable')
    data_in = pd.DataFrame(data_in)
    data_in.columns = ['site', 'feedstock', 'name', 'is_editable']
    data_in = data_in.pivot(index=['site','feedstock'], columns='name', values='is_editable')
    cols = [s.replace('\n',' ') for s in data_in.columns]
    cols = [s if str(s)[-1] !=' ' else str(s) [:-1] for s in cols]
    data_in.columns = cols
    return data_in

def read_isosiv():
    iso = Isosiv.objects.all()
    data_iso = iso.distinct().values('feedstock__name','date','value','unit__name')
    data_iso = pd.DataFrame(data_iso)
    data_iso.columns = ['feedstock', 'date', 'value','unit']
    if type(data_iso['date'].values[0]) == str:
        data_iso['date']=[datetime.datetime.strptime(d,'%d-%m-%Y') for d in data_iso['date']]
    data_iso = data_iso.pivot(index=['feedstock','unit'], columns='date', values='value')
    
    return data_iso

def read_molex():
    mole = Molex.objects.all()
    data_mole = mole.distinct().values('feedstock__name','date','value','unit__name')
    data_mole = pd.DataFrame(data_mole)
    data_mole.columns = ['feedstock', 'date', 'value','unit']
    if type(data_mole['date'].values[0]) == str:
        data_mole['date']=[datetime.datetime.strptime(d,'%d-%m-%Y') for d in data_mole['date']]
    data_mole = data_mole.pivot(index=['feedstock','unit'], columns='date', values='value')
    
    return data_mole

def read_kero():
    kero = KeroPremium.objects.all()
    data_kero = kero.distinct().values('feedstock__name','date','value','unit__name')
    data_kero = pd.DataFrame(data_kero)
    data_kero.columns = ['feedstock', 'date', 'value','unit']
    if type(data_kero['date'].values[0]) == str:
        data_kero['date']=[datetime.datetime.strptime(d,'%d-%m-%Y') for d in data_kero['date']]
    data_kero = data_kero.pivot(index=['feedstock','unit'], columns='date', values='value')
    
    return data_kero

def get_plan_dict():
    df_ISOSIV = read_isosiv()
    df_MOLEX = read_molex()
    df_Kero_Prem = read_kero()
    df_plan_dict = {
                        'ISOSIV': df_ISOSIV,
                        'MOLEX':df_MOLEX,
                        'Kero_premium':df_Kero_Prem,
                        }
    for key in df_plan_dict:
        df_plan_dict[key] = df_plan_dict[key].rename( index={'Sonatrach plus*': 'Sonatrach add'})
        df_plan_dict[key] = df_plan_dict[key].rename( index={'EGPC': 'EGCP'})
    return df_plan_dict


def get_output_dict(df):
    df.columns = [str(r) for r in df.columns.values]
    df.reset_index(inplace=True)
    outputdict = {}
    outputdict['headings'] = list(df.columns.values)

    df = df.transpose()
    df = df.to_dict()
    outputdict['data'] = [df[k] for k in df]
    return outputdict


class GetQualityView(APIView):
    """
    ## local
    # login first http://127.0.0.1:8000/admin
    # http://127.0.0.1:8000/core/get_quality

    ## deployed
    # login first: https://alkylates-test-api.chemicals-digital.sasol.com/admin
    # https://alkylates-test-api.chemicals-digital.sasol.com/core/get_quality

    Provides the quality data shown in the DATABASE FEED sheet in excel on the left side (white part)
    first the names of all columns then each row is provided

    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        """
        reading quality data values
        """
        data_hom = read_quality()
        data_hom = data_hom.reindex(sorted(data_hom.columns), axis=1)
        data_hom = data_hom.round(2)
        outputdict = get_output_dict(data_hom)
        return Response(outputdict)


    def post(self, request, format=None):
        print(request.data)
        return Response(None)




class GetPriceView(APIView):
    """
    ## local
    # login first http://127.0.0.1:8000/admin
    # http://127.0.0.1:8000/core/get_price?Euro
    # http://127.0.0.1:8000/core/get_price?Dollar
    
    ## deployed
    # https://alkylates-test-api.chemicals-digital.sasol.com/core/get_price?Euro
    # https://alkylates-test-api.chemicals-digital.sasol.com/core/get_price?Dollar
    
    if no currency is added the default is Euro
    
    Provides the price data shown in the RM PRICE sheet in excel on the left side (white part)
    first the names of all columns then each row is provided
    
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        """
        reading price data
        """
        print("GetPriceView in views: Reading price data")
        currency = self.request.query_params.getlist('currency', 'Euro')
        if currency not in ['Dollar','Euro']:
            return Response('No valid currency, choose Euro or Dollar')

        data_p = read_price()
        res = data_p[currency]
        res = res.round(2)
        res.replace(np.nan,0,inplace=True)
        outputdict = get_output_dict(res)

        return Response(outputdict)

    def post(self, request, format=None):
        print(request.data)
        return Response(None)


class GetInputsView(APIView):
    """
    ## local
    # login first http://127.0.0.1:8000/admin
    # http://127.0.0.1:8000/core/get_inputs

    ## deployed
    # login first: https://alkylates-test-api.chemicals-digital.sasol.com/admin
    # https://alkylates-test-api.chemicals-digital.sasol.com/core/get_inputs

    Provides the user input data shown in the DATABASE FEED sheet in excel on the right side (green/yellow part)
    first the names of all columns then each row is provided
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        """
        reading price data
        """
        print("reading userinput data")
        data_hom = read_quality()
        data_in = read_input()
        res2 = read_input_editable()
        calcs = read_complete_input_data()
        res = calcs.calculate_missing_inputs(data_in,data_hom)
       
        res.replace(np.nan,0,inplace=True)
        res2.replace(np.nan,0,inplace=True)
        for col in res:
            res[col] = [ [round(a,3),b==1] for (a,b) in zip(res[col].values,res2[col].values) ]
        outputdict = get_output_dict(res)
        # res.reset_index(inplace=True)
        # res.replace(np.nan,0,inplace=True)
        # res = res.transpose()
        # res.reset_index(inplace=True)

        return Response(outputdict)

    def post(self, request, format=None):
        print(request.data)
        return Response(None)


class GetPlannedView(APIView):
    """
    ## local
    # login first http://127.0.0.1:8000/admin
    # http://127.0.0.1:8000/core/get_planned?ISOSIV
    # http://127.0.0.1:8000/core/get_planned?MOLEX
    # http://127.0.0.1:8000/core/get_planned?Kero_premium
    
    ## deployed
    # login first: https://alkylates-test-api.chemicals-digital.sasol.com/admin
    # https://alkylates-test-api.chemicals-digital.sasol.com/core/get_planned?ISOSIV
    # https://alkylates-test-api.chemicals-digital.sasol.com/core/get_planned?MOLEX
    # https://alkylates-test-api.chemicals-digital.sasol.com/core/get_planned?Kero_premium


    Provides the planning information shown in the excel INPUT sheet
    if you do not provide additional information the ISOSIV data are shown
    first the names of all columns then each row is provided
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        """
        reading price data
        """
        print("reading userinput data")
        source = self.request.query_params.getlist('source', 'ISOSIV')
        if source not in ['ISOSIV','MOLEX','Kero_premium']:
            source = "ISOSIV"
        
        df_plan_dict = get_plan_dict()

        res = df_plan_dict[source]
        res.replace(np.nan,0,inplace=True)
        res = res.round(2)
        outputdict = get_output_dict(res)

        return Response(outputdict)

    def post(self, request, format=None):
        print(request.data)
        return Response(None)


class GetResView(APIView):
    """
    ## local
    # login first http://127.0.0.1:8000/admin
    # http://127.0.0.1:8000/core/get_res
    # http://127.0.0.1:8000/core/get_res?category=Return Stream Price&currency=Euro&site=Augusta
    
    ## deployed
    # login first: https://alkylates-test-api.chemicals-digital.sasol.com/admin
    # https://alkylates-test-api.chemicals-digital.sasol.com/core/get_res
    # https://alkylates-test-api.chemicals-digital.sasol.com/core/get_res?category=Return Stream Price&currency=Euro&site=Augusta

    get the results which were caluclated in the tool
    if you do not specify anything you get Variable Costs for Augusta in Euro
    first the names of all columns then each row is provided

    # levels:
    # category:
        #  'Return Stream Price'
        #  'Feedstock Price'
        #  'Feedstock Premium'
        #  'Energy Costs'
        #  'Other Costs'
        #  'np value in feed'
        #  'Variable Costs'
        #  'Adder'
        #  'LnP Production'

    # currency:
        # 'Dollar'
        # 'Euro'

    # site:
        # 'Augusta'
        # 'Olefin purch'
        # 'Sarroch'
        # 'np purch'
   """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        """
        reading price data
        """
        site = self.request.query_params.getlist('site', ['Augusta'])[0]
        currency = self.request.query_params.getlist('currency', ['Euro'])[0]
        category = self.request.query_params.getlist('category', ['Variable Costs'])[0]

        data_hom = read_quality()
        data_in = read_input()
        data_p = read_price()
        df_plan_dict = get_plan_dict()
        calc = make_calculations(data_hom, data_in, data_p, df_plan_dict)

        calc.update_res()
        res = calc.res[category][currency][site].copy()
        res.replace(np.nan,0,inplace=True)
        outputdict = get_output_dict(res)


        # res.reset_index(inplace=True)
        # res.replace(np.nan,0,inplace=True)
        # res = res.transpose()
        # res.reset_index(inplace=True)
        
        return Response(outputdict)

    def post(self, request, format=None):
        print(request.data)
        return Response(None)


class GetUpdateResView(APIView):
    """
    Triggers the calculation 

    ## local
    # login first http://127.0.0.1:8000/admin
    # http://127.0.0.1:8000/core/update_all_res

    ## deployed
    # login first: https://alkylates-test-api.chemicals-digital.sasol.com/admin
    # https://alkylates-test-api.chemicals-digital.sasol.com/core/update_all_res

    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        """
        reading price data
        """
        data_hom = read_quality()
        data_in = read_input()
        data_p = read_price()
        df_plan_dict = get_plan_dict()
        calc = make_calculations(data_hom, data_in, data_p, df_plan_dict)
        calc.update_res()

        return Response({})


class HealthCheck(APIView):
    """
    Triggers all APIs to check if they are running without error

    ## local
    # login first http://127.0.0.1:8000/admin
    # http://127.0.0.1:8000/core/health_check

    ## deployed
    # login first: https://alkylates-test-api.chemicals-digital.sasol.com/admin
    # https://alkylates-test-api.chemicals-digital.sasol.com/core/health_check

    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        """
        reading price data
        """
        error = 0
        r = requests.get("http://127.0.0.1:8000/core/get_quality")
        r = pd.DataFrame(r)
        if r.shape[0]>0:
            print(r)
        else:
            error += 1
        
        r = requests.get("http://127.0.0.1:8000/core/get_price?Euro")
        r = pd.DataFrame(r)
        if r.shape[0]>0:
            print(r)
        else:
            error += 1
        
        r = requests.get("http://127.0.0.1:8000/core/get_price?Dollar")
        r = pd.DataFrame(r)
        if r.shape[0]>0:
            print(r)
        else:
            error += 1
        
        r = requests.get("http://127.0.0.1:8000/core/get_inputs")
        r = pd.DataFrame(r)
        if r.shape[0]>0:
            print(r)
        else:
            error += 1
        
        r = requests.get("http://127.0.0.1:8000/core/get_inputs_editable")
        r = pd.DataFrame(r)
        if r.shape[0]>0:
            print(r)
        else:
            error += 1
        
        r = requests.get("http://127.0.0.1:8000/core/get_planned?ISOSIV")
        r = pd.DataFrame(r)
        if r.shape[0]>0:
            print(r)
        else:
            error += 1
        
        r = requests.get("http://127.0.0.1:8000/core/get_planned?MOLEX")
        r = pd.DataFrame(r)
        if r.shape[0]>0:
            print(r)
        else:
            error += 1
        
        r = requests.get("http://127.0.0.1:8000/core/get_planned?Kero_premium")
        r = pd.DataFrame(r)
        if r.shape[0]>0:
            print(r)
        else:
            error += 1
        
        r = requests.get("http://127.0.0.1:8000/core/get_res?category=Return Stream Price&currency=Euro&site=Augusta")
        r = pd.DataFrame(r)
        if r.shape[0]>0:
            print(r)
        else:
            error += 1
        
        if error > 0:
            return Response({'There were errors'    })
        else:
            return Response({'Test completed no errors'    })


