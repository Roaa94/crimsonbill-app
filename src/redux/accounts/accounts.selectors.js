import {createSelector} from "reselect";

export const selectAccounts = state => state.accounts;

export const selectAccountsArray = createSelector(
    [selectAccounts],
    accounts => accounts.accountsArray,
);

export const selectHasAccounts = createSelector(
    [selectAccounts],
    accounts => accounts && accounts.accountsArray && accounts.accountsArray.length > 0,
);

export const selectAccountFormShow = createSelector(
    [selectAccounts],
    accounts => accounts.accountFormShow,
);

export const selectIsFetchingAccounts = createSelector(
    [selectAccounts],
    accounts => accounts.isFetchingAccounts,
);

export const selectAccount = accountId => createSelector(
    [selectAccountsArray],
    accountsArray => accountsArray.find(account => account.id === accountId),
);