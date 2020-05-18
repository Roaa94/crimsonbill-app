import {convertCollectionToArray, firestore} from "../../firebase/firebase.utils";
import {AccountsActionTypes} from "./accounts.action-types";
import {calcTransactionsTotal} from "../../firebase/transactions.firebase-utils";
import {getConversionRateFromIds} from "../../firebase/currencies.firebase-utils";

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

export const fetchBalancesStart = () => ({
    type: AccountsActionTypes.FETCH_BALANCES_START,
});

export const fetchBalancesSuccess = (accountId, balancesArray) => ({
    type: AccountsActionTypes.FETCH_BALANCES_SUCCESS,
    payload: {accountId, balancesArray},
});

export const fetchBalancesError = errorMessage => ({
    type: AccountsActionTypes.FETCH_BALANCES_SUCCESS,
    payload: errorMessage,
});

export const fetchAccountsStartAsync = (userId) => {
    return async dispatch => {
        console.log('fetching accounts...');
        dispatch(fetchAccountsStart());
        const userDocRef = firestore.doc(`users/${userId}`);
        const accountsRef = userDocRef.collection('accounts');
        const orderedAccountsRef = accountsRef.orderBy('createdAt', 'desc');

        const userSnapshot = await userDocRef.get();
        const userData = userSnapshot.data();

        orderedAccountsRef.onSnapshot(async accountsCollectionSnapshot => {
            const accountsArray = convertCollectionToArray(accountsCollectionSnapshot);
            dispatch(fetchAccountsSuccess(accountsArray));
            let accountsTotal = 0;
            for await (let accountDoc of accountsCollectionSnapshot.docs) {
                const accountData = accountDoc.data();
                if (accountData.currencyCode === userData.defaultCurrencyCode) {
                    accountsTotal += +accountData.totalBalance;
                } else {
                    const conversionRate = await getConversionRateFromIds(accountData.currencyCode, userData.defaultCurrencyCode);
                    accountsTotal += +accountData.totalBalance * conversionRate;
                }
                fetchBalancesStartAsync(accountDoc.id, accountDoc.ref, accountData.currencyCode)(dispatch);
            }
            await userDocRef.update({totalBalance: accountsTotal});
        }, error => dispatch(fetchAccountsError(error.message)));
    }
};

export const fetchBalancesStartAsync = (accountId, accountDocRef, accountCurrencyCode) => {
    return dispatch => {
        dispatch(fetchBalancesStart());
        const balancesCollectionRef = accountDocRef.collection('balances');
        const orderedBalancesCollectionRef = balancesCollectionRef.orderBy('createdAt', 'desc');

        orderedBalancesCollectionRef.onSnapshot(async balancesCollectionSnapshot => {
            const balancesArray = convertCollectionToArray(balancesCollectionSnapshot);
            dispatch(fetchBalancesSuccess(accountId, balancesArray));
            let balancesTotal = 0;
            for await (let balanceDoc of balancesCollectionSnapshot.docs) {
                const balanceData = balanceDoc.data();
                if (balanceData.currencyCode === accountCurrencyCode) {
                    balancesTotal += +balanceData.totalBalance;
                } else {
                    const conversionRate = await getConversionRateFromIds(balanceData.currencyCode, accountCurrencyCode);
                    balancesTotal += +balanceData.totalBalance * conversionRate;
                }
                fetchTransactionsStartAsync(accountId, balanceDoc.id, balanceDoc.ref)(dispatch);
            }
            const accountDocSnapshot = await accountDocRef.get();
            if (accountDocSnapshot.exists) {
                await accountDocRef.update({totalBalance: balancesTotal});
            }
        }, error => dispatch(fetchBalancesError(error.message)));
    }
};

export const fetchTransactionsStartAsync = (accountId, balanceId, balanceDocRef) => {
    return dispatch => {
        dispatch(fetchTransactionsStart());
        const transactionsCollectionRef = balanceDocRef.collection('transactions');
        const orderedTransactionsRef = transactionsCollectionRef.orderBy('dateTime', 'desc');

        orderedTransactionsRef.onSnapshot(async transactionsCollectionSnapshot => {
            const transactionsArray = convertCollectionToArray(transactionsCollectionSnapshot);
            const transactionsTotal = calcTransactionsTotal(transactionsCollectionSnapshot);
            const balanceDocSnapshot = await balanceDocRef.get();
            if (balanceDocSnapshot.exists) {
                await balanceDocRef.update({totalBalance: transactionsTotal});
            }
            dispatch(fetchTransactionsSuccess(accountId, balanceId, transactionsArray));
        }, error => dispatch(fetchTransactionsError(error.message)));
    }
};

export const fetchTransactionsStart = () => ({
    type: AccountsActionTypes.FETCH_TRANSACTIONS_START,
});

export const fetchTransactionsSuccess = (accountId, balanceId, transactionsArray) => ({
    type: AccountsActionTypes.FETCH_TRANSACTIONS_SUCCESS,
    payload: {accountId, balanceId, transactionsArray},
});

export const fetchTransactionsError = errorMessage => ({
    type: AccountsActionTypes.FETCH_TRANSACTIONS_SUCCESS,
    payload: errorMessage,
});

