import { LOGIN, LOGOUT, VIEW_HIRING_PAGE } from "./actionTypes";

export const login = (userData) => ({
	type: LOGIN,
	payload: userData,
});

export const logout = () => ({
	type: LOGOUT,
});

export const viewHiringPage = (hiringId) => ({
	type: VIEW_HIRING_PAGE,
	payload: {
		name: 'hiringId',
		id: hiringId
	}
});
