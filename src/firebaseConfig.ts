import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC93cVmWGYpErCjPGVNERmV5hvpOTeFklU",
  authDomain: "ready-set-goal-7b39c.firebaseapp.com",
  projectId: "ready-set-goal-7b39c",
  storageBucket: "ready-set-goal-7b39c.appspot.com",
  messagingSenderId: "842569443343",
  appId: "1:842569443343:web:aa96924e610e0eda531b7a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}
export function signOut(): void {
  auth.signOut();
}

export const storage = getStorage(app);
