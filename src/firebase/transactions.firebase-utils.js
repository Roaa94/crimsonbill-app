import {firestore, getBalanceDocPath, getTransactionDocPath} from "./firebase.utils";

export const addTransactionDocument = async (userId, accountId, balanceId, transactionData) => {
    const balanceDocPath = getBalanceDocPath(userId, accountId, balanceId);
    const transactionRef = firestore.doc(balanceDocPath).collection('transactions').doc();
    const transactionSnapshot = await transactionRef.get();
    const batch = firestore.batch();
    const accountToAccount = transactionData.accountToAccount && transactionData.targetAccountId && transactionData.targetBalanceId;

    if (transactionSnapshot.exists) {
        console.log('Transaction exists already!');
        return;
    }
    //Create new transaction
    batch.set(transactionRef, transactionData);
    if (accountToAccount) {
        //Add the transaction to the other account
        const otherBalanceDocPath = getBalanceDocPath(userId, transactionData.targetAccountId, transactionData.targetBalanceId);
        try {
            const mirrorTransactionRef = firestore.doc(otherBalanceDocPath).collection('transactions').doc(transactionSnapshot.id);
            const mirrorTransactionSnapshot = await mirrorTransactionRef.get();
            if (!mirrorTransactionSnapshot.exists) {
                let mirrorTransaction = {
                    ...transactionData,
                    type: transactionData.type === 'spending' ? 'earning' : 'spending',
                    targetAccountId: accountId,
                    targetBalanceId: balanceId,
                };
                batch.set(mirrorTransactionRef, mirrorTransaction);
                console.log('mirrorTransaction')
                console.log(mirrorTransaction)
            }
        } catch (e) {
            console.log('Could not add mirror transaction');
            console.log(e.message);
            return;
        }
    }

    try {
        await batch.commit();
    } catch (e) {
        console.log('batch commit error');
        console.log(e.message);
    }
}

export const updateTransactionDocument = async (userId, accountId, balanceId, transactionId, transactionData) => {
    const transactionDocPath = getTransactionDocPath(userId, accountId, balanceId, transactionId);
    const transactionRef = await firestore.doc(transactionDocPath);
    const transactionSnapshot = await transactionRef.get();

    if (!transactionSnapshot.exists) {
        console.log('The transaction does not exist!');
        return;
    }

    const batch = firestore.batch();
    const accountToAccount = transactionData.accountToAccount && transactionData.targetAccountId && transactionData.targetBalanceId;

    //Update existing transaction
    batch.update(transactionRef, transactionData);
    if (accountToAccount) {
        const mirrorTransactionPath = getTransactionDocPath(userId, transactionData.targetAccountId, transactionData.targetBalanceId, transactionId);
        try {
            const mirrorTransactionRef = await firestore.doc(mirrorTransactionPath);
            const mirrorTransactionSnapshot = await mirrorTransactionRef.get();
            const {title, amount, dateTime, notes, categoryId} = transactionData;
            if (mirrorTransactionSnapshot.exists) {
                let updatedMirrorTransaction = {
                    ...mirrorTransactionSnapshot.data(),
                    type: transactionData.type === 'spending' ? 'earning' : 'spending',
                    title, amount, dateTime, notes, categoryId,
                }
                batch.update(mirrorTransactionRef, updatedMirrorTransaction);
            } else {
                console.log('Mirror transaction does not exist');
                return;
            }
        } catch (error) {
            console.log('Could not update transaction')
            console.log(error.message);
            return;
        }
    }
    try {
        await batch.commit();
    } catch (e) {
        console.log('batch commit error');
        console.log(e.message);
    }
}

export const deleteTransactionDocument = async (userId, accountId, balanceId, transactionId) => {
    const batch = firestore.batch();
    const transactionPath = getTransactionDocPath(userId, accountId, balanceId, transactionId);
    const transactionRef = firestore.doc(transactionPath);
    batch.delete(transactionRef);
    try {
        const transactionSnapshot = await transactionRef.get();
        const transactionData = transactionSnapshot.data();
        const accountToAccount = transactionData && transactionData.accountToAccount && transactionData.targetAccountId && transactionData.targetBalanceId;
        if (accountToAccount) {
            const mirrorTransactionPath = getTransactionDocPath(
                userId,
                transactionData.targetAccountId,
                transactionData.targetBalanceId,
                transactionId
            );
            const mirrorTransactionRef = firestore.doc(mirrorTransactionPath);
            batch.delete(mirrorTransactionRef);
        }
    } catch (error) {
        console.log(error.message);
    }
    try {
        await batch.commit();
    } catch (e) {
        console.log('batch commit error');
        console.log(e.message);
    }
};