import {convertCollectionToArray, firestore} from "../../firebase/firebase.utils";
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
        console.log('fetching balances...');
        dispatch(fetchBalancesStart());
        const userDocRef = firestore.doc(`users/${userId}`);
        const balancesCollectionRef = userDocRef.collection('balances');
        const orderedBalancesCollectionRef = balancesCollectionRef.orderBy('createdAt', 'desc');

        orderedBalancesCollectionRef.onSnapshot(async balancesCollectionSnapshot => {
            const balancesArray = convertCollectionToArray(balancesCollectionSnapshot);
            dispatch(fetchBalancesSuccess(balancesArray));
        }, error => dispatch(fetchBalancesError(error.message)));
    }
};

// Balances Total Calculation code
// let balancesTotal = 0;
// for await (let balanceDoc of balancesCollectionSnapshot.docs) {
//     const balanceData = balanceDoc.data();
//     if (balanceData.currencyCode === accountCurrencyCode) {
//         balancesTotal += +balanceData.totalBalance;
//     } else {
//         const conversionRate = await getConversionRateFromIds(balanceData.currencyCode, accountCurrencyCode);
//         balancesTotal += +balanceData.totalBalance * conversionRate;
//     }
// }
// const accountDocSnapshot = await accountDocRef.get();
// if (accountDocSnapshot.exists) {
//     await accountDocRef.update({totalBalance: balancesTotal});
// }
