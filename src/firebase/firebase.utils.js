import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD3VlTiHyq4kowWs41Tyw22q3lDN2iZ4xs",
    authDomain: "tracker-app-c38fe.firebaseapp.com",
    databaseURL: "https://tracker-app-c38fe.firebaseio.com",
    projectId: "tracker-app-c38fe",
    storageBucket: "tracker-app-c38fe.appspot.com",
    messagingSenderId: "547781474090",
    appId: "1:547781474090:web:c4e1ae74f78defc49cd053"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storageRef = firebase.storage().ref();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider).catch((error) => {
    console.log(error.code);
    console.log(error.message);
});

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

export const convertCollectionToArray = (snapshot) => {
    const array = [];
    snapshot.docs.forEach(doc => {
        const {id} = doc;
        const itemData = doc.data();
        array.push({
            id,
            ...itemData,
        });
    });
    return array;
}

export const addDocument = async (docRef, data) => {
    const createdAt = new Date();
    const newData = {
        createdAt,
        ...data,
    };
    try {
        await docRef.set(newData);
    } catch(error) {
        console.log(error.message);
    }
}

export const getAccountPath = (userId, accountId) => {
    return `users/${userId}/accounts/${accountId}`;
}

export const getBalanceDocPath = (userId, accountId, balanceId) => {
    return `${getAccountPath(userId, accountId)}/balances/${balanceId}`;
}

export const getTransactionDocPath = (userId, accountId, balanceId, transactionId) => {
    return `${getBalanceDocPath(userId, accountId, balanceId)}/transactions/${transactionId}`;
}

export default firebase;