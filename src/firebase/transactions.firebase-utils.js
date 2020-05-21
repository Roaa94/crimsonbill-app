import {firestore} from "./firebase.utils";
import {updateBalanceTotal} from "./balances.firebase-utils";

export const addTransactionDocument = async (userId, accountId, balanceId, transactionData) => {
    const userDocRef = firestore.doc(`users/${userId}`);

    // Get transaction balance currency code
    const balanceDocRef = userDocRef.collection('balances').doc(balanceId);
    const balanceDocSnapshot = await balanceDocRef.get();
    const balanceData = balanceDocSnapshot.data();
    const balanceCurrencyCode = balanceData.currencyCode;

    const transactionDocRef = userDocRef.collection('transactions').doc();
    const transactionDocSnapshot = await transactionDocRef.get();

    if (!transactionDocSnapshot.exists) {
        const newTransaction = {
            accountId,
            balanceId,
            currencyCode: balanceCurrencyCode,
            ...transactionData,
        }
        try {
            await transactionDocRef.set(newTransaction);
            console.log('Added transaction(s)');
            await updateBalanceTotal(userDocRef, balanceId);
        } catch (e) {
            console.log('Could not add transaction', e.message);
        }
    }
}

export const updateTransactionDocument = async (userId, accountId, balanceId, transactionId, transactionData) => {
    const userDocRef = firestore.doc(`users/${userId}`);
    const transactionDocRef = userDocRef.collection('transactions').doc(transactionId);
    const transactionDocSnapshot = await transactionDocRef.get();

    if (transactionDocSnapshot.exists) {
        try {
            await transactionDocRef.update(transactionData);
            console.log('Added transaction(s)');
            await updateBalanceTotal(userDocRef, balanceId);
        } catch (e) {
            console.log('Could not update transaction', e.message);
        }
    } else {
        console.log('Transaction does not exist');
    }
}

export const deleteTransactionDocument = async (userId, accountId, balanceId, transactionId) => {
    const userDocRef = firestore.doc(`users/${userId}`);
    const transactionDocRef = userDocRef.collection('transactions').doc(transactionId);
    const transactionSnapshot = await transactionDocRef.get();

    if (transactionSnapshot.exists) {
        try {
            await transactionDocRef.delete();
            console.log('Added transaction(s)');
            await updateBalanceTotal(userDocRef, balanceId);
        } catch (e) {
            console.log('Could not delete transaction', e.message);
        }
    } else {
        console.log('Transaction does not exist');
    }
};

export const deleteBalanceTransactions = async (userDocRef, accountId, balanceId) => {
    const batch = firestore.batch();
    const transactionsCollectionRef = userDocRef.collection('transactions');
    const transactionsCollectionSnapshot = await transactionsCollectionRef.get();
    transactionsCollectionSnapshot.docs.forEach(transactionDoc => {
        const transactionData = transactionDoc.data();
        if (transactionData.accountId === accountId && transactionData.balanceId === balanceId) {
            batch.delete(transactionDoc.ref);
        }
    });
    try {
        await batch.commit();
        console.log('deleted transactions');
        await updateBalanceTotal(userDocRef, balanceId);
    } catch (e) {
        console.log('Transactions batch commit error', e.message);
    }
}