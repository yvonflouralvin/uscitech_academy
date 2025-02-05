from django.db import models
from slugify import slugify
import uuid
from core.models import User


# Create your models here.
class GradeSection(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    libelle = models.TextField(null=False)


class GradeClasse(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    libelle = models.TextField(null=False)
    grade = models.ForeignKey(GradeSection, null=False, on_delete=models.CASCADE)


class Promotion(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    libelle = models.TextField(null=False)
    grade = models.ForeignKey(GradeClasse, null=False, on_delete=models.CASCADE)

class Student(models.Model):
    
    id = id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True, related_name="student_user")  # Ajout de la relation avec User
    promotion = models.ForeignKey(Promotion, related_name='student_promotion', on_delete=models.CASCADE, null=True, blank=True) 
    
