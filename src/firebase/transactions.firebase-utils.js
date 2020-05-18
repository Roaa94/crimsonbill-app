import {firestore} from "./firebase.utils";
import {updateBalanceTotal} from "./balances.firebase-utils";

export const addTransactionDocument = async (userId, accountId, balanceId, transactionData) => {
    const userDocRef = firestore.doc(`users/${userId}`);
    const transactionDocRef = userDocRef.collection('transactions').doc();
    const transactionDocSnapshot = await transactionDocRef.get();
    const batch = firestore.batch();
    const accountToAccount = transactionData.accountToAccount && transactionData.targetAccountId && transactionData.targetBalanceId;

    if (!transactionDocSnapshot.exists) {
        const newTransaction = {
            accountId,
            balanceId,
            ...transactionData,
        }
        if (accountToAccount) {
            const mirrorTransaction = {
                ...transactionData,
                type: transactionData.type === 'spending' ? 'earning' : 'spending',
                targetAccountId: accountId,
                targetBalanceId: balanceId,
                mirrorTransactionId: transactionDocSnapshot.id,
            }
            const mirrorTransactionDocRef = userDocRef.collection('transactions').doc();
            const mirrorTransactionSnapshot = await mirrorTransactionDocRef.get();
            if (!mirrorTransactionSnapshot.exists) {
                newTransaction['mirrorTransactionId'] = mirrorTransactionSnapshot.id;
                batch.set(mirrorTransactionDocRef, mirrorTransaction);
            }
        }
        batch.set(transactionDocRef, newTransaction);
        try {
            await batch.commit();
            console.log('Added transaction(s)');
            await updateBalanceTotal(userDocRef, balanceId);
        } catch (e) {
            console.log('Transactions batch commit error', e.message);
        }
    }
}

export const updateTransactionDocument = async (userId, accountId, balanceId, transactionId, transactionData) => {
    const userDocRef = firestore.doc(`users/${userId}`);
    const transactionDocRef = userDocRef.collection('transactions').doc(transactionId);
    const transactionDocSnapshot = await transactionDocRef.get();
    if (transactionDocSnapshot.exists) {
        const batch = firestore.batch();
        const currentTransactionData = transactionDocSnapshot.data();
        const mirrorTransactionId = currentTransactionData.mirrorTransactionId;
        const accountToAccount = transactionData.accountToAccount && transactionData.targetAccountId && transactionData.targetBalanceId && mirrorTransactionId;
        //Update existing transaction
        batch.update(transactionDocRef, transactionData);

        if (accountToAccount) {
            //Update mirror transaction
            const mirrorTransactionDocRef = userDocRef.collection('transactions').doc(mirrorTransactionId);
            const mirrorTransactionSnapshot = await mirrorTransactionDocRef.get();
            const {title, amount, dateTime, notes, categoryId} = transactionData;
            if (mirrorTransactionSnapshot.exists) {
                const updatedMirrorTransaction = {
                    ...mirrorTransactionSnapshot.data(),
                    type: transactionData.type === 'spending' ? 'earning' : 'spending',
                    title, amount, dateTime, notes, categoryId,
                }
                batch.update(mirrorTransactionDocRef, updatedMirrorTransaction);
            } else {
                console.log('Mirror transaction does not exist');
            }
        }
        try {
            await batch.commit();
            console.log('Added transaction(s)');
            await updateBalanceTotal(userDocRef, balanceId);
        } catch (e) {
            console.log('Transactions batch commit error', e.message);
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
        const batch = firestore.batch();
        const transactionData = transactionSnapshot.data();
        const mirrorTransactionId = transactionData.mirrorTransactionId;
        const accountToAccount = transactionData && transactionData.accountToAccount && transactionData.targetAccountId && transactionData.targetBalanceId && mirrorTransactionId;
        if (accountToAccount) {
            const mirrorTransactionRef = userDocRef.collection('transactions').doc(mirrorTransactionId);
            batch.delete(mirrorTransactionRef);
        }
        batch.delete(transactionDocRef);
        try {
            await batch.commit();
            console.log('Added transaction(s)');
            await updateBalanceTotal(userDocRef, balanceId);
        } catch (e) {
            console.log('Transactions batch commit error', e.message);
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