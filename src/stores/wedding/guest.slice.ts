import { StateCreator } from 'zustand';
export interface GuestSlice {
	//State
	guestCount: number;
	//Actions
	setGuestCount: (guestsCount: number) => void;
}

export const guestSlice: StateCreator<GuestSlice> = (set, get, store) => ({
	guestCount: 0,
	setGuestCount: (guestCount: number) => {
		if (guestCount <= 0) return;

		set({ guestCount });
	},
});
