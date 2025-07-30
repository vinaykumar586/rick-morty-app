import { useQuery } from '@tanstack/react-query'
import {z} from 'zod';
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
export const Route = createFileRoute('/characters/')({
  component: CharacterListPage,
  validateSearch:(search)=>({
    page:search.page?Number(search.page):1,
  }),
})

function CharacterListPage() {
  const { page } = useSearch({ from: "/characters/" })

  const { data, isLoading, refreshCharacters } = useQuery<CharacterResponse>({
    queryKey:['characters',page],
   
    queryFn:()=>fetchCharacters(page),
  })
  const tableData=data?.results||[];
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
    <div className='charcters_list_page'>
      <button onClick={()=>refreshCharacters()}>Refresh Characters</button>
     {!isLoading&&tableData?.length>0? <Table page={page} charcterColumns={charcterColumns} info={data?.info} tableData={tableData}/>:null}
    </div>
    </>
  )
}
