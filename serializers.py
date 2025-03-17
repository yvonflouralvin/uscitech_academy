from rest_framework import serializers
from core.models import User
from core.serializers import UserSerializer
from .models import *
from django.contrib.auth.hashers import make_password
from hr.serializers import EmployeeSerializer
from hr.models import Employee
from django.contrib.auth.models import  Permission
import os


class GradeSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GradeSection
        fields = ['id', 'libelle']  # Vous pouvez ajuster les champs selon vos besoins


class GradeClasseSerializer(serializers.ModelSerializer):
    grade = GradeSectionSerializer(read_only=True)  # On inclut le grade comme un nested serializer

    class Meta:
        model = GradeClasse
        fields = ['id', 'libelle', 'grade']


class PromotionSerializer(serializers.ModelSerializer):
    grade = GradeClasseSerializer(read_only=True)  # On inclut le grade comme un nested serializer
    grade_id = serializers.PrimaryKeyRelatedField(
        queryset=GradeClasse.objects.all(), source="grade", allow_null=False, required=True, write_only=True
    )
    student_count = serializers.SerializerMethodField()

    class Meta:
        model = Promotion
        fields = ['id', 'libelle', 'grade', 'option', 'student_count', 'grade_id']

    def get_student_count(self, obj):
        return obj.student_promotion.count()


class StudentSerializer(serializers.ModelSerializer):
    promotion = PromotionSerializer(read_only=True)
    promotion_id = serializers.PrimaryKeyRelatedField(
        queryset=Promotion.objects.all(), source="promotion", allow_null=True, required=True
    )
    user = UserSerializer(read_only=True)

    phone = serializers.CharField(write_only=True, required=False)
    fullname = serializers.CharField(required=True, write_only=True)
    email = serializers.CharField(write_only=True, required=True)


    class Meta:
        model = Student
        fields = ['id', 'promotion', 'user', "phone", "fullname", "email", "promotion_id"]

    def create(self, validated_data):
        fullname = validated_data.pop("fullname", None) 
        email = validated_data.pop("email", None)
        phone = validated_data.pop("phone", None)

        fullname_splited = str(fullname).split(" ")
        # Création d'un utilisateur s'il n'est pas fourni
        user = User.objects.create( 
            name = fullname_splited[0] ,
            last_name = fullname_splited[1] if len(fullname_splited) >=2 else fullname_splited[0],
            first_name = fullname_splited[2] if len(fullname_splited) >=3 else fullname_splited[0],
            username = email,
            phone = phone if phone != "" else None,
            email = email,
            password = make_password(os.environ.get("DEFAULT_PASS", "1234"))
        )
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

        user.save()

        # Création de l'employé avec l'utilisateur nouvellement créé
        validated_data["user"] = user
        #validated_data["fullname"] = fullname  # Correction ici 
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Mise à jour de l'utilisateur associé 

        fullname = validated_data.pop("fullname", None) 
        email = validated_data.pop("email", None)
        phone = validated_data.pop("phone", None)

        user = instance.user

        if fullname :
            fullname_splited = str(fullname).split(" ")
            user.name = fullname_splited[0]
            user.last_name = fullname_splited[1] if len(fullname_splited) >=2 else fullname_splited[0]
            user.first_name = fullname_splited[2] if len(fullname_splited) >=3 else fullname_splited[0]

        if email :
            user.username = email
            user.email = email
        
        if phone :
            user.phone = phone if phone != "" else None

        permission = Permission.objects.get(codename="isp_user_student")
        user.user_permissions.add(permission)
        permission = Permission.objects.get(codename="academy_is_student")
        user.user_permissions.add(permission)
        user.save()

        validated_data["user"] = user 

        return super().update(instance, validated_data)


class TeacherSerializer(serializers.ModelSerializer):
    
    employee = EmployeeSerializer(read_only=True)
    employee_id = serializers.PrimaryKeyRelatedField(
        queryset = Employee.objects.all(), source="employee", allow_null=False, required=True
    )
    
    class Meta :
        model = Teacher
        fields = ['id', 'employee', "employee_id"]

    def create(self, validated_data):
        teacher: Teacher = super().create(validated_data)
        permission = Permission.objects.get(codename="academy_is_teacher")
        teacher.employee.user.user_permissions.add(permission)
        return teacher

    def update(self, instance, validated_data):
        teacher = super().update(instance, validated_data)
        # Ajouter la permission "isp_user_student" à l'utilisateur associé à l'employé
        permission = Permission.objects.get(codename="academy_is_teacher")
        teacher.employee.user.user_permissions.add(permission)
        return teacher
