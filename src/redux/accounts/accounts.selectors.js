import {createSelector} from "reselect";

export const selectAccounts = state => state.accounts;

export const selectAccountsArray = createSelector(
    [selectAccounts],
    accounts => accounts.accountsArray,
);

export const selectOtherAccounts = (accountId) => createSelector(
    [selectAccountsArray],
    accountsArray => {
        let otherAccounts = [];
        accountsArray.forEach(account => {
            if (account.id !== accountId) {
                otherAccounts.push({
                    id: account.id,
                    name: account.name,
                    balances: account.balances.map(balance => ({
                        id: balance.id,
                        name: balance.name,
                    })),
                })
            }
        })
        return otherAccounts;
    }
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
    [selectAccount(accountId)],
    account => account.balances
);

export const selectBalance = (accountId, balanceId) => createSelector(
    [selectAccountBalances(accountId)],
    balances => balances.find(balance => balance.id === balanceId),
);

export const selectBalanceTransactions = (accountId, balanceId) => createSelector(
    [selectBalance(accountId, balanceId)],
    balance => balance.transactions
);

export const selectTransaction = (accountId, balanceId, transactionId) => createSelector(
    [selectBalance(accountId, balanceId)],
    balance => {
        if(balance.transactions) {
            return balance.transactions.find(transaction => transaction.id === transactionId);
        }
    },
);

export const selectAllAccountTransactions = (accountId) => createSelector(
    [selectAccountBalances(accountId)],
    balances => {
        let allTransactions = [];
        balances.forEach(balance => {
            if (balance.transactions) {
                allTransactions.push(...balance.transactions);
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