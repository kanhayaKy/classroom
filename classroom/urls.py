from django.urls import path
from .views import *

urlpatterns = [
    path('current_user/', get_current_user),
    path('users/create', CreateUserView.as_view()),
    path('users/<int:pk>', get_user),
    path('classes/', ClassRoomList.as_view()),
    path('classes/<int:pk>', ClassRoomDetail.as_view()),
    path('material/', MaterialList.as_view()),
    path('material/<int:pk>', MaterialDetail.as_view()),
    path('stream/', StreamList.as_view()),
    path('stream/<int:pk>', StreamDetail.as_view()),

]