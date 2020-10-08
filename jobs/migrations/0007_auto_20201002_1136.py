# Generated by Django 3.1 on 2020-10-02 08:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0006_auto_20201002_1127'),
    ]

    operations = [
        migrations.RenameField(
            model_name='jobs',
            old_name='employer_address',
            new_name='street',
        ),
        migrations.AddField(
            model_name='jobs',
            name='city',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AddField(
            model_name='jobs',
            name='state',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AddField(
            model_name='jobs',
            name='zipcode',
            field=models.CharField(blank=True, max_length=10),
        ),
    ]
