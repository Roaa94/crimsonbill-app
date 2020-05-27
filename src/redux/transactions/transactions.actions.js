import {convertCollectionToArray, firestore} from "../../utils/firebase/firebase.utils";
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

export const fetchTransactionsStartAsync = (userId, {startDate, endDate}) => {
    return async dispatch => {
        dispatch(fetchTransactionsStart());
        const queryStartDate = new Date(startDate);
        const queryEndDate = new Date(endDate);
        const transactionsCollectionRef = firestore.collection(`users/${userId}/transactions`);
        const transactionsQuery = transactionsCollectionRef
            .where('dateTime', '>=', queryStartDate)
            .where('dateTime', '<=', queryEndDate)
            .orderBy('dateTime', 'desc');

        transactionsQuery.onSnapshot(async transactionsCollectionSnapshot => {
            console.log('fetching transactions...');
            const transactionsArray = convertCollectionToArray(transactionsCollectionSnapshot);
            dispatch(fetchTransactionsSuccess(transactionsArray));
        }, error => dispatch(fetchTransactionsError(error.message)));
    }
};

export const toggleTransactionsDrawer = value => ({
    type: TransactionsActionTypes.TOGGLE_TRANSACTIONS_DRAWER,
    payload: value,
})