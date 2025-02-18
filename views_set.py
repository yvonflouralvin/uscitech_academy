from .models import *
from .serializers import *
from rest_framework import viewsets, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
import pandas as pd
from rest_framework.parsers import MultiPartParser, FormParser 
from rest_framework import status

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
    
    @action(detail=False, methods=['post'], url_path='bulk-upload')
    def bulk_upload(self, request):
        promotion_id = request.data.get('promotion_id', None)
        file = request.FILES.get('file')
        if not file:
            return Response({'error': 'Aucun fichier fourni.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            df = pd.read_excel(file)
            created_students = []
            
            for _, row in df.iterrows():
                # full_name = f"{row['first_name']} {row['name']} {row['last_name']}".strip()
                user, created = User.objects.get_or_create(
                    username=row['email'],
                    defaults={
                        'name': row['name'],
                        'first_name': row['first_name'],
                        'last_name': row['last_name'],
                        'phone': row.get('phone', ''),
                        'sexe': 'm'  # Valeur par défaut, peut être ajustée si disponible
                    }
                )
                
                promotion = None
                
                if promotion_id :
                    promotion = Promotion.objects.filter(id=promotion_id).first()
                    
                student, created = Student.objects.get_or_create(
                    user=user,
                    defaults={'promotion': promotion}
                )
                created_students.append(student.id)
            
            return Response({'message': 'Importation réussie.', 'students': created_students}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

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