import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';

interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
  image: string;
}

interface TableProps {
  tableData: Character[];
  charcterColumns: ColumnDef<Character, any>[];
  info: Info;
  page: number;
}

const Table: React.FC<TableProps> = ({ tableData, charcterColumns, info, page }) => {
  const [data, setData] = useState<Character[]>([]);
  const navigate = useNavigate();
  const prevPage = info?.prev ? new URL(info.prev).searchParams.get('page') : null;
  const nextPage = info?.next ? new URL(info.next).searchParams.get('page') : null;

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page - 1,
    pageSize: 10,
  });

  useEffect(() => {
    setData(tableData);
  }, [tableData]);
useMemo(()=>{

},[tableData])
  const table = useReactTable({
    data,
    columns: charcterColumns,
    rowCount: info?.count,
    pageCount: info?.pages,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: (updater: Updater<PaginationState>) => {
      const newPageIndex =
        typeof updater === 'function'
          ? updater({ pageIndex: pagination.pageIndex, pageSize: 10 }).pageIndex
          : updater.pageIndex;

      navigate({ search: { page: newPageIndex + 1 }, replace: false });
    },
    state: {
      pagination,
    },
  });

  return (
    <div className="charcters_table">
      <table className="w3-table-all">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button className="border rounded p-1" onClick={() => table.firstPage()} disabled={pagination.pageIndex === 0}>
          {'<<'}
        </button>
        <button className="border rounded p-1" onClick={() => table.previousPage()} disabled={pagination.pageIndex < 1}>
          {'<'}
        </button>
        <button className="border rounded p-1" onClick={() => table.nextPage()} disabled={page >= info.pages}>
          {'>'}
        </button>
        <button className="border rounded p-1" onClick={() => table.lastPage()} disabled={page >= info.pages}>
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {pagination.pageIndex + 1} of {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            value={page}
            min={1}
            max={table.getPageCount()}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
      </div>
    </div>
  );
};

export default Table;
