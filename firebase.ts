import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  browserLocalPersistence,
  setPersistence,
  type User,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: "select_account" });

async function persistSession() {
  await setPersistence(auth, browserLocalPersistence);
}

export const firebaseAuth = {
  async signInWithGoogle() {
    await persistSession();
    return signInWithPopup(auth, googleProvider);
  },

  async signInWithEmail(email: string, password: string) {
    await persistSession();
    return signInWithEmailAndPassword(auth, email, password);
  },

  async signUpWithEmail(email: string, password: string) {
    await persistSession();
    return createUserWithEmailAndPassword(auth, email, password);
  },

  async signOut() {
    return firebaseSignOut(auth);
  },

  listenToAuthChanges(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  },
};
