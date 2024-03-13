import { StateStorage, createJSONStorage } from 'zustand/middleware';

const firebaseUrl = 'https://zustand-storage-d17da-default-rtdb.firebaseio.com/zustand';

const firebaseStorageAPI: StateStorage = {
	getItem: async function (name: string): Promise<string | null> {
		try {
			const resp = await fetch(`${firebaseUrl}/${name}.json`);
			const data = await resp.json();

			return JSON.stringify(data);
		} catch (error) {
			throw error;
		}
	},
	setItem: async function (name: string, value: string): Promise<void> {
		try {
			await fetch(`${firebaseUrl}/${name}.json`, {
				method: 'PUT',
				body: value,
			});

			return;
		} catch (error) {
			throw error;
		}
	},
	removeItem: function (name: string): void | Promise<void> {
		console.log('removeItem', name);
	},
};

export const firebaseStorage = createJSONStorage(() => firebaseStorageAPI);
