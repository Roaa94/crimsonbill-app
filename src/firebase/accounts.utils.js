import {convertCollectionToArray, firestore} from "./firebase.utils";

export const addOrUpdateUserAccountDocument = async (userId, accountId, accountData) => {
    const userAccountRef = accountId ?
        await firestore.doc(`users/${userId}/accounts/${accountId}`)
        : await firestore.doc(`users/${userId}`).collection('accounts').doc();
    const snapShot = await userAccountRef.get();
    let newAccount = null;
    if (!snapShot.exists && !accountId) {
        const createdAt = new Date();
        newAccount = {
            createdAt,
            ...accountData,
        };
        try {
            await userAccountRef.set(newAccount);
        } catch (error) {
            console.log(error.message);
            return;
        }
    } else {
        try {
            newAccount = accountData;
            await userAccountRef.update(newAccount);
            console.log('Document Updated Successfully');
        } catch (error) {
            console.log(error.message);
            return;
        }
    }

    return newAccount;
};

export const convertAccountsCollectionToArray = (accountsSnapshot, userId) => {
    let accountsArray = [];
    let balancesArray = [];
    let transactionsArray = [];
    accountsSnapshot.docs.forEach(doc => {
        const {id} = doc;
        const accountData = doc.data();
        const balancesRef = firestore.collection(`users/${userId}/accounts/${id}/balances`);
        const transactionsRef = firestore.collection(`users/${userId}/accounts/${id}/transactions`);

        balancesRef.onSnapshot(balancesSnapshot => {
            balancesArray = convertCollectionToArray(balancesSnapshot);
            transactionsRef.onSnapshot(transactionsSnapshot => {
                transactionsArray = convertCollectionToArray(transactionsSnapshot);
                accountsArray.push({
                    id,
                    ...accountData,
                    balances: balancesArray,
                    transactions: transactionsArray,
                });
            });
        });
    });
    return accountsArray;
};

export const deleteUserAccountDocument = async (userId, accountId) => {
    try {
        await firestore.doc(`users/${userId}/accounts/${accountId}`).delete();
        console.log('Document Deleted Successfully');
    } catch (error) {
        console.log(error.message);
    }
};