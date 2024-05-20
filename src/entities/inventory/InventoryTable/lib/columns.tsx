import { ColumnDef } from '@tanstack/react-table';
import { TEquipment, IndeterminateCheckbox } from '../../../../shared';

export const columns: ColumnDef<TEquipment, any>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorFn: (row) => row.account,
    id: 'account',
    cell: (info) => info.getValue(),
    header: () => <span>Счёт, субсчёт</span>,
  },
  {
    accessorFn: (row) => row.characteristics,
    id: 'characteristics',
    cell: (info) => info.getValue(),
    header: () => <span>Наименование</span>,
  },
  {
    accessorFn: (row) => row.code,
    id: 'code',
    cell: (info) => info.getValue(),
    header: () => <span>Код (номенклатурный номер)</span>,
  },
  {
    accessorFn: (row) => row.code_okei,
    id: 'code_okei',
    cell: (info) => info.getValue(),
    header: () => <span>Код по ОКЕИ</span>,
  },
  {
    accessorFn: (row) => row.count_name,
    id: 'count_name',
    cell: (info) => info.getValue(),
    header: () => <span>Наименование количества</span>,
  },
  {
    accessorFn: (row) => row.price,
    id: 'price',
    header: () => <span>Стоимость единицы (руб.)</span>,
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: 'range',
    },
  },
  {
    accessorFn: (row) => row.inventory_num,
    id: 'inventory_num',
    header: () => <span>Инвентарный номер</span>,
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.pasport,
    id: 'pasport',
    header: () => <span>Паспорт</span>,
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.fact_count,
    id: 'fact_count',
    header: () => <span>Фактическое количество</span>,
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: 'range',
    },
  },
  {
    accessorFn: (row) => row.fact_sum,
    id: 'fact_sum',
    header: () => <span>Фактическая сумма</span>,
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: 'range',
    },
  },
  {
    accessorFn: (row) => row.accounting_count,
    id: 'accountant_count',
    header: () => <span>Количество по бухгалтерскому учету</span>,
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: 'range',
    },
  },
  {
    accessorFn: (row) => row.accounting_sum,
    id: 'accounting_sum',
    header: () => <span>Сумма по бухгалтерскому учету</span>,
    cell: (info) => info.getValue(),
  },
];
