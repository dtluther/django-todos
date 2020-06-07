from django.shortcuts import render
from django.views import generic

from todo_list.models import Todo

# Create your views here.
def index(request):
    return render(request, 'frontend/index.html')

class TodoDetailView(generic.DetailView):
    model = Todo
    template_name = 'frontend/index.html'