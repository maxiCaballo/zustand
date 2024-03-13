import { create } from 'zustand';

interface Bear {
	id: number;
	name: string;
}

interface BearState {
	blackBears: number;
	polarBears: number;
	pandaBears: number;
	bears: Bear[];
	computed: {
		totalBears: number;
	};
}

interface Actions {
	doNothing: () => void;
	addBears: () => void;
	clearBears: () => void;
	modifyBlackBearsPopulation: (by: number) => void;
	modifyPolarBearsPopulation: (by: number) => void;
	modifyPandaBearsPopulation: (by: number) => void;
}

export const useBearStore = create<BearState & Actions>()((set, get) => ({
	//State
	blackBears: 10,
	polarBears: 5,
	pandaBears: 1,
	bears: [{ id: 1, name: 'Oso #1' }],
	computed: {
		get totalBears() {
			return get().blackBears + get().polarBears + get().pandaBears + get().bears.length;
		},
	},
	//Actions
	doNothing: () => set((state) => ({ bears: [...state.bears] })),
	addBears: () =>
		set((state) => ({ bears: [...state.bears, { id: state.bears.length + 1, name: `Oso #${state.bears.length + 1}` }] })),
	clearBears: () => set({ bears: [] }),
	modifyBlackBearsPopulation: (by: number) => set((state) => ({ blackBears: state.blackBears + by })),
	modifyPolarBearsPopulation: (by: number) => set((state) => ({ polarBears: state.polarBears + by })),
	modifyPandaBearsPopulation: (by: number) => set((state) => ({ pandaBears: state.pandaBears + by })),
}));

/*
	En caso de querer usar el persist y querer tener propiedades conputadas, conviene hacerlo como un actions, es decir una funcion
	que retorna un valor.

*/
