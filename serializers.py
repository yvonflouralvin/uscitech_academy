from rest_framework import serializers
from core.models import User
from core.serializers import UserSerializer
from .models import GradeSection, GradeClasse, Promotion, Student



class GradeSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GradeSection
        fields = ['id', 'libelle']  # Vous pouvez ajuster les champs selon vos besoins


class GradeClasseSerializer(serializers.ModelSerializer):
    grade = GradeSectionSerializer()  # On inclut le grade comme un nested serializer

    class Meta:
        model = GradeClasse
        fields = ['id', 'libelle', 'grade']


class PromotionSerializer(serializers.ModelSerializer):
    grade = GradeClasseSerializer()  # On inclut le grade comme un nested serializer

    class Meta:
        model = Promotion
        fields = ['id', 'libelle', 'grade']


class StudentSerializer(serializers.ModelSerializer):
    promotion = PromotionSerializer()  # On inclut la classe comme un nested serializer
    # user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)  # Lien avec le modèle User
    user = UserSerializer()
    class Meta:
        model = Student
        fields = ['id', 'promotion', 'user']