import { useQuery } from '@tanstack/react-query'
import { z } from 'zod';
import { createFileRoute, useSearch } from '@tanstack/react-router'
import { fetchCharacters,CharacterResponse } from '../../Api/actions'

import '../../Css/Table.css'
import { charcterColumns } from '../../TableDetails/CharacterColumns';
import Table from '../../TableDetails/Table';
import { useState } from 'react';


export const Route = createFileRoute('/characters/')({
  component: CharacterListPage,
  validateSearch: (search) => ({
    page: search.page ? Number(search.page) : 1,
  }),
})

function CharacterListPage() {
  const { page } = useSearch({ from: "/characters/" })
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
  
if (tableData.length === 0) {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', color: '#888' }}>
      <h1>No Characters Found</h1>
      <p>The page you are looking for may not exist or has no data.</p>
    </div>
  );
}

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
