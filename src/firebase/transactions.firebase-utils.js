import {firestore, getBalanceDocPath, getTransactionDocPath} from "./firebase.utils";

export const addOrUpdateTransactionDocument = async (userId, accountId, balanceId, transactionId, transactionData) => {
    const balanceDocPath = getBalanceDocPath(userId, accountId, balanceId);
    const transactionDocPath = getTransactionDocPath(userId, accountId, balanceId, transactionId);

    const transactionRef = transactionId
        ? await firestore.doc(transactionDocPath)
        : await firestore.doc(balanceDocPath).collection('transactions').doc();

    const transactionSnapshot = await transactionRef.get();
    const batch = firestore.batch();
    const accountToAccount = transactionData.accountToAccount && transactionData.targetAccountId && transactionData.targetBalanceId;
    const otherBalanceDocPath = getBalanceDocPath(userId, transactionData.targetAccountId, transactionData.targetBalanceId);

    if (!transactionSnapshot.exists && !transactionId) {
        //Create new transaction
        batch.set(transactionRef, transactionData);
        if (accountToAccount) {
            //Add the transaction to the other account
            try {
                const mirrorTransactionRef = await firestore.doc(otherBalanceDocPath).collection('transactions').doc(transactionSnapshot.id);
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
    } else {
        try {
            //Update existing transaction
            batch.update(transactionRef, transactionData);
            if (accountToAccount) {
                const mirrorTransactionPath = getTransactionDocPath(userId, transactionData.targetAccountId, transactionData.targetBalanceId, transactionId);
                const mirrorTransactionRef = await firestore.doc(mirrorTransactionPath);
                const mirrorTransactionSnapshot = await mirrorTransactionRef.get();
                const {title, amount, dateTime, notes, category} = transactionData;
                if(mirrorTransactionSnapshot.exists) {
                    let updatedMirrorTransaction = {
                        ...mirrorTransactionSnapshot.data(),
                        title, amount, dateTime, notes, category,
                    }
                    batch.update(mirrorTransactionRef, updatedMirrorTransaction);
                } else {
                    console.log('Mirror transaction does not exist');
                    return;
                }
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
    try {
        const accountDocPath = `users/${userId}/accounts/${accountId}`;
        const balanceDocPath = `${accountDocPath}/balances/${balanceId}`;
        const transactionPath = `${balanceDocPath}/transactions/${transactionId}`;
        const transactionRef = firestore.doc(transactionPath);
        await transactionRef.delete();
        console.log('Document Deleted Successfully');
    } catch (error) {
        console.log(error.message);
    }
};