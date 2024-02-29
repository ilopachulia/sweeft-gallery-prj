import { BASE_URL } from "../utils/constants";

export const fetchGallery = async () => {
    try {
        const response = await fetch(`${BASE_URL}/photos/?client_id=${import.meta.env.VITE_APP_API_KEY}`)
        const data = await response.json()
        console.log('images', data);
        return data
    } catch (error) { 
        console.log('error', error);
    }

    return null;
}