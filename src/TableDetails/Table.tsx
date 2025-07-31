import React, { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table';
import { Link } from '@tanstack/react-router';


type PaginationState = {
    pageIndex: number;
    pageSize: number;
};

const Table = ({ tableData, charcterColumns, info, page }) => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const prevPage = info?.prev ? new URL(info.prev).searchParams.get("page") : null;
    const nextPage = info?.next ? new URL(info.next).searchParams.get("page") : null;
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })
    const pageIndex = page - 1;
    useEffect(() => {
        setData(tableData)
    }, [tableData])

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
        onPaginationChange: (updater) => {
            const newPageIndex = typeof updater === 'function' ? updater({ pageIndex, pageSize: 20 }).pageIndex : updater.pageIndex
            navigate({ search: { page: newPageIndex + 1 }, replace: false })
        },
        state: {
            pagination,
        },
    });
    console.log(table.getCanPreviousPage(), table, "d3d3", pageIndex, info)
    return (
        <div className='charcters_table'>
            <table className="w3-table-all">
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th
                                key={header.id}
                                onClick={header.column.getToggleSortingHandler()}
                            >
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                    {/* <Link to={`/characters/${row.original.id}`}> {cell.renderValue()}</Link> */}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>

            </table>
            <div className="h-2" />
            <div className="flex items-center gap-2">
                <button
                    className="border rounded p-1"
                    onClick={() => table.firstPage()}
                    disabled={pageIndex == 0}
                >
                    {'<<'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.previousPage()}
                    disabled={pageIndex < 1}
                >
                    {'<'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.nextPage()}
                    disabled={page >= info.pages}
                >
                    {'>'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.lastPage()}
                    disabled={page >= info.pages}
                >
                    {'>>'}
                </button>
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount().toLocaleString()}
                    </strong>
                </span>
                <span className="flex items-center gap-1">
                    | Go to page:
                    <input
                        type="text"
                        value={page}
                        max={table.getPageCount()}
                        // defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            table.setPageIndex(page)
                        }}
                        className="border p-1 rounded w-16"
                    />
                </span>

            </div>
            {/* <div>
      <Link to="/characters" search={{page:1}}>
        <button
          disabled={info?.prev==null ||page==1}
        >
          First Page
        </button>
        </Link>
        <Link to="/characters" search={{page:page-1}}>
        <button
          disabled={info?.prev==null||info?.prev==1}
        >
          Previous Page
        </button>
        </Link>
        <Link to="/characters" search={{page:page+1}}>
        <button
          disabled={page>=info.pages}
        >
          Next Page
        </button>
        </Link>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Last Page
        </button>
        <span>
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div> */}
        </div>
    )
}

export default Table;