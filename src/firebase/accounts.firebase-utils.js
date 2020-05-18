import {firestore} from "./firebase.utils";
import {getConversionRateFromIds} from "./currencies.firebase-utils";
import {deleteAccountBalances} from "./balances.firebase-utils";

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
    if (accountDocSnapshot.exists) {
        await accountDocRef.update(updatedAccountData);
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

export const updateAccountTotalBalance = async (userDocRef, accountId) => {
    const accountDocRef = userDocRef.collection('accounts').doc(accountId);
    const accountDocSnapshot = await accountDocRef.get();
    if (accountDocSnapshot.exists) {
        const accountData = accountDocSnapshot.data();

        //Calculate balances total balance
        const balancesCollectionRef = accountDocRef.collection('balances');
        const balancesCollectionSnapshot = await balancesCollectionRef.get();
        let balancesTotal = 0;

        for await (let balanceDoc of balancesCollectionSnapshot.docs) {
            const balanceData = balanceDoc.data();
            //Calculate balance totals of balances of this account only
            if (balanceData.accountId === accountId) {
                if (balanceData.currencyCode === accountData.currencyCode) {
                    balancesTotal += +balanceData.totalBalance;
                } else {
                    const conversionRate = await getConversionRateFromIds(
                        balanceData.currencyCode,
                        accountData.currencyCode
                    );
                    balancesTotal += +balanceData.totalBalance * conversionRate;
                }
            }
        }

        //Update account total balance
        try {
            await accountDocRef.update({totalBalance: balancesTotal});
            console.log('Account total balance updated');
        } catch (e) {
            console.log('Error updating account total balance', e.message);
        }
    } else {
        console.log('Account does not exist');
    }
}