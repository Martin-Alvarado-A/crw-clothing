import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBpuCaBV7LzdU_FIjk2INSIkBIyLSaQl30",
  authDomain: "crwn-db-4a112.firebaseapp.com",
  projectId: "crwn-db-4a112",
  storageBucket: "crwn-db-4a112.appspot.com",
  messagingSenderId: "191060560044",
  appId: "1:191060560044:web:fe7279a3c35bfcc1f8b709",
  measurementId: "G-4GGLN51MH4"
};

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
      })
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: "select_account"});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;