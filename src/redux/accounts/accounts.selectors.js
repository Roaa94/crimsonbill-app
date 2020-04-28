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
    [selectAccountsArray],
    accountsArray => {
        let balances = [];
        accountsArray.forEach(account => {
            if(account.id === accountId) {
                balances = account.balances;
            }
        });
        return balances;
    },
);

export const selectBalancesFetching = createSelector(
    [selectAccounts],
    accounts => accounts.isFetchingBalances,
);

export const selectIsBalancesLoaded = accountId => createSelector(
    [selectAccountBalances(accountId)],
    balances => !!balances,
);