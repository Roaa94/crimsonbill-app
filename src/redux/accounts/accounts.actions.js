import {convertCollectionToArray, firestore} from "../../firebase/firebase.utils";
import {AccountsActionTypes} from "./accounts.action-types";

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

export const fetchAccountsStartAsync = userId => {
    return async dispatch => {
        dispatch(fetchAccountsStart());
        const accountsRef = firestore.collection(`users/${userId}/accounts`);
        const orderedAccountsRef = accountsRef.orderBy('createdAt', 'desc');

        orderedAccountsRef.onSnapshot(async accountsCollectionSnapshot => {
            console.log('fetching accounts...');
            const accountsArray = convertCollectionToArray(accountsCollectionSnapshot);
            dispatch(fetchAccountsSuccess(accountsArray));
        }, error => dispatch(fetchAccountsError(error.message)));
    }
};


