import {userActionTypes} from "./user.action-types";

export const setUserAuthData = user => ({
    type: userActionTypes.SET_USER_AUTH_DATA,
    payload: user
});

export const setUserAccounts = accountsArray => ({
    type: userActionTypes.SET_USER_ACCOUNTS,
    payload: accountsArray,
});