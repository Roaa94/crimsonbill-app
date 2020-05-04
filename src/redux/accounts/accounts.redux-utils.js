export const addAccountBalances = (accountsArray, {accountId, balancesArray}) => {
    accountsArray.forEach(account => {
        if (account.id === accountId) {
            account.balances = balancesArray;
        }
    });
    return accountsArray;
}

export const addAccountTransactions = (accountsArray, {accountId, balanceId, transactionsArray}) => {
    accountsArray.forEach(account => {
        if (account.id === accountId) {
            if (account.balances) {
                account.balances.forEach(balance => {
                    if (balance.id === balanceId) {
                        balance.transactions = transactionsArray;
                    }
                })
            }
        }
    });
    return accountsArray;
};