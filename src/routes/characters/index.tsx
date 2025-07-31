import { useQuery } from '@tanstack/react-query'
import { z } from 'zod';
import { createFileRoute, useSearch } from '@tanstack/react-router'
import { fetchCharacters, CharacterResponse } from '../../Api/actions'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import '../../Css/Table.css'
import { charcterColumns } from '../../TableDetails/CharacterColumns';
import Table from '../../TableDetails/Table';
import { useFilters } from '../../filters/useFilters';
import { useState } from 'react';
export const Route = createFileRoute('/characters/')({
  component: CharacterListPage,
  validateSearch: (search) => ({
    page: search.page ? Number(search.page) : 1,
  }),
})

function CharacterListPage() {
  const { page } = useSearch({ from: "/characters/" })
  const { filters, resetFilters, setFilters } = useFilters(Route.id);
  type PaginationState = {
    pageIndex: number;
    pageSize: number;
  };
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const { data, isLoading, isFetching, refetch } = useQuery<CharacterResponse>({
    queryKey: ['characters', page],
    queryFn: () => fetchCharacters(page),
  })
  const tableData = data?.results || [];
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <div className='charcters_list_page'>
        {!isLoading && tableData?.length > 0 ? <><Table
          page={page} charcterColumns={charcterColumns} info={data?.info} tableData={tableData} />
          <button onClick={() => refetch()}>Refresh Characters</button>
        </>
          : null}
      </div>
    </>
  )
}
