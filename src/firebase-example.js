// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app"

// Add the Firebase products that you want to use
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: ''
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase
