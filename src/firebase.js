import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyApPUSm-jn77PEels78xElt7D7fGMtFcow",
    authDomain: "snapchat-clone-f528b.firebaseapp.com",
    projectId: "snapchat-clone-f528b",
    storageBucket: "snapchat-clone-f528b.appspot.com",
    messagingSenderId: "149713126732",
    appId: "1:149713126732:web:72ed90fc0c5208fa0b7be9"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()
const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, storage, provider }