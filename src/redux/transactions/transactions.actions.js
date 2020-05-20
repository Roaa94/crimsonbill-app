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

export const fetchTransactionsStartAsync = (userId, _startDate) => {
    return async dispatch => {
        console.log('fetching transactions...');
        dispatch(fetchTransactionsStart());
        const defaultStartDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const startDate = _startDate ? _startDate : defaultStartDate;
        const transactionsCollectionRef = firestore.collection(`users/${userId}/transactions`);
        const transactionsQuery = transactionsCollectionRef.where('dateTime', '>=', startDate).orderBy('dateTime', 'desc');

        transactionsQuery.onSnapshot(async transactionsCollectionSnapshot => {
            console.log('Transactions snapshot updated');
            const transactionsArray = convertCollectionToArray(transactionsCollectionSnapshot);
            dispatch(fetchTransactionsSuccess(transactionsArray));
        }, error => dispatch(fetchTransactionsError(error.message)));
    }
};
