import {firestore} from "./firebase.utils";

export const addUserAccountDocument = async (userId, accountData) => {
    const userAccountsRef = firestore.doc(`users/${userId}`).collection('accounts').doc();
    const snapShot = await userAccountsRef.get();

    if (!snapShot.exists) {
        const createdAt = new Date();
        try {
            await userAccountsRef.set({
                createdAt,
                ...accountData,
            });
        } catch (error) {
            console.log('error creating user reference', error.message);
            return;
        }
    }
    return userAccountsRef;
};

export const convertAccountsCollectionToArray = (accountsSnapshot) => {
    const accountsArray = [];
    accountsSnapshot.docs.forEach(doc => {
        const {id} = doc;
        const accountData = doc.data();
        accountsArray.push({
            id,
            ...accountData,
        });
    });
    return accountsArray;
};

export const updateUserAccountDocument = async (userId, accountId, updatedAccountData) => {
    const userAccountRef = await firestore.doc(`users/${userId}/accounts/${accountId}`);
    try {
        await userAccountRef.update(updatedAccountData);
        console.log('Document Updated Successfully');
    } catch (error) {
        console.log(error.message);
        return;
    }
    return userAccountRef;
};

export const deleteUserAccountDocument = async (userId, accountId) => {
    try {
        await firestore.doc(`users/${userId}/accounts/${accountId}`).delete();
        console.log('Document Deleted Successfully');
    } catch (error) {
        console.log(error.message);
    }
};