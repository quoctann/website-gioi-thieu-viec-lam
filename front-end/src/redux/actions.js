import { LOGIN, LOGOUT, VIEW_HIRING_PAGE, XEM_CHI_TIET_UNG_VIEN } from "./actionTypes";

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

export const xemChiTietUngVien = (ungvienId, vieclamId) => ({
	type: XEM_CHI_TIET_UNG_VIEN,
	payload: {
		ungvienId: ungvienId,
		vieclamId: vieclamId,
	}
})
