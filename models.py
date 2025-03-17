from django.db import models
from slugify import slugify
import uuid
from core.models import User
from hr.models import Employee
from core.models import CoreBaseModel

# Create your models here.
class GradeSection(CoreBaseModel):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    libelle = models.TextField(null=False)


class GradeClasse(CoreBaseModel):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    libelle = models.TextField(null=False)
    grade = models.ForeignKey(GradeSection, null=False, on_delete=models.CASCADE)


class Promotion(CoreBaseModel):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    libelle = models.TextField(null=False)
    grade = models.ForeignKey(GradeClasse, null=False, on_delete=models.CASCADE)
    option = models.TextField(null=True, blank=True)

class Student(CoreBaseModel):
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True, related_name="student_user")  # Ajout de la relation avec User
    promotion = models.ForeignKey(Promotion, related_name='student_promotion', on_delete=models.CASCADE, null=True, blank=True)

    def delete(self, *args, **kwargs):
        # Supprimer l'utilisateur associé avant de supprimer l'employé
        self.user.delete()
        super().delete(*args, **kwargs)

class Teacher(CoreBaseModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    employee = models.ForeignKey(Employee, related_name='teacher_employee', on_delete=models.CASCADE)