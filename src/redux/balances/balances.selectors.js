import {createSelector} from "reselect";

const selectBalances = state => state.balances;

export const selectBalancesArray = createSelector(
    [selectBalances],
    balances => balances.balancesArray,
);

export const selectHasBalances = createSelector(
    [selectBalances],
    balances => balances && balances.balancesArray && balances.balancesArray.length > 0,
);

export const selectIsFetchingBalances = createSelector(
    [selectBalances],
    balances => balances.isFetchingBalances,
);

export const selectAccountBalances = accountId => createSelector(
    [selectBalancesArray],
    balancesArray => balancesArray.filter(balance => balance.accountId === accountId),
);

export const selectAccountHasBalances = accountId => createSelector(
    [selectAccountBalances(accountId)],
    accountBalances => accountBalances && accountBalances.length > 0,
);

export const selectBalance = balanceId => createSelector(
    [selectBalancesArray],
    balancesArray => balancesArray.find(balance => balance.id === balanceId),
);

export const selectBalanceCurrencyCode = balanceId => createSelector(
    [selectBalance(balanceId)],
    balance => balance.currencyCode,
);