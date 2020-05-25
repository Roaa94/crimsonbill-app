import {convertCollectionToArray, firestore} from "../../utils/firebase/firebase.utils";
import {BalancesActionTypes} from "./balances.action-types";

export const fetchBalancesStart = () => ({
    type: BalancesActionTypes.FETCH_BALANCES_START,
});

export const fetchBalancesSuccess = balancesArray => ({
    type: BalancesActionTypes.FETCH_BALANCES_SUCCESS,
    payload: balancesArray,
});

export const fetchBalancesError = errorMessage => ({
    type: BalancesActionTypes.FETCH_BALANCES_SUCCESS,
    payload: errorMessage,
});

export const fetchBalancesStartAsync = userId => {
    return dispatch => {
        dispatch(fetchBalancesStart());
        const balancesCollectionRef = firestore.collection(`users/${userId}/balances`);
        const orderedBalancesCollectionRef = balancesCollectionRef.orderBy('createdAt', 'desc');

        orderedBalancesCollectionRef.onSnapshot(async balancesCollectionSnapshot => {
            console.log('fetching balances...');
            const balancesArray = convertCollectionToArray(balancesCollectionSnapshot);
            dispatch(fetchBalancesSuccess(balancesArray));
        }, error => dispatch(fetchBalancesError(error.message)));
    }
};
