import {convertCollectionToArray, firestore} from "../../firebase/firebase.utils";
import {TransactionsActionTypes} from "./transactions.action-types";

export const fetchTransactionsStart = () => ({
    type: TransactionsActionTypes.FETCH_TRANSACTIONS_START,
});

export const fetchTransactionsSuccess = transactionsArray => ({
    type: TransactionsActionTypes.FETCH_TRANSACTIONS_SUCCESS,
    payload: transactionsArray,
});

export const fetchTransactionsError = errorMessage => ({
    type: TransactionsActionTypes.FETCH_TRANSACTIONS_SUCCESS,
    payload: errorMessage,
});

export const fetchTransactionsStartAsync = userId => {
    return dispatch => {
        console.log('fetching transactions...');
        dispatch(fetchTransactionsStart());
        const transactionsCollectionRef = firestore.collection(`users/${userId}/transactions`);
        const orderedTransactionsRef = transactionsCollectionRef.orderBy('dateTime', 'desc');

        orderedTransactionsRef.onSnapshot(async transactionsCollectionSnapshot => {
            const transactionsArray = convertCollectionToArray(transactionsCollectionSnapshot);
            dispatch(fetchTransactionsSuccess(transactionsArray));
        }, error => dispatch(fetchTransactionsError(error.message)));
    }
};
