import requests
import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from core.utils.make_calculations import make_calculations


class GetQualityView(APIView):
    """
    # http://127.0.0.1:8000/core/get_quality
    # Provides the quality data shown in the DATABASE FEED sheet in excel on the left side (white part)
    #
    #  [{"site":"Augusta","feedstock":"EGCP","C10":3.98,"C11":2.93,"C12":2.51,"C13":1.56,"C14":1.29,"C15":0.26,"C16":0.02,"C17":0.0,"C18+":0.0,"C9-":3.32,"TNP":15.87},
    #   {"site":"Augusta","feedstock":"ENI Livorno","C10":4.6713325301,"C11":7.7607264846,"C12":5.5956513226,"C13":2.5999341532,"C14":0.2074277876,"C15":0.0268719887,"C16":0.04,"C17":0.0,"C18+":0.0,"C9-":2.0240997792,"TNP":22.9260440459},
    #   {"site":"Augusta","feedstock":"ENI Taranto","C10":7.13,"C11":9.49,"C12":6.71,"C13":3.37,"C14":0.71,"C15":0.07,"C16":0.01,"C17":0.0,"C18+":0.0,"C9-":2.91,"TNP":30.4}
    # ....

    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        """
        reading quality data values
        """
        self.data_module = make_calculations()
        self.data_module.get_update_input()
        res = self.data_module.input.data_hom.copy()

        if res.shape[0] > 0:
            res.reset_index(inplace=True)
            res = res.to_dict()
        else:
            res = {}

        return Response(res)

    def post(self, request, format=None):
        print(request.data)
        return Response(None)


class GetPriceView(APIView):
    """
    # http://127.0.0.1:8000/get_price?Euro
    # http://127.0.0.1:8000/get_price?Dollar
    #
    # if no currency is added the default is Euro
    #
    # Provides the price data shown in the RM PRICE sheet in excel on the left side (white part)
    #
    # [{"index":0,"commodity":"Benzene EU","unit":"\u20ac\/mt","source":"Formula","1567296000000":763.9878941743,"1569888000000":695.0102697606,"1572566400000":611.5683818215,"1575158400000":583.6478648004,"1577836800000":636.8569674272,"1580515200000":738.5128486504,"1583020800000":661.3157967237,"1585699200000":167.7728901448,"1588291200000":224.0885083181,"1590969600000":290.0481498878,"1593561600000":366.4967342852,"1596240000000":372.55138837,"1598918400000":368.4,"1601510400000":350.0,"1604188800000":415.0,"1606780800000":867.525,"1609459200000":683.0,"1612137600000":599.0,"1614556800000":762.0,"1617235200000":992.0,"1619827200000":1361.0,"1622505600000":881.0,"1625097600000":813.0,"1627776000000":914.0,"1630454400000":833.0,"1633046400000":777.0,"1635724800000":835.0,"1638316800000":857.0,"1640995200000":1066.0,"1643673600000":981.0,"1646092800000":1001.0},
    #  {"index":1,"commodity":"Benzene EU","unit":"\u20ac\/mt","source":"ICIS NWE contract","1567296000000":760.0,"1569888000000":695.0,"1572566400000":545.0,"1575158400000":615.0,"1577836800000":679.0,"1580515200000":742.0,"1583020800000":595.0,"1585699200000":171.0,"1588291200000":226.0,"1590969600000":293.0,"1593561600000":369.0,"1596240000000":375.0,"1598918400000":353.0,"1601510400000":353.0,"1604188800000":418.0,"1606780800000":870.525,"1609459200000":686.0,"1612137600000":602.0,"1614556800000":765.0,"1617235200000":995.0,"1619827200000":1364.0,"1622505600000":884.0,"1625097600000":816.0,"1627776000000":917.0,"1630454400000":836.0,"1633046400000":780.0,"1635724800000":838.0,"1638316800000":860.0,"1640995200000":1069.0,"1643673600000":984.0,"1646092800000":1004.0},
    #  {"index":2,"commodity":"Benzinetta","unit":"\u20ac\/mt","source":"Formula","1567296000000":309.98,"1569888000000":337.26,"1572566400000":0.0,"1575158400000":360.08,"1577836800000":359.63,"1580515200000":354.76,"1583020800000":319.04,"1585699200000":319.04,"1588291200000":60.28,"1590969600000":146.51,"1593561600000":229.53,"1596240000000":255.5,"1598918400000":247.9,"1601510400000":253.925,"1604188800000":250.1833333333,"1606780800000":286.5,"1609459200000":338.23125,"1612137600000":372.96,"1614556800000":387.3206521739,"1617235200000":375.865,"1619827200000":400.3539473684,"1622505600000":430.85,"1625097600000":459.4784090909,"1627776000000":441.2833333333,"1630454400000":463.7261363636,"1633046400000":519.8833333333,"1635724800000":498.9011363636,"1638316800000":465.5083333333,"1640995200000":524.51875,"1643673600000":581.11375,"1646092800000":673.2090909091},
    #  {"index":3,"commodity":"Brent","unit":"\u20ac\/bbl","source":"Platts","1567296000000":57.0584492319,"1569888000000":54.0314846648,"1572566400000":57.0228938558,"1575158400000":60.312246918,"1577836800000":57.2117117117,"1580515200000":50.8390646492,"1583020800000":28.7706770315,"1585699200000":17.073283005,"1588291200000":26.5813612181,"1590969600000":35.5975122168,"1593561600000":37.8216871674,"1596240000000":37.8965167399,"1598918400000":34.60542652,"1601510400000":34.5651160721,"1604188800000":36.0456322708,"1606780800000":40.9722763212,"1609459200000":45.0675178808,"1612137600000":51.4378528505,"1614556800000":55.1576847328,"1617235200000":54.0136571195,"1619827200000":56.5999740829,"1622505600000":60.6306313105,"1625097600000":63.473162104,"1627776000000":60.1594166124,"1630454400000":63.3647039742,"1633046400000":72.120953409,"1635724800000":71.3586530152,"1638316800000":65.5566477958,"1640995200000":77.0932728405,"1643673600000":86.5750006613,"1646092800000":108.2262157757},....
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        """
        reading price data
        """
        print("reading price data")
        self.data_module = make_calculations()
        currency = request.values.get('currency', 'Euro')
        try:
            res = deepcopy(self.data_module.input.df_RMprice.copy())
        except:
            self.data_module.get_update_input()
            res = deepcopy(self.data_module.input.df_RMprice.copy())

        if currency not in res:
            currency = "Euro"
        res = res[currency]

        if res.shape[0] > 0:
            res.reset_index(inplace=True)
            res = res.to_dict()
        else:
            res = {}

        return Response(res)

    def post(self, request, format=None):
        print(request.data)
        return Response(None)


