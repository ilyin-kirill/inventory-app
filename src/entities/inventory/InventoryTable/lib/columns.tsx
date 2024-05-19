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
    accessorFn: (row) => row.name,
    id: 'name',
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
    accessorFn: (row) => row.invetoryCode,
    id: 'invetoryCode',
    header: () => <span>Инвентарный номер</span>,
    cell: (info) => info.getValue(),
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
    accessorFn: (row) => row.fact.amount,
    id: 'fact.amount',
    header: () => <span>Фактическое кол-во (шт)</span>,
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: 'range',
    },
  },
  {
    accessorFn: (row) => row.accountant.amount,
    id: 'accountant.amount',
    header: () => <span>Кол-во по бух. учету (шт)</span>,
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: 'range',
    },
  },
  {
    accessorFn: (row) => row.accountant.amount * row.price,
    id: 'finalPrice',
    header: () => <span>Итоговая стоимость (руб.)</span>,
    cell: (info) => info.getValue(),
  },
];
