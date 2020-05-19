import {firestore} from "./firebase.utils";
import {getConversionRateFromIds} from "./currencies.firebase-utils";
import {deleteAccountBalances} from "./balances.firebase-utils";
import {updateUserTotalBalance} from "./user.firebase-utils";

export const addAccountDocument = async (userId, accountData) => {
    const userDocRef = firestore.doc(`users/${userId}`);
    const accountDocRef = userDocRef.collection('accounts').doc();
    const accountDocSnapshot = await accountDocRef.get();
    if (!accountDocSnapshot.exists) {
        const newAccount = {
            createdAt: new Date(),
            totalBalance: 0,
            ...accountData,
        };
        try {
            await accountDocRef.set(newAccount);
        } catch (error) {
            console.log('Error adding account', error.message);
        }
    }
}

export const updateAccountDocument = async (userId, accountId, updatedAccountData) => {
    const userDocRef = firestore.doc(`users/${userId}`);
    const accountDocRef = userDocRef.collection('accounts').doc(accountId);
    const accountDocSnapshot = await accountDocRef.get();
    const accountData = accountDocSnapshot.data();
    if (accountDocSnapshot.exists) {
        await accountDocRef.update(updatedAccountData);
        if(accountData.currencyCode !== updatedAccountData.currencyCode) {
            await updateAccountTotal(userDocRef, accountId);
        }
    } else {
        console.log('Account does not exist');
    }
}

export const deleteAccountDocument = async (userId, accountId) => {
    const userDocRef = firestore.doc(`users/${userId}`);
    const accountDocRef = userDocRef.collection('accounts').doc(accountId);
    try {
        await deleteAccountBalances(userDocRef, accountId);
        try {
            await accountDocRef.delete();
            console.log('Document Deleted Successfully');
        } catch (error) {
            console.log(error.message);
        }
    } catch (e) {
        console.log('Error batch deleting account balances');
    }

};

export const calcAccountBalancesTotal = async (userDocRef, accountId, accountCurrencyCode) => {
    const balancesCollectionRef = userDocRef.collection('balances');
    const balancesCollectionSnapshot = await balancesCollectionRef.get();
    let balancesTotal = 0;

    for await (const balanceDoc of balancesCollectionSnapshot.docs) {
        const balanceData = balanceDoc.data();
        if (balanceData.accountId === accountId) {
            if (balanceData.currencyCode === accountCurrencyCode) {
                balancesTotal += +balanceData.totalBalance;
            } else {
                const conversionRate = await getConversionRateFromIds(balanceData.currencyCode, accountCurrencyCode);
                balancesTotal += +balanceData.totalBalance * conversionRate;
            }
        }
    }
    return balancesTotal;
}

export const updateAccountTotal = async (userDocRef, accountId) => {
    const accountDocRef = userDocRef.collection('accounts').doc(accountId);
    const accountDocSnapshot = await accountDocRef.get();
    if (accountDocSnapshot.exists) {
        const accountData = accountDocSnapshot.data();
        const balancesTotal = await calcAccountBalancesTotal(userDocRef, accountId, accountData.currencyCode);
        if (accountData.totalBalance !== balancesTotal) {
            try {
                await accountDocRef.update({totalBalance: balancesTotal});
                console.log('Updated account total account');
                await updateUserTotalBalance(userDocRef);
            } catch (e) {
                console.log('Could not update account total');
            }
        }
    } else {
        console.log('Account does not exist');
    }
}