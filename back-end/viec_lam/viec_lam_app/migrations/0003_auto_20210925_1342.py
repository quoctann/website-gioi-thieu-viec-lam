# Generated by Django 3.2.5 on 2021-09-25 13:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('viec_lam_app', '0002_alter_kinhnghiem_ten'),
    ]

    operations = [
        migrations.AlterField(
            model_name='kynang',
            name='ten',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='phucloi',
            name='ten',
            field=models.CharField(max_length=50),
        ),
    ]
