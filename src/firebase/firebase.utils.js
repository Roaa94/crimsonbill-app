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

export const signInWithGoogle = () => auth.signInWithPopup(provider).catch((error) => {
    console.log(error.code);
    console.log(error.message);
});

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
        const createdAt = new Date();
        if (additionalData) { // sign up with email and password
            const {displayName} = additionalData;
            const {email} = userAuth;
            try {
                await userRef.set({
                    displayName,
                    email,
                    createdAt,
                });
            } catch (error) {
                console.log('error creating user', error.message);
            }
            console.log('user created from email and password', displayName);
        } else { //sign up with google
            const {displayName, email} = userAuth;
            try {
                await userRef.set({
                    displayName,
                    email,
                    createdAt,
                });
            } catch (error) {
                console.log('error creating user', error.message);
            }
            console.log('user created from google account', displayName);
        }
    }
    return userRef;
};

export default firebase;