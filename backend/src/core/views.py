from re import S
import requests
from copy import deepcopy
import numpy as np
import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from core.utils.make_calculations import make_calculations

from .models import Homologues, Feedstock, Site

class GetQualityView(APIView):
    """
    ## local
    # login first http://127.0.0.1:8000/admin
    # http://127.0.0.1:8000/core/get_quality

    ## deployed
    # login first: https://alkylates-test-api.chemicals-digital.sasol.com/admin
    # https://alkylates-test-api.chemicals-digital.sasol.com/core/get_quality

    Provides the quality data shown in the DATABASE FEED sheet in excel on the left side (white part)

    {\"('Augusta', 'EGCP')\":{\"C10\":3.98,\"C11\":2.93, ..... \"TNP\":15.87},
     \"('Augusta', 'ENI Livorno')\":{\"C10\":4.6713325301,\"C11\" .....

    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        """
        reading quality data values
        """
        quality = Homologues.objects.all()
        data_hom = quality.distinct().values('site__name','feedstock__name','name','value')
        data_hom = pd.DataFrame(data_hom)
        data_hom.columns = ['site','feedstock','homologue','value']
        data_hom = data_hom.pivot(index=['site','feedstock'], columns='homologue', values='value')
        data_hom['TNP'] = data_hom.sum(axis=1)
        data_hom = data_hom.reindex(sorted(data_hom.columns), axis=1)
        
        data_hom.reset_index(inplace=True)
        data_hom = data_hom.transpose()
        data_hom.reset_index(inplace=True)

        return Response(data_hom)

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
    
    "{\"('Benzene EU', '\\u20ac\\/mt', 'Formula')\":{\"1567296000000\":763.9878941743,\"1569888000000\":695.0102697606,......   
    
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        """
        reading price data
        """
        print("GetPriceView in views: Reading price data")
        #currency = request.values.get('currency', 'Euro')
        currency = self.request.query_params.getlist('currency', 'Euro')
        if currency not in ['Dollar','Euro']:
            return Response('No valid currency, choose Euro or Dollar')

        self.data_module = make_calculations()
        self.data_module.get_update_input()
        res = deepcopy(self.data_module.input.df_RMprice)
        res = res[currency]
        res = res.round(2)
        #res = res.transpose().to_json()
        res.reset_index(inplace=True)
        res.replace(np.nan,0,inplace=True)
        res = res.transpose()
        res.reset_index(inplace=True)


        return Response(res)

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
    
    "{\"('Augusta', 'EGCP')\":{\"% LnP\":null,\"Benzinetta yield (mt\\/mt)\":null,\"C10 recovery\":0.95,\"C14 recovery\":0.95,\"C15 recovery\":0.9, .....
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        """
        reading price data
        """
        print("reading userinput data")
        self.data_module = make_calculations()
        self.data_module.get_update_input()

        res = deepcopy(self.data_module.input.data_in.copy())
        res.replace(np.nan,0,inplace=True)
        res2 = deepcopy(self.data_module.input.data_in_editable.copy())
        for col in res:
            res[col] = [ [round(a,3),b] for (a,b) in zip(res[col].values,res2[col].values) ]

        res.reset_index(inplace=True)
        res = res.transpose()
        res.reset_index(inplace=True)

        return Response(res)

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
    
    "{\"('EGCP', 'mt')\":{\"1567296000000\":null,\"1569888000000\":null,\"1572566400000\":null,\"1575158400000\":null,\"1577836800000\":null,\"1580515200000\":null,\"1583020800000\":null,\"1585699200000\":null,\"1590969600000....
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        """
        reading price data
        """
        print("reading userinput data")
        self.data_module = make_calculations()
        source = self.request.query_params.getlist('source', 'ISOSIV')

        self.data_module.get_update_input()
        res = deepcopy(self.data_module.input.df_plan_dict.copy())

        if source not in ['ISOSIV','MOLEX','Kero_premium']:
            source = "ISOSIV"
        res = res[source]

        # if res.shape[0] > 0:
        #     #res.reset_index(inplace=True)
        #     res = res.transpose().to_json()
        # else:
        #     res = {}
        res = res.round(2)
        res.reset_index(inplace=True)
        res.replace(np.nan,0,inplace=True)
        res = res.transpose()
        res.reset_index(inplace=True)



        return Response(res)

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

    "{\"EGCP\":{\"1567296000000\":709.7678601808,\"1569888000000\":686.9637062186,\"1572566400000\":690.5865758325,\"1575158400000\":687.9434998742,

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

        print("first calculating then reading results ")
        site = self.request.query_params.getlist('site', ['Augusta'])[0]
        currency = self.request.query_params.getlist('currency', ['Euro'])[0]
        category = self.request.query_params.getlist('category', ['Variable Costs'])[0]

        # print(site)
        # print(currency)
        # print(category)

        self.data_module = make_calculations()
        self.data_module.get_update_input()
        self.data_module.update_res()
        res = self.data_module.res[category][currency][site].copy()

        # if res.shape[0] > 0:
        #     #res.reset_index(inplace=True)
        #     res = res.transpose().to_json()
        # else:
        #     res = {}

        res.reset_index(inplace=True)
        res.replace(np.nan,0,inplace=True)
        res = res.transpose()
        res.reset_index(inplace=True)

        return Response(res)

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
        print("reading userinput data")
        self.data_module = make_calculations()
        try:
            self.data_module.input
        except:
            self.data_module.get_update_input()
        print("updating result values")
        self.data_module.update_res()
        return Response({})

