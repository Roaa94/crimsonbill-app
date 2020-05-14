import {firestore} from "./firebase.utils";
import {appCurrencies} from "../app-data/currency";

export const initAppCurrencies = async userId => {
    const currenciesCollectionPath = `users/${userId}/settings/CURRENCY/currencies`;
    const batch = firestore.batch();
    appCurrencies.forEach(currency => {
        const currencyData = {
            createdAt: new Date(),
            ...currency
        };
        const currencyDocRef = firestore.collection(currenciesCollectionPath).doc();
        batch.set(currencyDocRef, currencyData);
    });
    try {
        await batch.commit();
    } catch (e) {
        console.log('batch commit error');
        console.log(e.message);
    }
}