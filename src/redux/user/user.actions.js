import {UserActionTypes} from "./user.action-types";

export const setUser = user => ({
    type: UserActionTypes.SET_USER,
    payload: user
});