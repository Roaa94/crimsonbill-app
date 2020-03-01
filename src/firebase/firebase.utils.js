import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

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

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
        console.log('user created', email);
    }
    return userRef;
};

export default firebase;