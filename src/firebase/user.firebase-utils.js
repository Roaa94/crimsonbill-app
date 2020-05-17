import {firestore} from "./firebase.utils";
import {initDefaultTaxonomies} from "./taxonomies.firebase-utils";
import {getConversionRateFromIds} from "./currencies.firebase-utils";

export const createUserProfileDocument = async (authUser, additionalData) => {
    if (!authUser) return;
    const userRef = firestore.doc(`users/${authUser.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName: additionalData && additionalData.displayName ? additionalData.displayName : authUser.displayName,
                email: authUser.email,
                defaultCurrencyId: 'USD',
                totalBalance: 0,
                avatarUrl: authUser.photoURL ? authUser.photoURL : null,
                createdAt,
            });
        } catch (error) {
            console.log('error creating user reference', error.message);
            return;
        }
        // Write default taxonomies of the user
        try {
            await initDefaultTaxonomies(snapShot.id);
        } catch (e) {
            console.log('Could not write default taxonomies', e.message);
        }
        console.log('user created, display name:', additionalData && additionalData.displayName ? additionalData.displayName : authUser.displayName);
    }
    return userRef;
};

export const updateUserDocumentAvatar = async (user, avatarUrl) => {
    const userRef = firestore.doc(`users/${user.id}`);
    try {
        await userRef.update({
            avatarUrl,
        });
    } catch (error) {
        console.log('error updating avatar', error.message);
    }
};

export const setDefaultCurrency = async (userId, currencyCode) => {
    const userRef = firestore.doc(`users/${userId}`);
    try {
        await userRef.update({
            defaultCurrencyCode: currencyCode,
        });
    } catch (e) {
        console.log('Error changing default currency', e.message);
    }
    try{
        await updateUserTotalBalance(userRef);
        console.log('Updated user total balance');
    } catch (e) {
        console.log('Error updating user total balance', e.message);
    }
}

export const updateUserTotalBalance = async userDocRef => {
    const accountsRef = userDocRef.collection('accounts');
    const accountsCollectionSnapshot = await accountsRef.get();
    const userSnapshot = await userDocRef.get();
    const userData = userSnapshot.data();

    let accountsTotal = 0;

    for await (let accountDoc of accountsCollectionSnapshot.docs) {
        const accountData = accountDoc.data();
        if (accountData.currencyCode === userData.defaultCurrencyCode) {
            accountsTotal += +accountData.totalBalance;
        } else {
            const conversionRate = await getConversionRateFromIds(accountData.currencyCode, userData.defaultCurrencyCode);
            accountsTotal += +accountData.totalBalance * conversionRate;
        }
    }
    await userDocRef.update({totalBalance: accountsTotal});
}