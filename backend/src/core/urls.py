
from django.urls import path, re_path
from core.views import GetQualityView
from core.views import GetPriceView
from core.views import GetInputsView
from core.views import GetInputsEditableView
from core.views import GetPlannedView
from core.views import GetResView
from core.views import GetUpdateResView
from core.views import RunTests

urlpatterns = [
    path('get_quality/', GetQualityView.as_view()),
    path('get_price/', GetPriceView.as_view()),
    path('get_inputs/', GetInputsView.as_view()),
    path('get_inputs_editable/', GetInputsEditableView.as_view()),
    path('get_planned/', GetPlannedView.as_view()),
    path('get_res/', GetResView.as_view()),
    path('update_all_res/', GetUpdateResView.as_view()),
    path('test/', RunTests.as_view()),
]