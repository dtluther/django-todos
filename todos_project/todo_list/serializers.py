from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        # fields = ('id', 'title', 'description', 'completed', 'created_at')
        fields = '__all__' # apparently replaces above line!