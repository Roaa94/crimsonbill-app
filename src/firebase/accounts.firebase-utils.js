import {firestore, getAccountDocPath, getBalanceDocPath} from "./firebase.utils";

export const addOrUpdateAccountDocument = async (userId, accountId, accountData) => {
    const userDocPath = `users/${userId}`;
    const accountDocPath = `${userDocPath}/accounts/${accountId}`;
    const accountRef = accountId ?
        await firestore.doc(accountDocPath)
        : await firestore.doc(userDocPath).collection('accounts').doc();
    const accountSnapshot = await accountRef.get();
    let newAccount = null;
    if (!accountSnapshot.exists && !accountId) {
        const createdAt = new Date();
        newAccount = {
            createdAt,
            ...accountData,
            totalBalance: 0.0,
        };
        const newAccountId = accountSnapshot.id;
        try {
            await accountRef.set(newAccount);
        } catch (error) {
            console.log(error.message);
            return;
        }
        const mainBalanceRef = firestore.collection(`${userDocPath}/accounts/${newAccountId}/balances`).doc();
        const mainBalanceSnapshot = await mainBalanceRef.get();
        if (!mainBalanceSnapshot.exists) {
            const mainBalance = {
                createdAt,
                name: 'Main Balance',
                currency: accountData.currency,
                totalBalance: 0.0,
            };
            try {
                await mainBalanceRef.set(mainBalance);
            } catch (error) {
                console.log(error.message);
            }
        }
    } else {
        try {
            newAccount = accountData;
            await accountRef.update(newAccount);
            console.log('Document Updated Successfully');
        } catch (error) {
            console.log(error.message);
        }
    }
};

export const deleteAccountDocument = async (userId, accountId) => {
    try {
        await firestore.doc(`users/${userId}/accounts/${accountId}`).delete();
        console.log('Document Deleted Successfully');
    } catch (error) {
        console.log(error.message);
    }
};

export const updateTotal = async (userId, accountId, balanceId) => {
    const docPath = balanceId
        ? getBalanceDocPath(userId, accountId, balanceId)
        : getAccountDocPath(userId, accountId);
    const docRef = firestore.doc(docPath);
    const collectionPath = `${docPath}/${balanceId ? 'transactions' : 'balances'}`;
    const collectionRef = firestore.collection(collectionPath);
    const collectionSnapshot = await collectionRef.get();
    let total = 0;
    collectionSnapshot.docs.forEach(doc => {
        const data = doc.data();
        if (balanceId) {
            total = data.type === 'spending' ? total - +data.amount : total + +data.amount;
        } else {
            total += data.totalBalance;
        }
    });
    try {
        await docRef.update({totalBalance: total});
    } catch (e) {
        console.log('Error updating account total', e.message);
    }
}

// export const updateTotal = async (userId, accountId, balanceId) => {
//     const balanceDocPath = getBalanceDocPath(userId, accountId, balanceId);
//     const balanceDocRef = firestore.doc(balanceDocPath);
//     const transactionsCollectionPath = `${balanceDocPath}/transactions`;
//     const transactionsCollectionRef = firestore.collection(transactionsCollectionPath);
//     const transactionsCollectionSnapshot = await transactionsCollectionRef.get();
//     let transactionsTotal = 0;
//     transactionsCollectionSnapshot.docs.forEach(doc => {
//         const transactionData = doc.data();
//         transactionsTotal = transactionData.type === 'spending' ? transactionsTotal - +transactionData.amount : transactionsTotal + +transactionData.amount;
//     });
//     try {
//         await balanceDocRef.update({totalBalance: transactionsTotal});
//     } catch (e) {
//         console.log('Error updating balance total', e.message);
//     }
//
//     const accountDocPath = getAccountDocPath(userId, accountId);
//     const accountDocRef = firestore.doc(accountDocPath);
//     const balancesCollectionPath = `${accountDocPath}/balances`;
//     const balancesCollectionRef = firestore.collection(balancesCollectionPath);
//     const balancesCollectionSnapshot = await balancesCollectionRef.get();
//     let balancesTotal = 0;
//     balancesCollectionSnapshot.docs.forEach(doc => {
//         const balanceData = doc.data();
//         balancesTotal = balanceData.type === 'spending' ? balancesTotal - +balanceData.amount : balancesTotal + +balanceData.amount;
//     });
//     try {
//         await accountDocRef.update({totalBalance: balancesTotal});
//     } catch (e) {
//         console.log('Error updating account total', e.message);
//     }
// }