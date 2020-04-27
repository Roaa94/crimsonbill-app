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
        dispatch(fetchAccountsStart());
        const accountsRef = firestore.collection(`users/${userId}/accounts`);

        accountsRef.onSnapshot(async accountsSnapshot => {
            const accountsArray = convertCollectionToArray(accountsSnapshot);
            dispatch(fetchAccountsSuccess(accountsArray));
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

export const fetchBalancesStartAsync = (userId, accountId) => {
    return dispatch => {
        dispatch(fetchBalancesStart());
        const collectionPath = `users/${userId}/accounts/${accountId}/balances`;
        const balancesRef = firestore.collection(collectionPath);

        balancesRef.onSnapshot(async balancesSnapshot => {
            const balancesArray = convertCollectionToArray(balancesSnapshot);
            dispatch(fetchBalancesSuccess(accountId, balancesArray));
        }, error => dispatch(fetchBalancesError(error.message)));
    }
};