import { BASE_URL } from "../utils/constants";

export const fetchGallery = async (page: number, perPage: number, query?:string) => {
    try {
        const response = await fetch(`${BASE_URL}/photos/?client_id=${import.meta.env.VITE_APP_API_KEY}&order_by=popular&page=${page}&per_page=${perPage}&query=${query}`);
        const data = await response.json()
        return data
    } catch (error) { 
        console.log('error', error);
    }

    return null;
}