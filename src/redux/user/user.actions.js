import {UserActionTypes} from "./user.action-types";

export const setUser = user => ({
    type: UserActionTypes.SET_USER,
    payload: user
});

export const setIsCalculatingBalance = value => ({
    type: UserActionTypes.TOGGLE_IS_CALCULATING_BALANCE,
    payload: value,
})