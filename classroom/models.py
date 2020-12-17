from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    UID = models.CharField(max_length=10 , unique=True)
    Role_choices = [
        ("TR", "Faculty"),
        ("ST" , "Student")
    ]
    Role = models.CharField(
        max_length=2,
        choices=Role_choices,
        default="ST",
    )

    def __str__(self):
        return f"{self.pk} : {self.username}"


class ClassRoom(models.Model):
    Title = models.CharField(max_length=64 , null=False )
    Students = models.ManyToManyField("User" , related_name="classroom_students" , blank=True)
    Faculty = models.ForeignKey("User" , related_name="classroom_faculty", on_delete=models.CASCADE)
    isActive = models.BooleanField(default=True)
    Materials = models.ManyToManyField("Material" , related_name="classroom_materials" , blank=True)

    def __str__(self):
        return self.Title

class Material(models.Model):
    Title = models.CharField(max_length=64 , null=False )
    Description = models.CharField(max_length=64 , null=False )
    Type_choices = [
        ("Notes" , "Notes"),
        ("Assignment", "Assignment"),
        ("Other", "Others")
    ]
    Type = models.CharField(
        max_length=10,
        choices=Type_choices,
        default="Notes",
    )
    Content = models.FileField(upload_to ='materials/') 
    Date = models.DateTimeField(auto_now_add = True)
    Deadline = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'{self.Type} : {self.Title}'


class Stream(models.Model):
    User = models.OneToOneField("User" , related_name="stream_creator" , on_delete=models.CASCADE)
    Message = models.CharField(max_length=256 , null=False)
    Materials = models.ManyToManyField("Material" , related_name="stream_content" , blank=True)

 
    def __str__(self):
        return f'{self.User} : {self.Message}'
   