import { type StateCreator, create } from 'zustand';
import { StateStorage, persist, createJSONStorage, devtools } from 'zustand/middleware';
import { firebaseStorage } from '../storages';

interface PersonState {
	firstName: string;
	lastName: string;
}

interface Actions {
	setFirstName: (value: string) => void;
	setLastName: (value: string) => void;
}

const personStore: StateCreator<PersonState & Actions, [['zustand/devtools', never]]> = (set) => ({
	firstName: '',
	lastName: '',
	setFirstName: (value: string) => set((state) => ({ firstName: value }), false, 'setFirstName'),
	setLastName: (value: string) => set((state) => ({ lastName: value }), false, 'setLastName'),
});

//*1 Local Storage por defecto
export const usePersonStore = create<PersonState & Actions>()(
	persist(personStore, {
		name: 'person-storage',
	}),
);

// //*2 Custom storage para session storage
// const sessionStorageAPI: StateStorage = {
// 	getItem: function (name: string): string | Promise<string | null> | null {
// 		const data = sessionStorage.getItem(name);
// 		return data;
// 	},
// 	setItem: function (name: string, value: string): void | Promise<void> {
// 		sessionStorage.setItem(name, value);
// 	},
// 	removeItem: function (name: string): void | Promise<void> {
// 		console.log('removeItem', name);
// 	},
// };
// export const usePersonStore = create<PersonState & Actions>()(
// 	devtools(
// 		persist(personStore, {
// 			name: 'person-storage',
// storage: createJSONStorage(() => sessionStorageAPI)//Session storage
// storage: firebaseStorage,//Firebase storage
// 		}),
// 	),
// );

/*
    Middlewares:
    - Persist:  El persist es un middleware que nos ayuda a persistir la informacion en local storage, recibe como primer parametro el callback
    que retorna el state y las actions y como 2do parametro el nombre que se le va a asignar a ese estado en localStorage.

    Por defecto el persist me guarda el estado en local storage, si quiero guardarlo en otro lado por ejemplo en session storage tengo
    que hacerlo de manera manual. crearme un objeto StateStorage y pasarselo como segundo parametro en una propiedad llamada storage
    ésta propiedad recibe una funcion que me crea un json con todo mi estado ya serializado para que yo ya pueda guardarlo manualmente
    donde quiera. 
    
    -Devtools: El devtools es un middleware que me permite poder usear las developer tools de redux.
    


*/
