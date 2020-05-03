import {addDocument, firestore} from "./firebase.utils";
import {updateAccountTotalBalance} from "./accounts.firebase-utils";

export const addOrUpdateTransactionDocument = async (userId, accountId, balanceId, transactionId, transactionData) => {
    const accountDocPath = `users/${userId}/accounts/${accountId}`;
    const balanceDocPath = `${accountDocPath}/balances/${balanceId}`;
    const transactionDocPath = `${balanceDocPath}/transactions/${transactionId}`;

    const transactionRef = transactionId
        ? await firestore.doc(transactionDocPath)
        : await firestore.doc(balanceDocPath).collection('transactions').doc();

    const transactionSnapshot = await transactionRef.get();
    let existingTransactionData;

    try {
        if (!transactionSnapshot.exists && !transactionId) {
            //Create new transaction
            await addDocument(transactionRef, transactionData);
        } else {
            //Update existing transaction
            existingTransactionData = transactionSnapshot.data();
            await transactionRef.update(transactionData);
        }
    } catch (error) {
        console.log(error.message);
        return;
    }
    let {oldTotalBalance, newTotalBalance} = await updateTotalBalance(
        balanceDocPath,
        existingTransactionData,
        transactionData,
    );
    await updateAccountTotalBalance(accountDocPath, oldTotalBalance, newTotalBalance);
    console.log('Transaction and balance updated successfully');
}

export const deleteTransactionDocument = async (userId, accountId, balanceId, transactionId) => {
    try {
        const accountDocPath = `users/${userId}/accounts/${accountId}`;
        const balanceDocPath = `${accountDocPath}/balances/${balanceId}`;
        const transactionPath = `${balanceDocPath}/transactions/${transactionId}`;
        const transactionRef = firestore.doc(transactionPath);
        const transactionSnapshot = await transactionRef.get();
        const transactionData = transactionSnapshot.data();

        let {oldTotalBalance, newTotalBalance} = await updateTotalBalance(
            balanceDocPath,
            transactionData,
            null,
        );
        await updateAccountTotalBalance(accountDocPath, oldTotalBalance, newTotalBalance);
        await transactionRef.delete();
        console.log('Document Deleted Successfully');
    } catch (error) {
        console.log(error.message);
    }
};


const updateTotalBalance = async (collectionPath, oldTransactionData, newTransactionData) => {
    const collectionRef = firestore.doc(collectionPath)
    const collectionSnapshot = await collectionRef.get();
    const collectionData = collectionSnapshot.data();
    const oldTotalBalance = collectionData.totalBalance;
    let amountToUpdate = 0;
    let newTotalBalance = 0;

    if (oldTransactionData && newTransactionData) {
        //On Transaction update
        //If the user switched between spending <=> earning types
        amountToUpdate = oldTransactionData.type !== newTransactionData.type
            ? +oldTransactionData.amount + +newTransactionData.amount
            : +newTransactionData.amount;
        newTotalBalance = newTransactionData.type === 'spending'
            ? +oldTotalBalance - +amountToUpdate
            : +oldTotalBalance + +amountToUpdate;
    } else if (!oldTransactionData) {
        //On Transaction Creation
        amountToUpdate = +newTransactionData.amount;
        newTotalBalance = newTransactionData.type === 'spending'
            ? +oldTotalBalance - +amountToUpdate
            : +oldTotalBalance + +amountToUpdate;
    } else if (!newTransactionData) {
        //On Transaction Deletion
        amountToUpdate = +oldTransactionData.amount;
        newTotalBalance = oldTransactionData.type === 'spending'
            ? +oldTotalBalance + +amountToUpdate
            : +oldTotalBalance - +amountToUpdate;
    }

    await collectionRef.update({totalBalance: newTotalBalance});
    return {oldTotalBalance, newTotalBalance};
}