from django.shortcuts import render # here by default [my comment]
from rest_framework import viewsets
from rest_framework.views import APIView

from .serializers import TodoSerializer
from .models import Todo

# need to figure out logging a bit
# # import the logging library
# import logging

# Create your views here.

# # Get an instance of a logger
# logger = logging.getLogger(__name__)

class TodoView(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

# class ListTodos(APIView):
#     def get(self, request, format=None):
#         """
#         Return a list of all todos.
#         """
#         logger.info('Hit get in ListTodos(APIView)')

#         todos = Todo.objects.all()
#         serialized_todos = TodoSerializer(todos)
#         return Response(serialized_todos.data)

#     def delete(self, request, pk, format=None):
#         logger.info('Hit delete method')
#         todo = self.get_object(pk)
#         todo.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)