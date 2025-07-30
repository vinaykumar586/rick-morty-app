import axios from "axios";
const RICKY_MORTY_API_URL = "https://rickandmortyapi.com/api";

const api=axios.create({
    baseURL: RICKY_MORTY_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;