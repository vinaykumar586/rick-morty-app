
import api from "./api"
interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: {
      name: string;
    };
    location: {
      name: string;
    };
    image: string;
  }
export const fetchCharacters=async(page:any)=>{
    console.log(page,"ede")
    let response={}
  await api.get(`character?page=${page}`).then((res)=>{
    if(res.data){
        console.log(res.data)
        response=res?.data;
    }
    return response;
  }).catch((error)=>{
   console.log(error)
   response={}
   return response;
  })
  return response;
}


export const fetchCharactersById = async (id: string): Promise<Character> => {
  try {
    const res = await api.get(`character/${id}`);
    if (res.data) {
      return res.data;
    }
    throw new Error('No data found');
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      const notFoundError = new Error('Character not found');
      (notFoundError as any).status = 404;
      throw notFoundError;
    }
    throw error;
  }
};


  
export interface CharacterResponse {
    info: {
      count: number;
      pages: number;
      next: string | null;
      prev: string | null;
    };
    results: Character[];
  }
  

