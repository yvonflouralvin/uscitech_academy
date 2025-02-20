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

from django.contrib.auth.hashers import make_password
import os

from core.utils import Paginator

class GradeSectionViewSet(viewsets.ModelViewSet):
    queryset = GradeSection.objects.all()
    serializer_class = GradeSectionSerializer
    pagination_class = Paginator
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ["libelle"]

class GradeClasseViewSet(viewsets.ModelViewSet):
    queryset = GradeClasse.objects.all()
    serializer_class = GradeClasseSerializer
    pagination_class = Paginator
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ["libelle", "grade__libelle"]

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
                user, created_user = User.objects.get_or_create(
                    username=row['email'],
                    defaults={
                        'name': row['name'],
                        'first_name': row['first_name'],
                        'last_name': row['last_name'],
                        'phone': row.get('phone', ''),
                        'sexe': 'm',  # Valeur par défaut, peut être ajustée si disponible,
                        "password" : make_password(os.environ.get("DEFAULT_PASS", "1234")),
                        "is_active" : True,
                        "email" : row['email']
                    }
                )

                if not created_user :
                    user.first_name = row['first_name']
                    user.last_name = row['last_name']
                    user.name = row['name']
                    user.email = row['email']
                    user.is_active=True

                    user.save()
                
                try:
                    permission = Permission.objects.get(codename="isp_user_student")
                    user.user_permissions.add(permission)
                except: 
                    pass
                try:
                    permission = Permission.objects.get(codename="academy_is_student")
                    user.user_permissions.add(permission)
                except:
                    pass
                
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

    def destroy(self, request, *args, **kwargs):
        """Retirer la permission 'academy_is_teacher' lors de la suppression d'un Teacher"""
        instance = self.get_object()  # Récupère l'instance à supprimer
        user = instance.employee.user  # Assumant que Employee a une relation OneToOne avec User

        # Vérifier si la permission existe et retirer la permission de l'utilisateur
        try:
            permission = Permission.objects.get(codename="academy_is_teacher")
            user.user_permissions.remove(permission)
        except Permission.DoesNotExist:
            pass  # Si la permission n'existe pas, on ne fait rien

        return super().destroy(request, *args, **kwargs)