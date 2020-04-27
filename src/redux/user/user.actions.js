import {userActionTypes} from "./user.action-types";

export const setUser = user => ({
    type: userActionTypes.SET_USER,
    payload: user
});