import { TEquipment } from '../../../../shared';

export const textFieldsConfig = [
  {
    label: 'Счёт, субсчёт',
    name: 'account',
  },
  {
    label: 'Наименование',
    name: 'characteristics',
  },
  {
    label: 'Код (номенклатурный номер)',
    name: 'code',
  },
  {
    label: 'Код по ОКЕИ',
    name: 'code_okei',
  },
  {
    label: 'Наименование количества',
    name: 'count_name',
  },
  {
    label: 'Инвентарный номер',
    name: 'inventory_num',
  },
  {
    label: 'Паспорт',
    name: 'pasport',
  },
  {
    label: 'Стоимость единицы (руб.)',
    name: 'price',
  },
  {
    label: 'Фактическое кол-во',
    name: 'fact_count',
  },
  {
    label: 'Фактическая сумма',
    name: 'fact_sum',
  },
  {
    label: 'Кол-во по бух. учету',
    name: 'accounting_count',
  },
  {
    label: 'По бух. сумма',
    name: 'accounting_sum',
  },
];

export const defaultInventory: Omit<TEquipment, 'id'> = {
  account: '',
  characteristics: '',
  code: '',
  code_okei: '',
  count_name: 'шт',
  inventory_num: '',
  pasport: '',
  price: '',
  fact_count: '',
  fact_sum: '',
  accounting_count: '',
  accounting_sum: '',
};
