# Generated by Django 3.0.5 on 2020-06-02 05:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo_list', '0002_auto_20200509_2227'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='color',
            field=models.TextField(blank=True),
        ),
    ]
