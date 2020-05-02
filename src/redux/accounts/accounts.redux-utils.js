export const addAccountBalances = (accountsArray, {accountId, balancesArray}) => {
    accountsArray.forEach(account => {
        if (account.id === accountId) {
            account.balances = balancesArray;
        }
    });
    return accountsArray;
}

export const addAccountTransactions = (accountsArray, {accountId, balanceId, transactionsArray}) => {
    if (balanceId) {
        accountsArray.forEach(account => {
            if (account.id === accountId) {
                account.balances.forEach(balance => {
                    if (balance.id === balanceId) {
                        balance.transactions = transactionsArray;
                    }
                })
            }
        });
    } else {
        accountsArray.forEach(account => {
            if (account.id === accountId) {
                account.transactions = transactionsArray;
            }
        });
    }
    return accountsArray;
};