# Generated by Django 3.2.8 on 2021-10-10 13:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_coctail_style'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coctail',
            name='glass',
            field=models.CharField(choices=[('HI', 'Highball'), ('LO', 'Lowball'), ('CT', 'Coctail'), ('SH', 'Shot'), ('WN', 'Wine'), ('CH', 'Champagne')], default='HI', max_length=2),
        ),
    ]
