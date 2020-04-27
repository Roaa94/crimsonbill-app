import {createSelector} from 'reselect';

const selectUser = state => state.user;

export const selectUserAuthData = createSelector(
    [selectUser],
    user => user.authData,
);

export const selectUserAccounts = createSelector(
    [selectUser],
    user => user.accounts,
);