class GetInputsView(APIView):
    """
    # http://127.0.0.1:8000/get_inputs
    # Provides the user input data shown in the DATABASE FEED sheet in excel on the right side (green/yellow part)
    #
    # [{"site":"Augusta","feedstock":"EGCP","% LnP":null,"Benzinetta yield (mt\/mt)":null,"C10 recovery":0.95,"C14 recovery":0.95,"C15 recovery":0.9,"C18+ recovery":null,"Electricity yield":252.7978031818,"Feed yield (mt\/mt)":8.7491669434,"Freight\/CIF-FOB premium":null,"Fuel Sarroch yield":null,"Gasoil yield (ton\/ton)":0,"H2 rich gas yield":null,"HnP adsorption recovery":null,"LnP adsorption recovery":0.93,"NG yield":461.8290617424,"Premium Return (S\/mt)":8.0,"Premium kero ($\/mt) Long-Term":22.0,"Premium kero ($\/mt) Med-Term":17.0,"Return yield (mt\/mt)":7.6906127122,"Useful HnP TnP":null,"Useful LnP TnP":0.1142965961,"Useful total TnP":null,"VN yield (ton\/ton)":0.0335542312,"density feed (kg\/mc)":0.8013,"density return (kg\/mc)":0.8079200664,"loses":0.025,"loses due to cracking":0.006,"nP purity":0.99},
    #  {"site":"Augusta","feedstock":"ENI Livorno","% LnP":null,"Benzinetta yield (mt\/mt)":null,"C10 recovery":0.95,"C14 recovery":0.95,"C15 recovery":0.9,"C18+ recovery":null,"Electricity yield":184.4260770142,"Feed yield (mt\/mt)":5.1948833633,"Freight\/CIF-FOB premium":null,"Fuel Sarroch yield":null,"Gasoil yield (ton\/ton)":0,"H2 rich gas yield":null,"HnP adsorption recovery":null,"LnP adsorption recovery":0.93,"NG yield":328.5651925355,"Premium Return (S\/mt)":8.0,"Premium kero ($\/mt) Long-Term":22.0,"Premium kero ($\/mt) Med-Term":23.5,"Return yield (mt\/mt)":4.1483561508,"Useful HnP TnP":null,"Useful LnP TnP":0.1924971034,"Useful total TnP":null,"VN yield (ton\/ton)":0.0215272125,"density feed (kg\/mc)":0.7902666608,"density return (kg\/mc)":0.799865655,"loses":0.025,"loses due to cracking":0.006,"nP purity":0.99},
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        """
        reading price data
        """
        print("reading userinput data")
        self.data_module = make_calculations()
        try:
            res = deepcopy(self.data_module.input.data_in.copy())
        except:
            self.data_module.get_update_input()
            res = deepcopy(self.data_module.input.data_in.copy())

        if res.shape[0] > 0:
            res.reset_index(inplace=True)
            res = res.to_dict()
        else:
            res = {}

        return Response(res)

    def post(self, request, format=None):
        print(request.data)
        return Response(None)


class GetInputsEditableView(APIView):
    """
    # http://127.0.0.1:8000/get_inputs_editable
    # Provides the information whether data can be edited by the user or whether they are calculated in the tool 
    # refers to the colors shown in the DATABASE FEED sheet in excel on the right side (green/yellow part)
    #
    # [{"site":"Augusta","feedstock":"EGCP","% LnP":false,"Benzinetta yield (mt\/mt)":false,"C10 recovery":true,"C14 recovery":true,"C15 recovery":true,"C18+ recovery":false,"Electricity yield":true,"Feed yield (mt\/mt)":true,"Freight\/CIF-FOB premium":false,"Fuel Sarroch yield":false,"Gasoil yield (ton\/ton)":true,"H2 rich gas yield":false,"HnP adsorption recovery":false,"LnP adsorption recovery":true,"NG yield":true,"Premium Return (S\/mt)":true,"Premium kero ($\/mt) Long-Term":true,"Premium kero ($\/mt) Med-Term":true,"Return yield (mt\/mt)":true,"Useful HnP TnP":false,"Useful LnP TnP":true,"Useful total TnP":false,"VN yield (ton\/ton)":true,"density feed (kg\/mc)":true,"density return (kg\/mc)":true,"loses":true,"loses due to cracking":true,"nP purity":true},
    #  {"site":"Augusta","feedstock":"ENI Livorno","% LnP":false,"Benzinetta yield .... 
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        """
        reading price data
        """
        print("reading userinput data")
        self.data_module = make_calculations()
        try:
            res = deepcopy(self.data_module.input.data_in_editable.copy())
        except:
            self.data_module.get_update_input()
            res = deepcopy(self.data_module.input.data_in_editable.copy())
        res = res.replace(0, False)
        res = res.replace(1, True)
        if res.shape[0] > 0:
            res.reset_index(inplace=True)
            res = res.to_dict()
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
    # Provides the planning information shown in the excel INPUT sheet
    # if you do not provide additional information the ISOSIV data are shown
    #
    # [{"index":0,"feedstock":"EGCP","unit":"mt","1567296000000":null,"1569888000000":null,"1572566400000":null,"1575158400000":null,"1577836800000":null,"1580515200000":null,"1583020800000":null,"1585699200000":null,"1590969600000":null,"1593561600000":null,"1596240000000":27535.426,"1598918400000":29180.395,"1601510400000":28000.0,"1604188800000":50900.0,"1606780800000":0.0,"1609459200000":0.0,"1612137600000":0.0,"1614556800000":0.0,"1617235200000":0.0,"1619827200000":0.0,"1622505600000":0.0,"1625097600000":0.0,"1627776000000":0.0,"1630454400000":0.0,"1633046400000":0.0,"1635724800000":0.0,"1638316800000":0.0},
    #  {"index":1,"feedstock":"ENI Livorno","unit":"mt","1567296000000":null,"1569888000000":null,"1572566400000":null,"1575158400000":null,"1577836800000":null,"1580515200000":null,"1583020800000":null,"1585699200000":null,"1590969600000":9982.388,"1593561600000":null,"1596240000000":null,"1598918400000":9989.209,"1601510400000":10000.0,"1604188800000":0.0,"1606780800000":0.0,"1609459200000":0.0,"1612137600000":0.0,"1614556800000":10000.0,"1617235200000":0.0,"1619827200000":12000.0,"1622505600000":12000.0,"1625097600000":0.0,"1627776000000":0.0,"1630454400000":null,"1633046400000":null,"1635724800000":null,"1638316800000":12000.0},
    #  {"index":2,"feedstock":"ENI ...    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        """
        reading price data
        """
        print("reading userinput data")
        self.data_module = make_calculations()
        source = request.values.get('source', 'ISOSIV')

        try:
            res = deepcopy(self.data_module.input.df_plan_dict.copy())
        except:
            self.data_module.get_update_input()
            res = deepcopy(self.data_module.input.df_plan_dict.copy())

        if source not in res:
            source = "ISOSIV"
        res = res[source]

        if res.shape[0] > 0:
            res.reset_index(inplace=True)
            res = res.to_dict()
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
        """
        print("reading userinput data")
        self.data_module = make_calculations()
        try:
            self.data_module.input
        except:
            self.data_module.get_update_input()

        try:
            self.data_module.sona_plus_dict
        except:
            print("updating result values")
            self.data_module.update_res()

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

        category = request.values.get('category', 'Variable Costs')
        currency = request.values.get('currency', 'Euro')
        site = request.values.get('site', 'Augusta')
        res = self.data_module.res[category][currency][site].copy()
        res.reset_index(inplace=True)

        print("calc of one result done")
        if res.shape[0] > 0:
            res = res.to_dict()
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


