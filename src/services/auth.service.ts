import { AxiosError } from 'axios';
import { tesloApi } from '../api/tesloApi';

export interface LoginResponse {
	id: string;
	email: string;
	fullName: string;
	isActive: boolean;
	roles: string[];
	token: string;
}

export class AuthService {
	static login = async (email: string, password: string): Promise<LoginResponse> => {
		try {
			const { data } = await tesloApi.post<LoginResponse>('/auth/login', { email, password });

			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error.response?.data);
				throw new Error(error.response?.data);
			}

			throw new Error('Unable to login');
		}
	};

	static checkStatus = async (): Promise<LoginResponse> => {
		//El token se manda por los interceptors
		try {
			const { data } = await tesloApi.post<LoginResponse>('/auth/check-status');

			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error.response?.data);
				throw new Error(error.response?.data);
			}

			throw new Error('UnAuthorized');
		}
	};
}
