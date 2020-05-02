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
    let oldTransactionAmount;
    let newTransactionAmount;

    try {
        if (!transactionSnapshot.exists && !transactionId) {
            await addDocument(transactionRef, transactionData);
            oldTransactionAmount = 0;
            newTransactionAmount = transactionData.amount;
        } else {
            const existingTransactionData = transactionSnapshot.data();
            oldTransactionAmount = existingTransactionData.amount;
            newTransactionAmount = +transactionData.amount - +existingTransactionData.amount;
            oldTransactionAmount = newTransactionAmount === 0 ? oldTransactionAmount * 2 : oldTransactionAmount;
            await transactionRef.update(transactionData);
        }
    } catch (error) {
        console.log(error.message);
        return;
    }
    await updateBalanceTotalBalance(
        balanceDocPath,
        oldTransactionAmount,
        newTransactionAmount,
        transactionData.type
    );
    console.log('Transaction and balance updated successfully');
}

export const deleteTransactionDocument = async (userId, accountId, balanceId, transactionId) => {
    try {
        const accountDocPath = `users/${userId}/accounts/${accountId}`;
        const balanceDocPath = `${accountDocPath}/balances/${balanceId}`;
        const transactionPath = `${balanceId ? balanceDocPath : accountDocPath}/transactions/${transactionId}`;
        const transactionRef = firestore.doc(transactionPath);
        const transactionSnapshot = await transactionRef.get();
        const transactionData = transactionSnapshot.data();

        await updateBalanceTotalBalance(
            balanceDocPath,
            -(+transactionData.amount),
            0,
            transactionData.type
        );
        await transactionRef.delete();
        console.log('Document Deleted Successfully');
    } catch (error) {
        console.log(error.message);
    }
};


const updateBalanceTotalBalance = async (balancePath, oldTransactionAmount, newTransactionAmount, newTransactionType) => {
    const balanceRef = firestore.doc(balancePath)
    const balanceSnapshot = await balanceRef.get();
    const balanceData = balanceSnapshot.data();
    const oldTotalBalance = balanceData.totalBalance;
    const newTotalBalance = newTransactionAmount === 0
        ? newTransactionType === 'spending'
            ? (+oldTotalBalance - +oldTransactionAmount)
            : (+oldTotalBalance + +oldTransactionAmount)
        : newTransactionType === 'spending'
            ? (+oldTotalBalance - +newTransactionAmount)
            : (+oldTotalBalance + +newTransactionAmount);
    await balanceRef.update({totalBalance: newTotalBalance});
}