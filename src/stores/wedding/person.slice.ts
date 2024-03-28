import { StateCreator } from 'zustand';

export interface PersonSlice {
	firstname: string;
	lastname: string;
	//Actions
	setFirstname: (firstname: string) => void;
	setLastname: (lastname: string) => void;
}

export const personSlice: StateCreator<PersonSlice> = (set, get, store) => ({
	//State
	firstname: '',
	lastname: '',
	//Actions
	setFirstname: (firstname: string) => set({ firstname }),
	setLastname: (lastname: string) => set({ lastname }),
});
