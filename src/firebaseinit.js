import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgB1Xzs2GpuxDM3AAXCDHrqNMSW9dJroQ",
  authDomain: "edu-game-9e39e.firebaseapp.com",
  projectId: "edu-game-9e39e",
  storageBucket: "edu-game-9e39e.appspot.com",
  messagingSenderId: "385882992367",
  appId: "1:385882992367:web:40331abb07a4b43b73351a",
  measurementId: "G-7FKE46003G"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const whenSignedIn = $('[id=whenSignedIn]');
const whenSignedOut = $('[id=whenSignedOut]');

const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');

const userDetails = document.getElementById('userDetails');

whenSignedIn.hide();
whenSignedOut.hide();

const provider = new GoogleAuthProvider();

/// Sign in event handlers

signInBtn.onclick = () => signInWithPopup(auth, provider);

signOutBtn.onclick = () => signOut(auth);

onAuthStateChanged(auth, (user) => {
    if (user) {
        // signed in
        whenSignedIn.show();
        whenSignedOut.hide();
   //     userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`;

    } else {
        // not signed in
        whenSignedIn.hide();
        whenSignedOut.show();
    //    userDetails.innerHTML = '';
    }
});


