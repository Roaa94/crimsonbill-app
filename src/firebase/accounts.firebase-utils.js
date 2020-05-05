import {firestore} from "./firebase.utils";

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

export const updateAccountTotal = async (userId, accountId) => {
    const accountDocPath = `users/${userId}/accounts/${accountId}`;
    const accountDocRef = firestore.doc(accountDocPath);
    const balancesCollectionPath = `${accountDocPath}/balances`;
    const balancesCollectionRef = firestore.collection(balancesCollectionPath);

    balancesCollectionRef.get().then(balanceCollectionSnapshot => {
        let total = 0;
        balanceCollectionSnapshot.docs.forEach(doc => {
            const balanceData = doc.data();
            total += +balanceData.totalBalance;
        });
        return accountDocRef.update({totalBalance: total});
    }).catch(error => error.message)
}