from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import permissions, status

from django.contrib.auth.models import User
from rest_framework.views import APIView
from .serializers import *
from .models import *

import logging


logger = logging.getLogger(__name__)

# Create your views here.
# 3 methods to create views:
# Method 1: Function-based Views
# Method 2: Class-based Views
# Method 3: Viewsets (sligthly more confusing)

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """

    #Get the user object associated with the request and serializes it
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

# Class-based view. For SIGN UP.
class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """
    # So that the user doesn't have to be logged in before signing up
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        # Serializer object instantiated with the data from the sign up form sent along with the request.
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            #If valid save the new user object. And send back that user's data with 201 status code.
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # e.g. Returns error message if username already exists
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# CURES
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def cures_list(request):
    try:
        name = request.GET['name']
        data = Cure.objects.filter(name=name)
    except:
        data = Cure.objects.all()
    finally:
        data = data[:10]
        serializer = CureSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)

# SYMPTOMS
@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def symptoms_list(request):
    try:
        search = request.data['search']
        logger.error(f"Search requested with keyword: {search}")
        data = Symptom.objects.filter(name__icontains=search)
        logger.error(data)
    except:
        logger.error('Something went wrong!')
    finally:
        if data:
            serializer = SymptomSerializer(data, context={'request': request}, many=True)
            logger.error(serializer.data)
            return Response(serializer.data)
        else:
            return Response({"message":"No Match"})