class RunTests(APIView):
    """
    # http://127.0.0.1:8000/test
    # runs alll available apis and returns 
    # 
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        error = 0
        r = requests.get("http://127.0.0.1:8000/core/get_quality?format=json")
        print(r)
        r = pd.DataFrame(r.json())
        if r.shape[0] > 0:
            print(r)
        else:
            error += 1
        # return (Response(r))

        r = requests.get(
            "http://127.0.0.1:8000/core/get_price?Euro?format=json")
        r = pd.DataFrame(r.json())
        if r.shape[0] > 0:
            print(r)
        else:
            error += 1

        r = requests.get(
            "http://127.0.0.1:8000/core/get_price?Dollar?format=json")
        r = pd.DataFrame(r.json())
        if r.shape[0] > 0:
            print(r)
        else:
            error += 1

        r = requests.get("http://127.0.0.1:8000/core/get_inputs?format=json")
        r = pd.DataFrame(r.json())
        if r.shape[0] > 0:
            print(r)
        else:
            error += 1

        r = requests.get(
            "http://127.0.0.1:8000/core/get_inputs_editable?format=json")
        r = pd.DataFrame(r.json())
        if r.shape[0] > 0:
            print(r)
        else:
            error += 1

        r = requests.get(
            "http://127.0.0.1:8000/core/get_planned?ISOSIV?format=json")
        r = pd.DataFrame(r.json())
        if r.shape[0] > 0:
            print(r)
        else:
            error += 1

        r = requests.get(
            "http://127.0.0.1:8000/core/get_planned?MOLEX?format=json")
        r = pd.DataFrame(r.json())
        if r.shape[0] > 0:
            print(r)
        else:
            error += 1

        r = requests.get(
            "http://127.0.0.1:8000/core/get_planned?Kero_premium?format=json")
        r = pd.DataFrame(r.json())
        if r.shape[0] > 0:
            print(r)
        else:
            error += 1

        r = requests.get(
            "http://127.0.0.1:8000/core/get_res?category=Return Stream Price&currency=Euro&site=Augusta?format=json")
        r = pd.DataFrame(r.json())
        if r.shape[0] > 0:
            print(r)
        else:
            error += 1

        return Response('test done no errors')

    def post(self, request, format=None):
        print(request.data)
        return Response(None)
