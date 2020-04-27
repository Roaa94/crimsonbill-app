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