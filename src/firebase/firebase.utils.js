import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCL3K6pPVEIHFNMHXxLX3fX5NIAf5Wy0xo",
    authDomain: "planner-app-c5da5.firebaseapp.com",
    databaseURL: "https://planner-app-c5da5.firebaseio.com",
    projectId: "planner-app-c5da5",
    storageBucket: "planner-app-c5da5.appspot.com",
    messagingSenderId: "517745240344",
    appId: "1:517745240344:web:6958f2f9a3aeab0e64166d"
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

export const updateUserDocumentAvatar = async (currentUser, avatarUrl) => {
    const userRef = firestore.doc(`users/${currentUser.id}`);
    try {
        await userRef.update({
            avatarUrl,
        });
    } catch (error) {
        console.log('error updating avatar', error.message);
    }
};

export default firebase;