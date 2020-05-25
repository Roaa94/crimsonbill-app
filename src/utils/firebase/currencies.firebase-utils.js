import {firestore} from "./firebase.utils";
import {appCurrencies, currencyAPIHost} from "../../app-data/currency";
import axios from 'axios';

export const updateAppCurrenciesRates = async () => {
    const batch = firestore.batch();
    for await (let {name, code} of appCurrencies) {
        const fromCurrencyCode = code;
        const toCurrencies = appCurrencies.filter(currency => currency.code !== code);
        const toCurrencyCodes = toCurrencies.map(currency => currency.code);
        const rates = await fetchCurrenciesRates(fromCurrencyCode, toCurrencyCodes);
        const currencyData = {
            name,
            code,
        };
        toCurrencyCodes.forEach(code => {
            currencyData[`to${code}`] = rates[code];
        });
        const currencyDocRef = firestore.doc(`currencies/${code}`);
        batch.set(currencyDocRef, currencyData);
    }

    try {
        await batch.commit();
    } catch (e) {
        console.log('batch commit error');
        console.log(e.message);
    }
};

export const fetchCurrenciesRates = async (fromCurrencyCode, toCurrenciesCodes) => {
    const targetCurrencies = toCurrenciesCodes.join(',');
    const url = `${currencyAPIHost}/latest?from=${fromCurrencyCode}&to=${targetCurrencies}`;
    const response = await axios.get(url);
    const {rates} = response.data;
    return rates;
};

export const getConversionRateFromIds = async (fromCurrencyId, toCurrencyId) => {
    const fromCurrencyDocRef = firestore.doc(`currencies/${fromCurrencyId}`);
    const toCurrencyDocRef = firestore.doc(`currencies/${toCurrencyId}`);
    const fromCurrencyDocSnapshot = await fromCurrencyDocRef.get();
    const toCurrencyDocSnapshot = await toCurrencyDocRef.get();
    if (fromCurrencyDocSnapshot.exists && toCurrencyDocSnapshot.exists) {
        const fromCurrency = fromCurrencyDocSnapshot.data();
        const toCurrencyCode = toCurrencyDocSnapshot.data().code;
        return fromCurrency[`to${toCurrencyCode}`];
    } else {
        return 1;
    }
}