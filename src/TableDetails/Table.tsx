import React, { useEffect, useState } from 'react';

import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
  } from '@tanstack/react-table';
import { Link } from '@tanstack/react-router';


const Table=({tableData,charcterColumns,info,page})=>{
    const[data,setData]=useState([]);
    const prevPage = info?.prev ? new URL(info.prev).searchParams.get("page") : null;
    const nextPage = info?.next ? new URL(info.next).searchParams.get("page") : null;
    const [prevPageState, setPrevPageState] = useState(prevPage);
    const [nextPageState, setNextPageState] = useState(nextPage);
    const[pageIndex,setPageIndex]=useState();
    useEffect(()=>{
   setData(tableData)
    },[tableData])
   
    const table = useReactTable({
        data,
        columns:charcterColumns,        
        getCoreRowModel: getCoreRowModel(),
      });
      console.log(table)
return(
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
                  <Link to={`/characters/${row.original.id}`}> {cell.renderValue()}</Link>
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
      <div>
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
      </div>
    </div>
)
}

export default Table;