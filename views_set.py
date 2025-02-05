from .models import *
from .serializers import *
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny

from core.utils import Paginator

class GradeSectionViewSet(viewsets.ModelViewSet):
    queryset = GradeSection.objects.all()
    serializer_class = GradeSectionSerializer

class GradeClasseViewSet(viewsets.ModelViewSet):
    queryset = GradeClasse.objects.all()
    serializer_class = GradeClasseSerializer