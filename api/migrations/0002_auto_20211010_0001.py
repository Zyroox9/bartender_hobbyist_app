# Generated by Django 3.2.8 on 2021-10-09 22:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='coctail',
            name='styles',
        ),
        migrations.AddField(
            model_name='coctail',
            name='style',
            field=models.CharField(choices=[('SR', 'Sour'), ('CR', 'Creamy'), ('SF', 'Spirit-Forward'), ('CH', 'Champagne'), ('HI', 'Highball'), ('SW', 'Sweet'), ('FR', 'Fruity'), ('SP', 'Spicy'), ('OT', 'Other')], default='SR', max_length=2),
        ),
    ]
