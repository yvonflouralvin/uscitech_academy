from .models import *
from .serializers import *
from rest_framework import viewsets, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend

from core.utils import Paginator

class GradeSectionViewSet(viewsets.ModelViewSet):
    queryset = GradeSection.objects.all()
    serializer_class = GradeSectionSerializer

class GradeClasseViewSet(viewsets.ModelViewSet):
    queryset = GradeClasse.objects.all()
    serializer_class = GradeClasseSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    pagination_class = Paginator
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ["user__username", "user__first_name", "user__last_name"]

    @action(detail=False, methods=['get'])
    def me(self, request):
        student = Student.objects.filter(user=request.user).first()
        if student:
            serializer = self.get_serializer(student)
            return Response(serializer.data)
        return Response({"detail": "Aucun étudiant associé à cet utilisateur."}, status=404)
    

class PromotionViewSet(viewsets.ModelViewSet):
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer
    pagination_class = Paginator
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ["libelle", "grade__libelle"]


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    pagination_class = Paginator
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ["employee__fullname", "employee__user__name",  "employee__user__last_name",  "employee__user__first_name",  "employee__user__phone",  "employee__user__email"]