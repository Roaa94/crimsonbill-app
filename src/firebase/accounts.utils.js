import {firestore} from "./firebase.utils";

export const addUserAccountDocument = async (currentUser, {type, name, currency, details}) => {
    const userAccountRef = firestore.doc(`users/${currentUser.id}`).collection('accounts').doc();
    const snapShot = await userAccountRef.get();

    if (!snapShot.exists) {
        const createdAt = new Date();
        try {
            await userAccountRef.set({
                createdAt,
                type,
                name,
                currency,
                details,
            });
        } catch (error) {
            console.log('error creating user reference', error.message);
            return;
        }
    }
    return userAccountRef;
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