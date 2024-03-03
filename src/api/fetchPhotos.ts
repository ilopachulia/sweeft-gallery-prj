import { createApi } from 'unsplash-js';
import { BASE_URL } from '../utils/constants';


export const api = createApi({
    apiUrl: BASE_URL,
    accessKey: import.meta.env.VITE_APP_API_KEY,
  });

 