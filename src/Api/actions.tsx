
import api from "./api"
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
export const fetchCharactersById=async(id:any)=>{
    let response={}
  await api.get(`character/${id}`).then((res)=>{
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

