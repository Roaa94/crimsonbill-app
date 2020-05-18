import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from "axios";

admin.initializeApp();
const db = admin.firestore();

//Todo: configure the bellow batch writes for collections with +500 documents

export const deleteBalanceSubCollections = functions.firestore
    .document('users/{userId}/accounts/{accountId}/balances/{balanceId}')
    .onDelete((snapshot, context) => {
        if (snapshot.exists) {
            const batch = db.batch();
            const transactionsPath = `users/${context.params.userId}/accounts/${context.params.accountId}/balances/${context.params.balanceId}/transactions`;
            db.collection(transactionsPath).get()
                .then(transactionsSnapshot => {
                    transactionsSnapshot.docs.forEach(doc => {
                        batch.delete(doc.ref);
                    })
                    return batch.commit();
                })
                .catch(error => error.message)
            return null;
        }
        return null;
    })

export const deleteAccountSubCollections = functions.firestore
    .document('users/{userId}/accounts/{accountId}')
    .onDelete((snapshot, context) => {
        if (snapshot.exists) {
            const batch = db.batch();
            const balancesPath = `users/${context.params.userId}/accounts/${context.params.accountId}/balances`;
            db.collection(balancesPath).get()
                .then(balancesSnapshot => {
                    balancesSnapshot.docs.forEach(doc => {
                        batch.delete(doc.ref);
                    })
                    return batch.commit();
                }).catch(error => error.message)
            return null;
        }
        return null;
    })

export const updateAppCurrenciesRates = functions.pubsub.schedule('every 60 minutes')
    .onRun((context) => {
        const batch = db.batch();
        const currenciesCollectionRef = db.collection('currencies');
        currenciesCollectionRef.get()
            .then(currenciesCollectionSnapshot => {
                const appCurrencies : string[] = [];
                currenciesCollectionSnapshot.docs.forEach(doc => {
                    const {code} = doc.data();
                    appCurrencies.push(code);
                });
                return appCurrencies;
            })
            .then(async appCurrencies => {
                for await (const currencyCode of appCurrencies) {
                    const fromCurrencyCode = currencyCode;
                    const toCurrencyCodes = appCurrencies.filter(code => code !== currencyCode);
                    const rates = await fetchCurrenciesRates(fromCurrencyCode, toCurrencyCodes);
                    const currencyDocRef = db.doc(`currencies/${currencyCode}`);
                    toCurrencyCodes.forEach(code => {
                        batch.update(currencyDocRef, {[`to${code}`]: rates[code]});
                    });
                }
                return batch.commit();
            }).catch(error => error.message)
        return null;
    })

const currencyAPIHost : string = 'https://api.frankfurter.app';

const fetchCurrenciesRates = async (fromCurrencyCode : string, toCurrenciesCodes : string[]) => {
    const targetCurrencies = toCurrenciesCodes.join(',');
    const url = `${currencyAPIHost}/latest?from=${fromCurrencyCode}&to=${targetCurrencies}`;
    const response = await axios.get(url);
    const {rates} = response.data;
    console.log('fetched rates', rates);
    return rates;
};