/*
export const fetchAccountsStartAsync = userId => {
    return async dispatch => {
        console.log('fetching accounts...');
        dispatch(fetchAccountsStart());

        const userDocRef = firestore.doc(`users/${userId}`);
        const userSnapshot = await userDocRef.get();
        if (userSnapshot.exists) {
            const userData = userSnapshot.data();

            //Get and order accounts collection ref
            const accountsCollectionRef = userDocRef.collection('accounts');
            const orderedAccountsRef = accountsCollectionRef.orderBy('createdAt', 'desc');

            //Snapshot listener 1 - Accounts
            orderedAccountsRef.onSnapshot(async accountsCollectionSnapshot => {
                try {
                    const [accountsArray, accountsTotal] = await getAccountsArrayAndTotal(accountsCollectionSnapshot, userData.defaultCurrencyCode);
                    try {

                        await userDocRef.update({totalBalance: accountsTotal});
                        dispatch(fetchAccountsSuccess(accountsArray));
                    } catch (e) {
                        dispatch(fetchAccountsError(`Error updating user balance ${e.message}`));
                    }
                } catch (e) {
                    dispatch(fetchAccountsError(`Error fetching accounts array ${e.message}`));
                }

            }, error => dispatch(fetchAccountsError(error.message)))
        } else {
            dispatch(fetchAccountsError('User does not exist'));
        }
    }
};

const getAccountsArrayAndTotal = async (accountsCollectionSnapshot, userDefaultCurrency) => {
    let accountsArray = [];
    let accountsTotal = 0; //to add to user doc
    // Loop 1 - Accounts
    for await (const accountDoc of accountsCollectionSnapshot.docs) {
        const accountData = accountDoc.data();

        //Get and order balances collection ref
        const balancesCollectionRef = accountDoc.ref.collection('balances');
        const orderedBalancesCollectionRef = balancesCollectionRef.orderBy('createdAt', 'desc');

        //Snapshot listener 2 - Balances
        orderedBalancesCollectionRef.onSnapshot(async balancesCollectionSnapshot => {
            console.log('A change happened in balances of account: ', accountData.name);
            const [balancesArray, balancesTotal] = await getBalancesArrayAndTotal(balancesCollectionSnapshot, accountData.currencyCode);

            //Add total balance and balances array to account in state
            accountsArray.push({
                id: accountDoc.id,
                ...accountData,
                totalBalance: balancesTotal,
                balances: balancesArray,
            });
            //Add total balance to account in database
            const accountDocSnapshot = await accountDoc.ref.get();
            if (accountDocSnapshot.exists) {
                await accountDoc.ref.update({totalBalance: balancesTotal});
            }
        });
        // Calculate accounts total balances
        if (accountData.currencyCode === userDefaultCurrency) {
            accountsTotal += +accountData.totalBalance;
        } else {
            const conversionRate = await getConversionRateFromIds(accountData.currencyCode, userDefaultCurrency);
            accountsTotal += +accountData.totalBalance * conversionRate;
        }
    } // End of loop 1 - Accounts
    return [accountsArray, accountsTotal];
}

export const getBalancesArrayAndTotal = async (balancesCollectionSnapshot, accountCurrencyCode) => {
    let balancesArray = [];
    let balancesTotal = 0;
    // Loop 2 - Balances
    for await (const balanceDoc of balancesCollectionSnapshot.docs) {
        const balanceData = balanceDoc.data();

        // Get and order transactions collection ref
        const transactionsCollectionRef = balanceDoc.ref.collection('transactions');
        const orderedTransactionsRef = transactionsCollectionRef.orderBy('dateTime', 'desc');

        //Snapshot listener 3 - Transactions
        orderedTransactionsRef.onSnapshot(async transactionsCollectionSnapshot => {
            console.log('A change happened in transactions of balance: ', balanceData.name);
            const [transactionsArray, transactionsTotal] = getTransactionsArrayAndTotal(transactionsCollectionSnapshot)

            //Add transactions total and transactions array to balance in state
            balancesArray.push({
                id: balanceDoc.id,
                ...balanceData,
                totalBalance: transactionsTotal,
                transactions: transactionsArray,
            });

            //Add transactions total to balance in database
            const balanceDocSnapshot = await balanceDoc.ref.get();
            if (balanceDocSnapshot.exists) {
                await balanceDoc.ref.update({totalBalance: transactionsTotal});
            }
        });

        if (balanceData.currencyCode === accountCurrencyCode) {
            balancesTotal += +balanceData.totalBalance;
        } else {
            const conversionRate = await getConversionRateFromIds(balanceData.currencyCode, accountCurrencyCode);
            balancesTotal += +balanceData.totalBalance * conversionRate;
        }
    } // End of loop 2 - balances
    return [balancesArray, balancesTotal];
}

export const getTransactionsArrayAndTotal = transactionsCollectionSnapshot => {
    let transactionsArray = [];
    let transactionsTotal = 0;

    transactionsCollectionSnapshot.docs.forEach(transactionDoc => {
            const transactionData = transactionDoc.data();
            transactionsTotal = transactionData.type === 'spending'
                ? transactionsTotal - +transactionData.amount
                : transactionsTotal + +transactionData.amount;

            transactionsArray.push({
                id: transactionDoc.id,
                ...transactionData,
            });
        }
    )
    return [transactionsArray, transactionsTotal];
}
*/
