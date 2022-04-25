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
        

        

    def test_get_quality_data(self):

      

        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse('get_quality'))
        # Check that we get data
        self.assertGreater(pd.DataFrame(response.json()).shape[0], 0)
        
