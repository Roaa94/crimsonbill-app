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

export const fetchTransactionsStartAsync = (userId, {startDate}) => {
    return async dispatch => {
        dispatch(fetchTransactionsStart());
        const queryStartDate = new Date(startDate);
        const transactionsCollectionRef = firestore.collection(`users/${userId}/transactions`);
        const transactionsQuery = transactionsCollectionRef
            .where('dateTime', '>=', queryStartDate)
            .orderBy('dateTime', 'desc');

        transactionsQuery.onSnapshot(async transactionsCollectionSnapshot => {
            console.log('fetching transactions...');
            const transactionsArray = convertCollectionToArray(transactionsCollectionSnapshot);
            dispatch(fetchTransactionsSuccess(transactionsArray));
        }, error => dispatch(fetchTransactionsError(error.message)));
    }
};
