import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { PersonSlice, personSlice } from './person.slice';
import { guestSlice, GuestSlice } from './guest.slice';
import { dateSlice, DateSlice } from './date.slice';
import { ConfirmationSlice, confirmationSlice } from './confirmation.slice';

type SlicesState = PersonSlice & GuestSlice & DateSlice & ConfirmationSlice;

export const useWeddingBoundStore = create<SlicesState>()(
	devtools((...a) => ({
		...personSlice(...a),
		...guestSlice(...a),
		...dateSlice(...a),
		...confirmationSlice(...a),
	})),
);

devtools;
/* 
En vez de usar el create en cada slice se usa en uno solo y se le van añadiendo esos slices en un solo create para poder crear un store grande
formado por muchos slices chiquitos. El nombre BoundStore hace referencia a que es un store conformado por slices.
*/
