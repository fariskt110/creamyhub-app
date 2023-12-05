# Generated by Django 4.2.6 on 2023-11-24 05:43

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("creamyhubapp", "0019_remove_order_brand"),
    ]

    operations = [
        migrations.RenameField(
            model_name="order",
            old_name="cakeid",
            new_name="adress",
        ),
        migrations.RenameField(
            model_name="order",
            old_name="cakename",
            new_name="pstatus",
        ),
        migrations.RenameField(
            model_name="order",
            old_name="cakeprice",
            new_name="totel",
        ),
        migrations.RemoveField(
            model_name="order",
            name="image",
        ),
        migrations.RemoveField(
            model_name="order",
            name="order_status",
        ),
        migrations.RemoveField(
            model_name="order",
            name="quantity",
        ),
    ]
