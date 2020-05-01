import {firestore} from "./firebase.utils";

export const addOrUpdateTransactionDocument = async (userId, accountId, balanceId, transactionId, transactionData) => {
    const accountDocPath = `users/${userId}/accounts/${accountId}`;
    const balanceDocPath = `${accountDocPath}/balances/${balanceId}`;
    const initialPath = balanceId ? balanceDocPath : accountDocPath;
    const transactionDocPath = `${initialPath}/transactions/${transactionId}`;
    console.log(initialPath);

    const transactionRef = transactionId
        ? await firestore.doc(transactionDocPath)
        : await firestore.doc(initialPath).collection('transactions').doc();

    const snapshot = await transactionRef.get();
    let newTransaction = null;
    if(!snapshot.exists && !transactionId) {
        console.log('to update');
        const createdAt = new Date();
        newTransaction = {
            createdAt,
            ...transactionData,
        };
        try {
            await transactionRef.set(newTransaction);
        } catch(error) {
            console.log(error.message);
        }
    } else {
        console.log('to edit');
        try {
            newTransaction = transactionData;
            await transactionRef.update(newTransaction);
            console.log('Transaction updated successfully');
        } catch(error) {
            console.log(error.message);
        }
    }
}