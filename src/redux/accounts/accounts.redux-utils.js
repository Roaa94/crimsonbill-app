export const addAccountBalances = (accountsArray, {accountId, balancesArray}) => {
    accountsArray.forEach(account => {
       if(account.id === accountId) {
           account.balances = balancesArray;
       }
    });
    return accountsArray;
}