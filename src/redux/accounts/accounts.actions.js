import {convertCollectionToArray, firestore} from "../../firebase/firebase.utils";
import {accountsActionTypes} from "./accounts.action-types";

export const fetchAccountsStart = () => ({
    type: accountsActionTypes.FETCH_ACCOUNTS_START,
});

export const fetchAccountsSuccess = accountsArray => ({
    type: accountsActionTypes.FETCH_ACCOUNTS_SUCCESS,
    payload: accountsArray,
});

export const fetchAccountsError = errorMessage => ({
    type: accountsActionTypes.FETCH_ACCOUNTS_SUCCESS,
    payload: errorMessage,
});

export const fetchAccountsStartAsync = (userId) => {
    return dispatch => {
        console.log('fetching accounts...');
        dispatch(fetchAccountsStart());
        const accountsCollectionPath = `users/${userId}/accounts`;
        const accountsRef = firestore.collection(accountsCollectionPath);

        accountsRef.onSnapshot(async accountsSnapshot => {
            const accountsArray = convertCollectionToArray(accountsSnapshot);
            dispatch(fetchAccountsSuccess(accountsArray));
            accountsArray.forEach(account => {
                if (account.hasBalances) {
                    console.log(`fetching balances of account ${account.name}...`);
                    dispatch(fetchBalancesStart());
                    const balancesCollectionPath = `${accountsCollectionPath}/${account.id}/balances`;
                    const balancesRef = firestore.collection(balancesCollectionPath);

                    balancesRef.onSnapshot(async balancesSnapshot => {
                        const balancesArray = convertCollectionToArray(balancesSnapshot);
                        dispatch(fetchBalancesSuccess(account.id, balancesArray));
                        balancesArray.forEach(balance => {
                            console.log(`fetching balance transactions of account ${account.name} balance ${balance.name}...`);
                            dispatch(fetchTransactionsStart());
                            const transactionsCollectionPath = `${balancesCollectionPath}/${balance.id}/transactions`;
                            const transactionsRef = firestore.collection(transactionsCollectionPath);

                            transactionsRef.onSnapshot(async transactionsSnapshot => {
                                const transactionsArray = convertCollectionToArray(transactionsSnapshot);
                                dispatch(fetchTransactionsSuccess(account.id, balance.id, transactionsArray));
                            }, error => dispatch(fetchTransactionsError(error.message)));
                        });
                    }, error => dispatch(fetchBalancesError(error.message)));
                } else {
                    console.log(`fetching transactions of account ${account.name}...`);
                    dispatch(fetchTransactionsStart());
                    const transactionsCollectionPath = `${accountsCollectionPath}/${account.id}/transactions`;
                    const transactionsRef = firestore.collection(transactionsCollectionPath);

                    transactionsRef.onSnapshot(async transactionsSnapshot => {
                        const transactionsArray = convertCollectionToArray(transactionsSnapshot);
                        dispatch(fetchTransactionsSuccess(account.id, null, transactionsArray));
                    }, error => dispatch(fetchTransactionsError(error.message)));
                }
            })
        }, error => dispatch(fetchAccountsError(error.message)));
    }
};

export const fetchBalancesStart = () => ({
    type: accountsActionTypes.FETCH_BALANCES_START,
});

export const fetchBalancesSuccess = (accountId, balancesArray) => ({
    type: accountsActionTypes.FETCH_BALANCES_SUCCESS,
    payload: {accountId, balancesArray},
});

export const fetchBalancesError = errorMessage => ({
    type: accountsActionTypes.FETCH_BALANCES_SUCCESS,
    payload: errorMessage,
});

export const fetchTransactionsStart = () => ({
    type: accountsActionTypes.FETCH_TRANSACTIONS_START,
});

export const fetchTransactionsSuccess = (accountId, balanceId, transactionsArray) => ({
    type: accountsActionTypes.FETCH_TRANSACTIONS_SUCCESS,
    payload: {accountId, balanceId, transactionsArray},
});

export const fetchTransactionsError = errorMessage => ({
    type: accountsActionTypes.FETCH_TRANSACTIONS_SUCCESS,
    payload: errorMessage,
});