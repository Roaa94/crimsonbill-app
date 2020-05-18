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

export const selectOtherAccounts = (accountId) => createSelector(
    [selectAccountsArray],
    accountsArray => {
        let otherAccounts = [];
        accountsArray.forEach(account => {
            if (account.id !== accountId) {
                otherAccounts.push({
                    id: account.id,
                    name: account.name,
                })
            }
        })
        return otherAccounts;
    }
);

export const selectIsFetchingAccounts = createSelector(
    [selectAccounts],
    accounts => accounts.isFetchingAccounts,
);

export const selectAccount = accountId => createSelector(
    [selectAccountsArray],
    accountsArray => accountsArray.find(account => account.id === accountId),
);

export const selectAccountName = accountId => createSelector(
    [selectAccount(accountId)],
    account => account.name,
);