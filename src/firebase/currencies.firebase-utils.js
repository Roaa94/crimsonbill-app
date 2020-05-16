import {firestore} from "./firebase.utils";
import {appCurrencies, currencyAPIHost} from "../app-data/currency";
import axios from 'axios';

//Todo: Make currencies collection global and not specific to user
export const initAppCurrencies = async userId => {
    const currenciesCollectionPath = `users/${userId}/settings/CURRENCY/currencies`;
    const batch = firestore.batch();
    const {defaultCurrencyCode, otherCurrenciesCodes} = getCurrenciesCodes(appCurrencies);
    const rates = await fetchCurrenciesRates(defaultCurrencyCode, otherCurrenciesCodes);

    appCurrencies.forEach(currency => {
        const currencyData = {
            createdAt: new Date(),
            rate: currency.isDefault ? 1 : rates[currency.code],
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

export const updateAppCurrenciesRates = async (userId, defaultCurrencyCode, otherCurrenciesCodes) => {
    const batch = firestore.batch();
    const rates = await fetchCurrenciesRates(defaultCurrencyCode, otherCurrenciesCodes);
    const currenciesCollectionSnapshot = await getCurrenciesCollectionSnapshot(userId);

    currenciesCollectionSnapshot.docs.forEach(currencyDoc => {
        const currencyData = currencyDoc.data();
        if (currencyData.isDefault) {
            batch.update(currencyDoc.ref, {rate: 1})
        } else {
            batch.update(currencyDoc.ref, {rate: rates[currencyData.code]});
        }
    });

    try {
        await batch.commit();
    } catch (e) {
        console.log('batch commit error');
        console.log(e.message);
    }
};

export const setDefaultCurrency = async (userId, currencyId, selectedCurrencyCode, otherCurrenciesCodes) => {
    const batch = firestore.batch();
    const currenciesCollectionSnapshot = await getCurrenciesCollectionSnapshot(userId);
    const rates = await fetchCurrenciesRates(selectedCurrencyCode, otherCurrenciesCodes);

    currenciesCollectionSnapshot.docs.forEach(currencyDoc => {
        const currencyDocId = currencyDoc.id;
        const currencyData = currencyDoc.data();
        if (currencyDocId === currencyId) {
            batch.update(currencyDoc.ref, {isDefault: true, rate: 1})
        } else {
            batch.update(currencyDoc.ref, {isDefault: false, rate: rates[currencyData.code]});
        }
    });

    try {
        await batch.commit();
    } catch (e) {
        console.log('batch commit error');
        console.log(e.message);
    }
}

export const fetchCurrenciesRates = async (currencyCode, otherCurrenciesCodes) => {
    const targetCurrencies = otherCurrenciesCodes.join(',');
    const url = `${currencyAPIHost}/latest?from=${currencyCode}&to=${targetCurrencies}`;
    const response = await axios.get(url);
    const {rates} = response.data;
    console.log('rates');
    console.log(rates);
    return rates;
};

export const getConversionRateFromIds = async (userId, fromCurrencyId, toCurrencyId) => {
    const currenciesCollectionPath = `users/${userId}/settings/CURRENCY/currencies`;
    const fromCurrencyDocRef = firestore.doc(`${currenciesCollectionPath}/${fromCurrencyId}`);
    const toCurrencyDocRef = firestore.doc(`${currenciesCollectionPath}/${toCurrencyId}`);
    const fromCurrencyDocSnapshot = await fromCurrencyDocRef.get();
    const toCurrencyDocSnapshot = await toCurrencyDocRef.get();
    if(fromCurrencyDocSnapshot.exists && toCurrencyDocSnapshot.exists) {
        const fromCurrencyCode = fromCurrencyDocSnapshot.data().code;
        const toCurrencyCode = toCurrencyDocSnapshot.data().code;
        return getConversionRate(fromCurrencyCode, toCurrencyCode);
    } else {
        return 1;
    }
}

const getConversionRate = async (fromCurrencyCode, toCurrencyCode) => {
    const url = `${currencyAPIHost}/latest?from=${fromCurrencyCode}&to=${toCurrencyCode}`;
    const response = await axios.get(url);
    const {rates} = response.data;
    console.log(`from: ${fromCurrencyCode} - to: ${toCurrencyCode} rate = ${rates[toCurrencyCode]}`);
    return rates[toCurrencyCode];
};

export const getCurrenciesCollectionSnapshot = async userId => {
    const currenciesCollectionPath = `users/${userId}/settings/CURRENCY/currencies`;
    const currenciesCollectionRef = firestore.collection(currenciesCollectionPath);
    return await currenciesCollectionRef.get();
};

export const getCurrenciesCodes = currencies => {
    const defaultCurrencyCode = currencies.find(currency => currency.isDefault).code;
    const otherCurrencies = currencies.filter(currency => !currency.isDefault);
    const otherCurrenciesCodes = otherCurrencies.map(currency => currency.code);
    return {defaultCurrencyCode, otherCurrenciesCodes}
}