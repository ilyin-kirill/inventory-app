from django.db import models

# Create your models here.

class Device(models.Model):
    account = models.CharField(max_length=200, verbose_name='Счёт, субсчёт')
    characteristics = models.CharField(max_length=200, verbose_name='Характеристика объект (вид, сорт,группа)')
    code = models.CharField(max_length=200, verbose_name='Код (номенклатурный номер)')
    code_okei = models.CharField(max_length=200 , verbose_name='Код по ОКЕИ')
    count_name = models.CharField(max_length=200, verbose_name='Наименование количества')
    price = models.CharField(max_length=200, verbose_name='Стоимость единицы (цена)')
    inventory_num = models.CharField(max_length=200, verbose_name='Инвентарный номер')
    pasport = models.CharField(max_length=200, verbose_name='Паспорт')
    fact_count = models.CharField(max_length=200, verbose_name='Фактическое кол-во')
    fact_sum = models.CharField(max_length=20, verbose_name='Фактическая сумма')
    accounting_count = models.CharField(max_length=200, verbose_name='Кол-во по бух. учету')
    accounting_sum = models.CharField(max_length=200, verbose_name='По бух. сумма')