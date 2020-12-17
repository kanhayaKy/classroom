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
        fields = ('id','UID','username','is_superuser','first_name', 'last_name' )


class ClassRoomSerializer(sz.ModelSerializer):

    class Meta:
        model = ClassRoom
        fields = '__all__'

class ClassRoomListSerializer(sz.ModelSerializer):
    Students = GetFullUserSerializer(read_only=True,  many=True)
    Faculty = sz.ReadOnlyField(source='Faculty.username')
    class Meta:
        model = ClassRoom
        fields = '__all__'
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
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = User
        fields = ('token', 'username', 'password','UID', 'first_name','last_name',)
