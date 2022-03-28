import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2OPKCz6fchZAt9G7JQPcXqqxeTmc_eaQ",
  authDomain: "new-chat-app-b6b76.firebaseapp.com",
  projectId: "new-chat-app-b6b76",
  storageBucket: "new-chat-app-b6b76.appspot.com",
  messagingSenderId: "953293312005",
  appId: "1:953293312005:web:c3fd50dd8269df5f08cc6c",
  measurementId: "G-9FG4F96BWG",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

export const storage = getStorage(app);
const db = app.firestore();
const auth = firebase.auth();

export { db, auth };

// export const app = initializeApp(firebaseConfig);
// export const auth = firebase.auth();
// export const storage = getStorage();
// export const db = initializeFirestore(app, {
//   experimentalForceLongPolling: true,
// });

// export function signIn(email, password) {
//   return;
//   auth.signInWithEmailAndPassword(email, password);
// }

// export function signUp(email, password) {
//   return createUserWithEmailAndPassword(auth, email, password);
// }
