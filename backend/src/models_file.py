# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Commodity(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=1000, blank=True, null=True)
    modified_at = models.DateField(blank=True, null=True)
    modified_by = models.CharField(max_length=1000, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'commodity'


class Feedstock(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=1000, blank=True, null=True)
    modified_at = models.DateField(blank=True, null=True)
    modified_by = models.CharField(max_length=1000, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'feedstock'


class Homologues(models.Model):
    id = models.IntegerField(primary_key=True)
    site = models.ForeignKey('Site', models.DO_NOTHING, blank=True, null=True)
    feedstock = models.ForeignKey(Feedstock, models.DO_NOTHING, blank=True, null=True)
    name = models.CharField(max_length=1000, blank=True, null=True)
    value = models.FloatField(blank=True, null=True)
    scenario = models.ForeignKey('Scenario', models.DO_NOTHING, blank=True, null=True)
    modified_at = models.DateField(blank=True, null=True)
    modified_by = models.CharField(max_length=1000, blank=True, null=True)
    is_editable = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'homologues'


class Isosiv(models.Model):
    id = models.IntegerField(primary_key=True)
    feedstock = models.ForeignKey(Feedstock, models.DO_NOTHING, blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    value = models.FloatField(blank=True, null=True)
    unit = models.ForeignKey('Unit', models.DO_NOTHING, blank=True, null=True)
    scenario = models.ForeignKey('Scenario', models.DO_NOTHING, blank=True, null=True)
    is_editable = models.IntegerField(blank=True, null=True)
    modified_at = models.DateField(blank=True, null=True)
    modified_by = models.CharField(max_length=1000, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'isosiv'


class KeroPremium(models.Model):
    id = models.IntegerField(primary_key=True)
    feedstock = models.ForeignKey(Feedstock, models.DO_NOTHING, blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    value = models.FloatField(blank=True, null=True)
    unit = models.ForeignKey('Unit', models.DO_NOTHING, blank=True, null=True)
    scenario = models.ForeignKey('Scenario', models.DO_NOTHING, blank=True, null=True)
    is_editable = models.IntegerField(blank=True, null=True)
    modified_at = models.DateField(blank=True, null=True)
    modified_by = models.CharField(max_length=1000, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'kero_premium'


class Molex(models.Model):
    id = models.IntegerField(primary_key=True)
    feedstock = models.ForeignKey(Feedstock, models.DO_NOTHING, blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    value = models.FloatField(blank=True, null=True)
    unit = models.ForeignKey('Unit', models.DO_NOTHING, blank=True, null=True)
    scenario = models.ForeignKey('Scenario', models.DO_NOTHING, blank=True, null=True)
    is_editable = models.IntegerField(blank=True, null=True)
    modified_at = models.DateField(blank=True, null=True)
    modified_by = models.CharField(max_length=1000, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'molex'


class Price(models.Model):
    id = models.IntegerField(primary_key=True)
    commodity = models.ForeignKey(Commodity, models.DO_NOTHING, blank=True, null=True)
    source = models.ForeignKey('Source', models.DO_NOTHING, blank=True, null=True)
    unit = models.ForeignKey('Unit', models.DO_NOTHING, blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    value = models.FloatField(blank=True, null=True)
    scenario = models.ForeignKey('Scenario', models.DO_NOTHING, blank=True, null=True)
    is_editable = models.IntegerField(blank=True, null=True)
    is_calculated = models.IntegerField(blank=True, null=True)
    modified_at = models.DateField(blank=True, null=True)
    modified_by = models.CharField(max_length=1000, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'price'


class Scenario(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=1000, blank=True, null=True)
    modified_at = models.DateField(blank=True, null=True)
    modified_by = models.CharField(max_length=1000, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'scenario'


class ScenarioDbValues(models.Model):
    id = models.IntegerField(primary_key=True)
    site = models.ForeignKey('Site', models.DO_NOTHING, blank=True, null=True)
    feedstock = models.ForeignKey(Feedstock, models.DO_NOTHING, blank=True, null=True)
    name = models.FloatField(blank=True, null=True)
    value = models.FloatField(blank=True, null=True)
    scenario = models.ForeignKey(Scenario, models.DO_NOTHING, blank=True, null=True)
    modified_at = models.DateField(blank=True, null=True)
    modified_by = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'scenario_db_values'


class ScenarioPlanValues(models.Model):
    id = models.IntegerField(primary_key=True)
    feedstock = models.ForeignKey(Feedstock, models.DO_NOTHING, blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    value = models.FloatField(blank=True, null=True)
    unit = models.ForeignKey('Unit', models.DO_NOTHING, blank=True, null=True)
    type = models.FloatField(blank=True, null=True)
    scenario = models.ForeignKey(Scenario, models.DO_NOTHING, blank=True, null=True)
    modified_at = models.DateField(blank=True, null=True)
    modified_by = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'scenario_plan_values'


class ScenarioPriceValues(models.Model):
    id = models.IntegerField(primary_key=True)
    commodity = models.ForeignKey(Commodity, models.DO_NOTHING, blank=True, null=True)
    source = models.ForeignKey('Source', models.DO_NOTHING, blank=True, null=True)
    unit = models.ForeignKey('Unit', models.DO_NOTHING, blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    value = models.FloatField(blank=True, null=True)
    scenario = models.ForeignKey(Scenario, models.DO_NOTHING, blank=True, null=True)
    modified_at = models.DateField(blank=True, null=True)
    modified_by = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'scenario_price_values'


class Site(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=1000, blank=True, null=True)
    modified_at = models.DateField(blank=True, null=True)
    modified_by = models.CharField(max_length=1000, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'site'


class Source(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=1000, blank=True, null=True)
    modified_at = models.DateField(blank=True, null=True)
    modified_by = models.CharField(max_length=1000, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'source'


class Unit(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=1000, blank=True, null=True)
    modified_at = models.DateField(blank=True, null=True)
    modified_by = models.CharField(max_length=1000, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'unit'


class UserInputDb(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=1000, blank=True, null=True)
    value = models.FloatField(blank=True, null=True)
    site = models.ForeignKey(Site, models.DO_NOTHING, blank=True, null=True)
    feedstock = models.ForeignKey(Feedstock, models.DO_NOTHING, blank=True, null=True)
    scenario = models.ForeignKey(Scenario, models.DO_NOTHING, blank=True, null=True)
    is_editable = models.IntegerField(blank=True, null=True)
    is_calculated = models.IntegerField(blank=True, null=True)
    modified_at = models.DateField(blank=True, null=True)
    modified_by = models.CharField(max_length=1000, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_input_db'
