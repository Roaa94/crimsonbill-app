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
        console.log('fetching balance transactions...');
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
        console.log('fetching account transactions...');
        accountsArray.forEach(account => {
            if (account.id === accountId) {
                account.transactions = transactionsArray;
            }
        });
    }
    return accountsArray;
};