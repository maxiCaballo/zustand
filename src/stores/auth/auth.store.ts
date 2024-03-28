import { type StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { AuthStatus, User } from '../../interfaces';
import { AuthService } from '../../services/auth.service';

interface AuthState {
	//State
	status: AuthStatus;
	user?: User;
	token?: string;
	//Actions
	loginUser: (email: string, password: string) => Promise<void>;
	logoutUser: () => void;
	checkAuthStatus: () => Promise<void>;
}

const authStore: StateCreator<AuthState> = (set) => ({
	status: 'unauthorized',
	user: undefined,
	token: undefined,
	//Actions
	loginUser: async (email: string, password: string) => {
		try {
			const { token, ...rest } = await AuthService.login(email, password);

			set({ status: 'authorized', token, user: rest });
		} catch (error) {
			set({ status: 'unauthorized', token: undefined, user: undefined });
			throw 'Unauthorized';
		}
	},
	logoutUser: () => {
		set({ status: 'unauthorized', token: undefined, user: undefined });
	},
	checkAuthStatus: async () => {
		try {
			const { token, ...rest } = await AuthService.checkStatus();
			set({ status: 'authorized', token, user: rest });
		} catch (error) {
			set({ status: 'unauthorized', token: undefined, user: undefined });
			throw 'Unauthorized';
		}
	},
});

export const useAuthStore = create<AuthState>()(
	devtools(
		persist(authStore, {
			name: 'auth-storage', //Nombre en local storage
		}),
	),
);
