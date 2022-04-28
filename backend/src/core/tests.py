from rest_framework.test import APITestCase, APIClient
from datetime import datetime

from django.contrib.auth.models import User
import pandas as pd

from django.urls import reverse
from rest_framework import status


class WorkflowTestCase(APITestCase):
    @classmethod
    def setUpClass(self):
        super().setUpClass()
        self.user = User.objects.create_user(
            username='admin', email='admin@admin.com', password='top_secret')
        self.client = APIClient()
        self.client.login(username='admin', password='top_secret')

    # def test_get_quality_data(self):
    #     print('\n... Testing quality data')
    #     self.client.force_authenticate(user=self.user)
    #     response = self.client.get(reverse('get_quality'))
    #     # Check that we get data
    #     self.assertGreater(len(response.json())>1, 0)     

        
    def test_get_price_data(self):
        self.client.force_authenticate(user=self.user)

        # Check that we get data
        print('\n... Testing price data for currency dollar')
        price_data = {'value':'Dollar'}
        response = self.client.get(reverse('get_price'),price_data)
        self.assertGreater(len(response.json())>1, 0)
        
        # Check that we get data
        print('\n... Testing price data for currency euro')
        price_data = {'value':'Euro'}
        response = self.client.get(reverse('get_price'),price_data)
        self.assertGreater(len(response.json())>1, 0)
        
        # Check that we get data
        print('\n... Testing price data for default')
        response = self.client.get(reverse('get_price'))
        self.assertGreater(len(response.json())>1, 0)
        
        
    def test_get_input_data(self):
        self.client.force_authenticate(user=self.user)

        # Check that we get data
        print('\n... Testing input data')
        response = self.client.get(reverse('get_inputs'))
        self.assertGreater(len(response.json())>1, 0)
        
    # def test_get_input_editable_data(self):
    #     self.client.force_authenticate(user=self.user)

    #     # Check that we get data
    #     print('\n... Testing input editable data')
    #     response = self.client.get(reverse('get_inputs_editable'))
    #     self.assertGreater(len(response.json())>1, 0)


    def test_get_plan_data(self):
        self.client.force_authenticate(user=self.user)
        # Check that we get data

        print('\n... Testing plan data for ISOSIV')
        plan_data = {'value':'ISOSIV'}
        response = self.client.get(reverse('get_planned'),plan_data)
        self.assertGreater(len(response.json())>1, 0)

        print('\n... Testing plan data for MOLEX')
        plan_data = {'value':'MOLEX'}
        response = self.client.get(reverse('get_planned'),plan_data)
        self.assertGreater(len(response.json())>1, 0)

        print('\n... Testing plan data for Kero_premium')
        plan_data = {'value':'Kero_premium'}
        response = self.client.get(reverse('get_planned'),plan_data)
        self.assertGreater(len(response.json())>1, 0)

        print('\n... Testing plan data for default')
        response = self.client.get(reverse('get_planned'))
        self.assertGreater(len(response.json())>1, 0)

        
    def test_get_result_data(self):
        self.client.force_authenticate(user=self.user)

        print('\n... Testing results data for Sarroch Dollar Variable Costs')
        res_data = {'site': 'Sarroch',
                    'currency': 'Dollar',
                    'category': 'Variable Costs'}
        response = self.client.get(reverse('get_res'),res_data)
        self.assertGreater(len(response.json())>1, 0)
        
        print('\n... Testing results data for Augusta Dollar Feedstock Premium')
        res_data = {'site': 'Augusta',
                    'currency': 'Dollar',
                    'category': 'Feedstock Premium'}
        response = self.client.get(reverse('get_res'),res_data)
        self.assertGreater(len(response.json())>1, 0)

        print('\n... Testing results data for default')
        response = self.client.get(reverse('get_res'))
        self.assertGreater(len(response.json())>1, 0)

