# Generated by Django 3.1 on 2020-10-02 08:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0007_auto_20201002_1136'),
    ]

    operations = [
        migrations.RenameField(
            model_name='jobs',
            old_name='city',
            new_name='country',
        ),
    ]
