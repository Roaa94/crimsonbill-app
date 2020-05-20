import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from "axios";

admin.initializeApp();
const db = admin.firestore();

export const updateAppCurrenciesRates = functions.pubsub.schedule('every 60 minutes')
    .onRun(async (context) => {
        const batch = db.batch();
        const currenciesCollectionRef = db.collection('currencies');
        try {
            const currenciesCollectionSnapshot = await currenciesCollectionRef.get();
            const appCurrencies: string[] = [];
            currenciesCollectionSnapshot.docs.forEach(doc => {
                const {code} = doc.data();
                appCurrencies.push(code);
            });
            try {
                for (const currencyCode of appCurrencies) {
                    const fromCurrencyCode = currencyCode;
                    const toCurrencyCodes = appCurrencies.filter(code => code !== currencyCode);
                    const rates = await fetchCurrenciesRates(fromCurrencyCode, toCurrencyCodes);
                    const currencyDocRef = db.doc(`currencies/${currencyCode}`);
                    toCurrencyCodes.forEach(code => {
                        const updatedRates = {[`to${code}`]: rates[code]};
                        batch.update(currencyDocRef, updatedRates);
                    });
                }
                console.log('Committing batch ...');
                return batch.commit();
            } catch (e) {
                console.log('Could not fetch currencies', e.message);
            }
        } catch (e) {
            console.log('Could not run function', e.message);
        }
        return null;
    })

const currencyAPIHost: string = 'https://api.frankfurter.app';

const fetchCurrenciesRates = async (fromCurrencyCode: string, toCurrenciesCodes: string[]) => {
    const targetCurrencies = toCurrenciesCodes.join(',');
    const url = `${currencyAPIHost}/latest?from=${fromCurrencyCode}&to=${targetCurrencies}`;
    try {
        const response = await axios.get(url);
        const {rates} = response.data;
        console.log(`fetched rates for ${fromCurrencyCode}: ${rates}`);
        return rates;
    } catch (e) {
        console.log('Could not fetch rates');
        throw e;
    }
};