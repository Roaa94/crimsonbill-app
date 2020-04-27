import {createSelector} from "reselect";

export const selectAccounts = state => state.accounts;

export const selectAccountsArray = createSelector(
    [selectAccounts],
    accounts => accounts.accountsArray,
);

export const selectAccountsFetching = createSelector(
    [selectAccounts],
    accounts => accounts.isFetchingAccounts,
);


export const selectAccountBalances = accountId => createSelector(
    [selectAccounts],
    accounts => accounts.accountsArray.map(account => {
        if(account.id === accountId) {
            return account.balances;
        }
        return [];
    }),
);