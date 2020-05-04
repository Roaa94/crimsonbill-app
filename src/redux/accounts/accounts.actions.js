import {convertCollectionToArray, firestore, getAccountDocPath, getBalanceDocPath} from "../../firebase/firebase.utils";
import {AccountsActionTypes} from "./accounts.action-types";

export const fetchAccountsStart = () => ({
    type: AccountsActionTypes.FETCH_ACCOUNTS_START,
});

export const fetchAccountsSuccess = accountsArray => ({
    type: AccountsActionTypes.FETCH_ACCOUNTS_SUCCESS,
    payload: accountsArray,
});

export const fetchAccountsError = errorMessage => ({
    type: AccountsActionTypes.FETCH_ACCOUNTS_SUCCESS,
    payload: errorMessage,
});

export const fetchBalancesStart = () => ({
    type: AccountsActionTypes.FETCH_BALANCES_START,
});

export const fetchBalancesSuccess = (accountId, balancesArray) => ({
    type: AccountsActionTypes.FETCH_BALANCES_SUCCESS,
    payload: {accountId, balancesArray},
});

export const fetchBalancesError = errorMessage => ({
    type: AccountsActionTypes.FETCH_BALANCES_SUCCESS,
    payload: errorMessage,
});

export const fetchAccountsStartAsync = (userId) => {
    return dispatch => {
        console.log('fetching accounts...');
        dispatch(fetchAccountsStart());
        const accountsCollectionPath = `users/${userId}/accounts`;
        const accountsRef = firestore.collection(accountsCollectionPath);
        const orderedAccountsRef = accountsRef.orderBy('createdAt', 'desc');

        orderedAccountsRef.onSnapshot(async accountsSnapshot => {
            const accountsArray = convertCollectionToArray(accountsSnapshot);
            dispatch(fetchAccountsSuccess(accountsArray));
            accountsArray.forEach(account => {
                // console.log(`fetching balances of account ${account.name}...`);
                fetchBalancesStartAsync(userId, account.id)(dispatch);
            })
        }, error => dispatch(fetchAccountsError(error.message)));
    }
};

export const fetchBalancesStartAsync = (userId, accountId) => {
    return dispatch => {
        dispatch(fetchBalancesStart());
        const collectionPath = `${getAccountDocPath(userId, accountId)}/balances`;
        const balancesRef = firestore.collection(collectionPath);

        balancesRef.onSnapshot(async balancesSnapshot => {
            const balancesArray = convertCollectionToArray(balancesSnapshot);
            dispatch(fetchBalancesSuccess(accountId, balancesArray));
            balancesArray.forEach(balance => {
                // console.log(`fetching balance transactions of account ${accountId} balance ${balance.name}...`);
                fetchTransactionsStartAsync(userId, accountId, balance.id)(dispatch);
            });
        }, error => dispatch(fetchBalancesError(error.message)));
    }
};

export const fetchTransactionsStartAsync = (userId, accountId, balanceId) => {
    return dispatch => {
        dispatch(fetchTransactionsStart());
        const balanceDocPath = getBalanceDocPath(userId, accountId, balanceId);
        const collectionPath = `${balanceDocPath}/transactions`;
        const transactionsRef = firestore.collection(collectionPath);
        const orderedTransactionsRef = transactionsRef.orderBy('dateTime', 'desc');

        orderedTransactionsRef.onSnapshot(async transactionsSnapshot => {
            const transactionsArray = convertCollectionToArray(transactionsSnapshot);
            dispatch(fetchTransactionsSuccess(accountId, balanceId, transactionsArray));
        }, error => dispatch(fetchTransactionsError(error.message)));
    }
};

export const fetchTransactionsStart = () => ({
    type: AccountsActionTypes.FETCH_TRANSACTIONS_START,
});

export const fetchTransactionsSuccess = (accountId, balanceId, transactionsArray) => ({
    type: AccountsActionTypes.FETCH_TRANSACTIONS_SUCCESS,
    payload: {accountId, balanceId, transactionsArray},
});

export const fetchTransactionsError = errorMessage => ({
    type: AccountsActionTypes.FETCH_TRANSACTIONS_SUCCESS,
    payload: errorMessage,
});