import * as $ from "jquery";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Logged In");
    $(".login-input").html(`
        <h1>Welcome Back, ${user.email}</h1>

    `);
  } else {
    console.log("Logged Out");
    $(".login-input").append(`

        `);
  }
});

export function createAccount(email, pw, fn, ln) {
  createUserWithEmailAndPassword(auth, email, pw)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      user;
      updateProfile(auth.currentUser, {
        displayName: `${fn} ${ln}`,
      })
        .then(() => {
          console.log("user full name " + user.displayName);
        })
        .catch((error) => {
          console.log("error ", error.message);
        });
      console.log("create", user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error" + errorMessage);
      // ..
    });
}

export function signUserOut() {
  signOut(auth)
    .then(() => {
      console.log("signed out");
    })
    .catch((error) => {
      console.log("error", error.message);
    });
}

export function signUserIn(email, pw) {
  signInWithEmailAndPassword(auth, email, pw)
    .then((userCredential) => {
      console.log("Signed In");
    })
    .catch((error) => {
      console.log("error", error.message);
    });
}
