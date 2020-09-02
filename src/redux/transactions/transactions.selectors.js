import {createSelector} from "reselect";

const selectTransactions = state => state.transactions;

export const selectTransactionsArray = createSelector(
    [selectTransactions],
    transactions => transactions.transactionsArray ? transactions.transactionsArray : [],
);

export const selectBalanceTransactions = balanceId => createSelector(
    [selectTransactionsArray],
    transactionsArray => transactionsArray.filter(transaction => transaction.balanceId === balanceId),
);

export const selectTransaction = transactionId => createSelector(
    [selectTransactionsArray],
    transactionsArray => transactionsArray.find(transaction => transaction.id === transactionId),
);

export const selectHasTransactions = createSelector(
    [selectTransactions],
    transactions => transactions && transactions.transactionsArray && transactions.transactionsArray.length > 0
);

export const selectBalanceHasTransactions = balanceId => createSelector(
    [selectBalanceTransactions(balanceId)],
    balanceTransactions => balanceTransactions && balanceTransactions.length > 0,
);

export const selectIsFetchingTransactions = createSelector(
    [selectTransactions],
    transactions => transactions.isFetchingTransactions,
);

export const selectTransactionsByType = type => createSelector(
    [selectTransactionsArray],
    transactionsArray => transactionsArray.filter(transaction => transaction.type === type),
);

export const selectTransactionsDrawerOpen = createSelector(
    [selectTransactions],
    transactions => transactions.transactionsDrawerOpen,
)