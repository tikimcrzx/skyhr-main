# Generated by Django 3.1 on 2020-09-09 09:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_auto_20200909_1158'),
    ]

    operations = [
        migrations.AlterField(
            model_name='introductionvideo',
            name='candidate',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
