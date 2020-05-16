import {firestore} from "./firebase.utils";

export const addOrUpdateBalanceDocument = async (userId, accountId, balanceId, balanceData) => {
    const balanceRef = balanceId
        ? await firestore.doc(`users/${userId}/accounts/${accountId}/balances/${balanceId}`)
        : await firestore.doc(`users/${userId}/accounts/${accountId}`).collection('balances').doc();

    const snapshot = await balanceRef.get();
    let newBalance = null;
    if (!snapshot.exists && !balanceId) {
        const createdAt = new Date();
        newBalance = {
            createdAt,
            totalBalance: 0.0,
            ...balanceData,
        };
        try {
            await balanceRef.set(newBalance);
        } catch (error) {
            console.log(error.message);
        }
    } else {
        try {
            newBalance = balanceData;
            await balanceRef.update(newBalance);
            console.log('Balance updated successfully');
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const deleteBalanceDocument = async (userId, accountId, balanceId) => {
    const accountDocPath = `users/${userId}/accounts/${accountId}`
    const balanceDocPath = `${accountDocPath}/balances/${balanceId}`;
    const balanceRef = firestore.doc(balanceDocPath);
    try {
        await balanceRef.delete();
        console.log('Document Deleted Successfully');
    } catch (error) {
        console.log(error.message);
    }
};

export const calcBalancesTotal = (balanceCollectionSnapshot) => {
    let total = 0;
    balanceCollectionSnapshot.docs.forEach(doc => {
        const balanceData = doc.data();
        total += +balanceData.totalBalance;
    });
    return total;
};