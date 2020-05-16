import {convertCollectionToArray, firestore} from "../../firebase/firebase.utils";
import {AccountsActionTypes} from "./accounts.action-types";
import {calcTransactionsTotal} from "../../firebase/transactions.firebase-utils";
import {calcBalancesTotal} from "../../firebase/balances.firebase-utils";

export const toggleAccountForm = value => ({
    type: AccountsActionTypes.TOGGLE_ACCOUNT_FORM,
    payload: value,
});

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

        orderedAccountsRef.onSnapshot(async accountsCollectionSnapshot => {
            const accountsArray = convertCollectionToArray(accountsCollectionSnapshot);
            dispatch(fetchAccountsSuccess(accountsArray));
            accountsCollectionSnapshot.docs.forEach(accountDoc => {
                fetchBalancesStartAsync(accountDoc.id, accountDoc.ref)(dispatch);
            })
        }, error => dispatch(fetchAccountsError(error.message)));
    }
};

export const fetchBalancesStartAsync = (accountId, accountDocRef) => {
    return dispatch => {
        dispatch(fetchBalancesStart());
        const balancesCollectionRef = accountDocRef.collection('balances');
        const orderedBalancesCollectionRef = balancesCollectionRef.orderBy('createdAt', 'desc');

        orderedBalancesCollectionRef.onSnapshot(async balancesCollectionSnapshot => {
            const balancesArray = convertCollectionToArray(balancesCollectionSnapshot);
            dispatch(fetchBalancesSuccess(accountId, balancesArray));
            let balancesTotal = 0;
            balancesCollectionSnapshot.docs.forEach(balanceDoc => {
                const balanceData = balanceDoc.data();
                balancesTotal += +balanceData.totalBalance;
                fetchTransactionsStartAsync(accountId, balanceDoc.id, balanceDoc.ref)(dispatch);
            });
            await accountDocRef.update({totalBalance: balancesTotal});
        }, error => dispatch(fetchBalancesError(error.message)));
    }
};

export const fetchTransactionsStartAsync = (accountId, balanceId, balanceDocRef) => {
    return dispatch => {
        dispatch(fetchTransactionsStart());
        const transactionsCollectionRef = balanceDocRef.collection('transactions');
        const orderedTransactionsRef = transactionsCollectionRef.orderBy('dateTime', 'desc');

        orderedTransactionsRef.onSnapshot(async transactionsCollectionSnapshot => {
            const transactionsArray = convertCollectionToArray(transactionsCollectionSnapshot);
            const transactionsTotal = calcTransactionsTotal(transactionsCollectionSnapshot);
            await balanceDocRef.update({totalBalance: transactionsTotal});
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