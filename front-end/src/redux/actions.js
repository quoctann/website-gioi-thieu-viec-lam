import { AUTH_USER } from "./actionTypes";

export const authUser = userData => ({
    type: AUTH_USER,
    payload: userData
});