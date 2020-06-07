from rest_framework import routers

from .views import TodoView

# from . import views
# from django.urls import path

router = routers.DefaultRouter()
router.register('todos', TodoView, 'todos')
# router.register('<URL prefix>', '<view class>', '<URL name>')

urlpatterns = router.urls

# urlpatterns = [
#     path('todos/', views.ListTodos.as_view())
# ]