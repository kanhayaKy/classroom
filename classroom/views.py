from . serializers import *
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions
from django.shortcuts import render
from rest_framework import status , generics
from . models import ClassRoom


#Class room views
class ClassRoomList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, ]

    def get_queryset(self):
        return ClassRoom.objects.filter(Students = self.request.user) or ClassRoom.objects.filter(Faculty = self.request.user)
    
    def get_serializer_class(self):
        if self.request.method == "GET":
            return ClassRoomListSerializer
        else:
            return ClassRoomSerializer


class ClassRoomDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ClassRoom.objects.all()
    
    def get_serializer_class(self):
        if self.request.method == "GET":
            return ClassRoomListSerializer
        else:
            return ClassRoomSerializer
#Material views
class MaterialList(generics.ListCreateAPIView):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer


class MaterialDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer

#Stream views
class StreamList(generics.ListCreateAPIView):
    queryset = Stream.objects.all()
    serializer_class = StreamSerializer


class StreamDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Stream.objects.all()
    serializer_class = StreamSerializer

#User views
@api_view(['GET'])
def get_user(request , pk):
    user = User.objects.get(pk=pk)
    serializer = GetFullUserSerializer(user)
    return Response(serializer.data)


@api_view(['GET'])
def get_current_user(request):
    serializer = GetFullUserSerializer(request.user)
    return Response(serializer.data)


class CreateUserView(APIView):
    permission_classes = (permissions.AllowAny, )    
    
    def post(self,request):
        user = request.data.get('user')
        print(user)
        if not user:
            return Response({'response' : 'error', 'message' : 'No data found'})
        serializer = UserSerializerWithToken(data = user)        
        print(serializer.is_valid())
        print(serializer.errors)
        if serializer.is_valid():
            saved_user = serializer.save()
        else:
            return Response({"response" : "error", "message" : serializer.errors})        
        return Response({"response" : "success", "message" : "user created succesfully"})