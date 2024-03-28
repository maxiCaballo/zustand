import axios from 'axios';
import { useAuthStore } from '../stores';

const tesloApi = axios.create({
	baseURL: 'http://localhost:3000/api',
});

//Interceptors
tesloApi.interceptors.request.use((config) => {
	const token = useAuthStore.getState().token;

	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}

	return config;
});

//Todo:

//- Leer el store de Zustand

export { tesloApi };

/* 
Como no estoy en un componente de react no utilizo un hook useAuthStore(state => state.token)
sino que utilizo el metodo de zustand getState()
 */
