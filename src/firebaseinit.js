import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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

const auth = getAuth(app);

onAuthStateChanged(auth, user => {
    if(user != null){
        console.log("Logged In Succesfully");
    }
    else {
        console.log("Not Logged In!");
    }
})


