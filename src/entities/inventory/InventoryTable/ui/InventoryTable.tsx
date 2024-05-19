import { ReactElement, useState, useEffect, useMemo, useContext } from 'react';
import {
  Chip,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from '@mui/material';
import {
  Column,
  ColumnFiltersState,
  RowData,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
  HiArrowSmUp,
  HiArrowSmDown,
} from 'react-icons/hi';
import { RiExportFill } from 'react-icons/ri';
import { makeInventoryData, TEquipment } from '../../../../shared';
import { columns } from '../lib';
import styles from './InventoryTable.module.scss';
import { useNavigate } from 'react-router-dom';
import { ActionsContext } from '../../../../actions';

declare module '@tanstack/react-table' {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'select';
  }
}

function InventoryTable(): ReactElement {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { handleOpenCreateInventoryPopup } = useContext(ActionsContext);

  const navigate = useNavigate();

  const inventoryColumns = useMemo(() => columns, []);

  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<TEquipment[]>(() =>
    makeInventoryData(1_000)
  );

  const table = useReactTable({
    data,
    columns: inventoryColumns,
    filterFns: {},
    state: {
      columnFilters,
    },
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <Filter column={table.getHeaderGroups()[0].headers[1].column} />
        <Button variant="contained" className={styles.button}>
          <RiExportFill />
          Экспорт
        </Button>
      </div>
      <div className={styles.services}>
        <div className={styles.amount}>
          <span>Всего найдено</span>
          <Chip
            label={table.getPrePaginationRowModel().rows.length}
            color="primary"
          />
        </div>
        <div className={styles.buttonsBlock}>
          <Button variant="contained" color="error">
            Удалить
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleOpenCreateInventoryPopup}
          >
            Создать
          </Button>
        </div>
      </div>
      <table className={styles.table}>
        <thead className={styles.head}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className={styles.tr} key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    className={styles.th}
                    key={header.id}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <HiArrowSmUp />,
                            desc: <HiArrowSmDown />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr className={styles.tr} key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      className={styles.td}
                      key={cell.id}
                      onClick={() => {
                        if (cell.column.id !== 'select') {
                          localStorage.setItem(
                            'inventoryItem',
                            JSON.stringify(row.original)
                          );
                          navigate(row.original.code);
                        }
                      }}
                    >
                      <span className={styles.shortText}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </span>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="h-2" />
      <div className={styles.navBlock}>
        <div className={styles.leftNavBlock}>
          <Button
            variant="outlined"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className={styles.button}
          >
            <HiOutlineArrowNarrowLeft />
            Первая страница
          </Button>
          <Button
            variant="outlined"
            className={styles.buttonIcon}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <HiOutlineArrowNarrowLeft />
          </Button>
          <Button
            variant="outlined"
            className={styles.buttonIcon}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <HiOutlineArrowNarrowRight />
          </Button>
        </div>
        <Button
          variant="outlined"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          className={styles.button}
        >
          Последняя страница
          <HiOutlineArrowNarrowRight />
        </Button>
      </div>
      <div className={styles.goToPage}>
        <Chip
          label={`Страница ${table.getState().pagination.pageIndex + 1} из ${table.getPageCount()}`}
        />
        <div className={styles.inputGoToPage}>
          <TextField
            label="Введите номер страницы"
            size="small"
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
          />
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel id="number-elements">Кол-во элементов</InputLabel>
            <Select
              labelId="number-elements"
              label="Кол-во элементов"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <MenuItem key={pageSize} value={pageSize}>
                  {pageSize}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
}

function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  return filterVariant === 'range' ? (
    <div>
      <div className="flex space-x-2">
        {/* See faceted column filters example for min max values functionality */}
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : filterVariant === 'select' ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
    >
      {/* See faceted column filters example for dynamic select options */}
      <option value="">All</option>
      <option value="complicated">complicated</option>
      <option value="relationship">relationship</option>
      <option value="single">single</option>
    </select>
  ) : (
    <DebouncedInput
      className="w-36 border shadow rounded"
      onChange={(value) => column.setFilterValue(value)}
      placeholder="Поиск по названию"
      type="text"
      value={(columnFilterValue ?? '') as string}
    />
    // See faceted column filters example for datalist search suggestions
  );
}

// A typical debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      className={styles.input}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default InventoryTable;
