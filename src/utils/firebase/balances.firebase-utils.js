import {firestore} from "./firebase.utils";
import {deleteBalanceTransactions} from "./transactions.firebase-utils";
import {updateAccountTotal} from "./accounts.firebase-utils";

export const addBalanceDocument = async (userId, accountId, balanceData) => {
    const userDocRef = firestore.doc(`users/${userId}`);
    const balanceDocRef = userDocRef.collection('balances').doc();
    const balanceDocSnapshot = await balanceDocRef.get();
    if (!balanceDocSnapshot.exists) {
        const newBalance = {
            createdAt: new Date(),
            totalBalance: 0,
            accountId,
            ...balanceData
        };
        try {
            await balanceDocRef.set(newBalance);
            await updateAccountTotal(userDocRef, accountId);
        } catch (e) {
            console.log('Error adding balance', e.message);
        }
    }
}

export const updateBalanceDocument = async (userId, accountId, balanceId, balanceData) => {
    const userDocRef = firestore.doc(`users/${userId}`);
    const balanceDocRef = userDocRef.collection('balances').doc(balanceId);
    const balanceDocSnapshot = await balanceDocRef.get();
    if (balanceDocSnapshot.exists) {
        const currentBalanceData = balanceDocSnapshot.data();
        await balanceDocRef.update(balanceData);
        if (currentBalanceData.currencyCode !== balanceData.currencyCode) {
            await updateAccountTotal(userDocRef, accountId);
        }
    } else {
        console.log('Balance does not exist');
    }
}

export const deleteBalanceDocument = async (userId, accountId, balanceId) => {
    const userDocRef = firestore.doc(`users/${userId}`);
    const balanceDocRef = userDocRef.collection('balances').doc(balanceId);
    try {
        await balanceDocRef.delete();
        await updateAccountTotal(userDocRef, accountId);
        console.log('Document Deleted Successfully');
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteAccountBalances = async (userDocRef, accountId) => {
    const batch = firestore.batch();
    const balancesCollectionRef = userDocRef.collection('balances');
    const balancesCollectionSnapshot = await balancesCollectionRef.get();
    for await (const balanceDoc of balancesCollectionSnapshot.docs) {
        const balanceData = balanceDoc.data();
        if (balanceData.accountId === accountId) {
            batch.delete(balanceDoc.ref);
        }
        await deleteBalanceTransactions(userDocRef, accountId, balanceDoc.id);
    }
    try {
        await batch.commit();
        console.log('deleted balances');
        await updateAccountTotal(userDocRef, accountId);
    } catch (e) {
        console.log('Balances batch commit error', e.message);
    }
}

export const calcBalanceTransactionsTotal = async (userDocRef, balanceId) => {
    const transactionsCollectionRef = userDocRef.collection('transactions');
    const transactionsCollectionSnapshot = await transactionsCollectionRef.get();
    let transactionsTotal = 0;

    transactionsCollectionSnapshot.docs.forEach(doc => {
        const transactionData = doc.data();
        if (transactionData.balanceId === balanceId) {
            transactionsTotal = transactionData.type === 'spending'
                ? transactionsTotal - +transactionData.amount
                : transactionsTotal + +transactionData.amount;
        }
    });

    return transactionsTotal;
}

export const updateBalanceTotal = async (userDocRef, balanceId) => {
    const balanceDocRef = userDocRef.collection('balances').doc(balanceId);
    const balanceDocSnapshot = await balanceDocRef.get();
    const balanceData = balanceDocSnapshot.data();
    if (balanceDocSnapshot.exists) {
        const transactionsTotal = await calcBalanceTransactionsTotal(userDocRef, balanceId);
        if (balanceData.totalBalance !== transactionsTotal) {
            try {
                await balanceDocRef.update({totalBalance: transactionsTotal});
                console.log('Updated balance total balance');
                await updateAccountTotal(userDocRef, balanceData.accountId)
            } catch (e) {
                console.log('Could not update balance total');
            }
        }
    }
}