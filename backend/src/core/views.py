import requests
from copy import deepcopy
import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from core.utils.make_calculations import make_calculations


class GetQualityView(APIView):
    """
    # http://127.0.0.1:8000/core/get_quality

    Provides the quality data shown in the DATABASE FEED sheet in excel on the left side (white part)

    {\"('Augusta', 'EGCP')\":{\"C10\":3.98,\"C11\":2.93, ..... \"TNP\":15.87},
     \"('Augusta', 'ENI Livorno')\":{\"C10\":4.6713325301,\"C11\" .....

    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        """
        reading quality data values
        """
        self.data_module = make_calculations()
        self.data_module.get_update_input()
        res = self.data_module.input.data_hom.copy()
        res = res.transpose().to_json()
        return Response(res)

    def post(self, request, format=None):
        print(request.data)
        return Response(None)


class GetPriceView(APIView):
    """
    # http://127.0.0.1:8000/get_price?Euro
    # http://127.0.0.1:8000/get_price?Dollar
    
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
        res = res.transpose().to_json()
        return Response(res)

    def post(self, request, format=None):
        print(request.data)
        return Response(None)


class GetInputsView(APIView):
    """
    # http://127.0.0.1:8000/get_inputs
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

        if res.shape[0] > 0:
            #res.reset_index(inplace=True)
            res = res.transpose().to_json()
        else:
            res = {}

        return Response(res)

    def post(self, request, format=None):
        print(request.data)
        return Response(None)


class GetInputsEditableView(APIView):
    """
    # http://127.0.0.1:8000/get_inputs_editable
    
    Provides the information whether data can be edited by the user or whether they are calculated in the tool 
    refers to the colors shown in the DATABASE FEED sheet in excel on the right side (green/yellow part)
    
    "{\"('Augusta', 'EGCP')\":{\"% LnP\":false,\"Benzinetta yield (mt\\/mt)\":false,\"C10 recovery\":true,\"C14 recovery\":true,\"C15 recovery\":true,....
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        """
        reading price data
        """
        print("reading userinput data")
        self.data_module = make_calculations()
        self.data_module.get_update_input()
        res = deepcopy(self.data_module.input.data_in_editable.copy())
        res = res.replace(0, False)
        res = res.replace(1, True)
        
        if res.shape[0] > 0:
            #res.reset_index(inplace=True)
            res = res.transpose().to_json()
        else:
            res = {}

        return Response(res)

    def post(self, request, format=None):
        print(request.data)
        return Response(None)


class GetPlannedView(APIView):
    """
    # http://127.0.0.1:8000/get_planned?ISOSIV
    # http://127.0.0.1:8000/get_planned?MOLEX
    # http://127.0.0.1:8000/get_planned?Kero_premium
    
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

        if res.shape[0] > 0:
            #res.reset_index(inplace=True)
            res = res.transpose().to_json()
        else:
            res = {}

        return Response(res)

    def post(self, request, format=None):
        print(request.data)
        return Response(None)


class GetResView(APIView):
    """
    # http://127.0.0.1:8000/get_res
    # http://127.0.0.1:8000/get_res?category=Return Stream Price&currency=Euro&site=Augusta
    #
    # get the results which were caluclated in the tool
    # if you do not specify anything you get Variable Costs for Augusta in Euro
    # 
    # [{"index":"EGCP","1567296000000":709.7678601808,"1569888000000":686.9637062186,"1572566400000":690.5865758325,"1575158400000":687.9434998742,"1577836800000":668.8490884003,"1580515200000":589.8707382079,"1583020800000":370.3770591401,"1585699200000":204.8204585337,"1588291200000":267.4908047773,"1590969600000":339.2000477997,"1593561600000":364.5181981052,"1596240000000":475.9742616238,"1598918400000":457.7084140139,"1601510400000":355.5627766758,"1604188800000":393.3353280989,"1606780800000":450.1199034578,"1609459200000":498.3948599891,"1612137600000":551.4635946754,"1614556800000":568.0797630191,"1617235200000":572.361553266,"1619827200000":607.3679807287,"1622505600000":649.3946498703,"1625097600000":688.775994168,"1627776000000":696.5583689266,"1630454400000":771.0019884794,"1633046400000":935.8457625186,"1635724800000":991.0051829831,"1638316800000":932.3662296144,"1640995200000":1153.7321588923,"1643673600000":1125.7456154129,"1646092800000":1419.8599376426},
    #  {"index":"ENI Livorno","1567296000000":655.4717881987,"1569888000000":633.9913797578,"1572566400000":634.0712847324,"1575158400000":633.0972277419,"1577836800000":616.8729198938,"1580515200000":544.5060697759,"1583020800000":342.5701078351,"1585699200000":190.0943496862,"1588291200000":248.9460381801,"1590969600000":431.4913889971,"1593561600000":344.3103309628,"1596240000000":339.6031631676,"1598918400000":410.2962303469,"1601510400000":353.0053634018,"1604188800000":369.055946791,"1606780800000":417.1479606395,"1609459200000":459.3901835494,"1612137600000":507.4364396668,"1614556800000":552.4530710808,"1617235200000":526.6181792202,"1619827200000":586.5370225391,"1622505600000":625.9789094711,"1625097600000":628.1175016437,"1627776000000":630.7432311938,"1630454400000":694.4760936933,"1633046400000":835.844616705,"1635724800000":872.8821085622,"1638316800000":859.082133696,"1640995200000":1009.7492834895,"1643673600000":999.773558649,"1646092800000":1274.915776661},
    #  {"index":"ENI Taranto","1567296000000":665.5972935155,"1569888000000":643.4743295338,"1572566400000":642.1190504426,"1575158400000":641.627599418,"1577836800000":625.2960999924,"1580515200000":552.4496018642,"1583020800000":349.3838020498,"1585699200000":194.966063017,"1588291200000":254.5883216434,"1590969600000":328.550560752,"1593561600000":352.0908374245,"1596240000000":347.0068739367,"1598918400000":311.6252892256,"1601510400000":340.4757152405,"1604188800000":373.9783994931,"1606780800000":422.1080606086,"1609459200000":463.4355510014,"1612137600000":511.4146193794,"1614556800000":552.4891015431,"1617235200000":531.034884609,"1619827200000":560.8917232998,"1622505600000":597.8708688096,"1625097600000":630.7358991396,"1627776000000":631.9791064594,"1630454400000":694.6031951884,"1633046400000":833.5170632552,"1635724800000":866.2841438614,"1638316800000":816.2360398179,"1640995200000":1000.1709434658,"1643673600000":995.1297007916,"1646092800000":1275.4160137719},
    #
   """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        """
        reading price data

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

        if res.shape[0] > 0:
            #res.reset_index(inplace=True)
            res = res.transpose().to_json()
        else:
            res = {}

        return Response(res)

    def post(self, request, format=None):
        print(request.data)
        return Response(None)


class GetUpdateResView(APIView):
    """
    # http://127.0.0.1:8000/update_all_res
    # Triggers the calculation 
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

