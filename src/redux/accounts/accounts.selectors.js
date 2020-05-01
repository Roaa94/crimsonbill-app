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
            if (account.id === accountId) {
                balances = account.balances;
            }
        });
        return balances;
    },
);

export const selectAccountTransactions = (accountId, balanceId) => createSelector(
    [selectAccountsArray],
    accountsArray => {
        let transactions = [];
        if (balanceId) {
            accountsArray.forEach(account => {
                if (account.id === accountId) {
                    account.balances.forEach(balance => {
                        if (balance.id === balanceId) {
                            transactions = balance.transactions;
                        }
                    })
                }
            });
        } else {
            accountsArray.forEach(account => {
                if (account.id === accountId) {
                    transactions = account.transactions;
                }
            });
        }
        return transactions;
    },
);