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

export const selectAccount = accountId => createSelector(
    [selectAccountsArray],
    accountsArray => accountsArray.find(account => account.id === accountId),
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

export const selectBalance = (accountId, balanceId) => createSelector(
    [selectAccountBalances(accountId)],
    balances => balances.find(balance => balance.id === balanceId),
);

export const selectAccountTransactions = (accountId, balanceId) => createSelector(
    [selectAccountsArray],
    accountsArray => {
        let transactions = [];
        accountsArray.forEach(account => {
            if (account.id === accountId) {
                account.balances.forEach(balance => {
                    if (balance.id === balanceId) {
                        transactions = balance.transactions;
                    }
                })
            }
        });
        return transactions;
    },
);

export const selectAllBalancesTransactions = (accountId) => createSelector(
    [selectAccountsArray],
    accountsArray => {
        let allTransactions = [];
        accountsArray.forEach(account => {
            if (account.id === accountId && account.balances) {
                account.balances.forEach(balance => {
                    if (balance.transactions) {
                        allTransactions.push(...balance.transactions);
                    }
                });
            }
        });
        //Sort transactions by transaction date
        allTransactions.sort((transactionA, transactionB) => {
            let transactionATimestamp = transactionA.dateTime.seconds;
            let transactionBTimestamp = transactionB.dateTime.seconds;
            return transactionATimestamp + transactionBTimestamp;
        })
        return allTransactions;
    }
);