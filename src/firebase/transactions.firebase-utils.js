import {addDocument, firestore} from "./firebase.utils";

export const addOrUpdateTransactionDocument = async (userId, accountId, balanceId, transactionId, transactionData) => {
    const accountDocPath = `users/${userId}/accounts/${accountId}`;
    const balanceDocPath = `${accountDocPath}/balances/${balanceId}`;
    const initialPath = balanceId ? balanceDocPath : accountDocPath;
    const transactionDocPath = `${initialPath}/transactions/${transactionId}`;

    const transactionRef = transactionId
        ? await firestore.doc(transactionDocPath)
        : await firestore.doc(initialPath).collection('transactions').doc();

    const transactionSnapshot = await transactionRef.get();

    const balanceRef = firestore.doc(balanceDocPath)
    const balanceSnapshot = await balanceRef.get();
    const balanceData = balanceSnapshot.data();
    const oldTotalBalance = balanceData.totalBalance;
    let newTotalBalance = oldTotalBalance;

    try {
        if (!transactionSnapshot.exists && !transactionId) {
            await addDocument(transactionRef, transactionData);
            newTotalBalance = transactionData.type === 'spending'
                ? (+oldTotalBalance - +transactionData.amount)
                : (+oldTotalBalance + +transactionData.amount);

        } else {
            const existingTransactionData = transactionSnapshot.data();
            const oldTransactionAmount = existingTransactionData.amount;
            const newTransactionAmount = +transactionData.amount - +oldTransactionAmount;
            newTotalBalance = newTransactionAmount === 0
                ? transactionData.type === 'spending'
                    ? (+oldTotalBalance - +oldTransactionAmount)
                    : (+oldTotalBalance + +oldTransactionAmount)
                : transactionData.type === 'spending'
                    ? (+oldTotalBalance - +newTransactionAmount)
                    : (+oldTotalBalance + +newTransactionAmount);

            await transactionRef.update(transactionData);
        }
    } catch (error) {
        console.log(error.message);
        return;
    }
    await balanceRef.update({totalBalance: newTotalBalance});
    console.log('Transaction and balance updated successfully');
}

export const deleteTransactionDocument = async (userId, accountId, balanceId, transactionId) => {
    try {
        const accountDocPath = `users/${userId}/accounts/${accountId}`;
        const balanceDocPath = `${accountDocPath}/balances/${balanceId}`;
        const docPath = `${balanceId ? balanceDocPath : accountDocPath}/transactions/${transactionId}`;
        await firestore.doc(docPath).delete();
        console.log('Document Deleted Successfully');
    } catch (error) {
        console.log(error.message);
    }
};