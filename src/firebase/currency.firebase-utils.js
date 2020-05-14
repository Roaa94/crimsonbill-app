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
};

export const setDefaultCurrency = async (userId, currencyId) => {
    const batch = firestore.batch();
    const currenciesCollectionPath = `users/${userId}/settings/CURRENCY/currencies`;
    const currenciesCollectionRef = firestore.collection(currenciesCollectionPath);
    const currenciesCollectionSnapshot = await currenciesCollectionRef.get();
    currenciesCollectionSnapshot.docs.forEach(currencyDoc => {
        const currencyDocId = currencyDoc.id;
        if(currencyDocId === currencyId) {
            batch.update(currencyDoc.ref, {isDefault: true})
        } else {
            batch.update(currencyDoc.ref, {isDefault: false})
        }
    });
    try {
        await batch.commit();
    } catch (e) {
        console.log('batch commit error');
        console.log(e.message);
    }
}