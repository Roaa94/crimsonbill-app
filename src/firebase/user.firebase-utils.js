import {firestore} from "./firebase.utils";
import {initDefaultTaxonomies} from "./taxonomies.firebase-utils";

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
                avatarUrl: authUser.photoURL ? authUser.photoURL : null,
                createdAt,
            });
        } catch (error) {
            console.log('error creating user reference', error.message);
            return;
        }
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