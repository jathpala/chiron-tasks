// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMejBYC4zPTfFbS1rMpTsiLx-vue576ts",
  authDomain: "chiron-tasks.firebaseapp.com",
  projectId: "chiron-tasks",
  storageBucket: "chiron-tasks.appspot.com",
  messagingSenderId: "1078217407913",
  appId: "1:1078217407913:web:4b3ce61f708276f50458b8"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

if (import.meta.env.CHIRON_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099")
  connectFirestoreEmulator(db, "localhost", 8080)
}
