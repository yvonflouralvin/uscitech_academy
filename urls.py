from django.urls import path, include
from . import views
from .views_set import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter() 

router.register('gradesections', GradeSectionViewSet)
router.register('gradeclasses', GradeClasseViewSet)

urlpatterns = [
    path('',include(router.urls))
]
