# Generated by Django 3.1.5 on 2021-01-31 08:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('usercostumer', '0003_auto_20210131_1539'),
        ('posts', '0004_auto_20210129_1758'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='post',
            field=models.ImageField(height_field='height_field', upload_to='media/image/post', width_field='width_field'),
        ),
        migrations.AlterField(
            model_name='post',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='author', to='usercostumer.userprofil'),
        ),
    ]