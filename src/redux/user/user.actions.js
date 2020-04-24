import {userActionTypes} from "./user.action-types";

export const setUser = user => ({
    type: userActionTypes.SET_CURRENT_USER,
    payload: user
});

export const updateUserAvatar = avatarUrl => ({
    type: userActionTypes.UPDATE_USER_AVATAR,
    payload: avatarUrl,
});

export const updateUserAccounts = accounts => ({
    type: userActionTypes.UPDATE_USER_ACCOUNTS,
    payload: accounts,
});