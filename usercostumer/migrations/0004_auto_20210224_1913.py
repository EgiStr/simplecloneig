# Generated by Django 3.1.5 on 2021-02-24 12:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usercostumer', '0003_userprofil_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofil',
            name='name',
            field=models.CharField(max_length=30),
        ),
    ]
