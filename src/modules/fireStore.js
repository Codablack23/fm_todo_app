import {initializeApp} from 'firebase/app'
import {
    getFirestore,
    collection,
} from 'firebase/firestore'
const firebaseConfig = {

    apiKey: "AIzaSyACTFEmh7xXiELXMKt36dYIe5aA6XRSndc",
  
    authDomain: "todos-1a24f.firebaseapp.com",
  
    projectId: "todos-1a24f",
  
    storageBucket: "todos-1a24f.appspot.com",
  
    messagingSenderId: "411610638864",
  
    appId: "1:411610638864:web:ec5f972a2e5ecc20097895",
  
    measurementId: "G-LVEBMEQNF7"
  
  };


initializeApp(firebaseConfig)

const db = getFirestore()
const collectionRef = collection(db,"todos")

export const config={
    collectionRef,
    db
}


