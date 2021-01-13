from rest_framework import serializers as sz
from .models import User , ClassRoom , Material , Stream

class MaterialSerializer(sz.ModelSerializer):
    class Meta:
        model = Material
        fields = '__all__'

class StreamSerializer(sz.ModelSerializer):
    class Meta:
        model = Stream
        fields = '__all__'


class GetFullUserSerializer(sz.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','UID','username','is_superuser','first_name', 'last_name','Role', )


class ClassRoomSerializer(sz.ModelSerializer):
    class Meta:
        model = ClassRoom
        fields = '__all__'


    def update(self , instance , validated_data):
        students = validated_data.pop('Students', [])
        materials = validated_data.pop('Materials',[])
        instance.Title = validated_data.get('Title', instance.Title)
        instance.isActive = validated_data.get('isActive', instance.isActive)
        for student in students:
            instance.Students.add(student)
        
        for material in materials:
            instance.Materials.add(material)
        
        instance.save()
        return instance


class ClassRoomListSerializer(sz.ModelSerializer):
    Faculty = sz.ReadOnlyField(source='Faculty.username')
    materials = sz.SerializerMethodField()

    def get_materials(self , instance):
        queryset=instance.materials.all()
        serialzer=MaterialSerializer(queryset, many=True)
        return serialzer.data
    class Meta:
        model = ClassRoom
        fields = ('id' , 'Title','Students','Faculty','isActive','materials')
        depth = 1
        


class UserSerializerWithToken(sz.ModelSerializer):    
    password = sz.CharField(write_only=True)
    token = sz.SerializerMethodField()    
    
    def get_token(self, object):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER        
        
        payload = jwt_payload_handler(object)
        token = jwt_encode_handler(payload)        
        return token    
        
    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create(
            UID = validated_data['UID'],
            username = validated_data['username'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            Role = validated_data['Role']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = User
        fields = ('token', 'username', 'password','UID', 'first_name','last_name','Role')
