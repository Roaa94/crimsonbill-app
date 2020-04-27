import {createSelector} from 'reselect';

export const selectUser = state => state.user;

export const selectUserAccountsLoaded = createSelector(
    [selectUser],
    user => !!user.accounts
);