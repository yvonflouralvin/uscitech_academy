from django.shortcuts import render , get_object_or_404
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import JsonResponse 
from django.db.models import Q

from .models import * 
from .serializers import *


