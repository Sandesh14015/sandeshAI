import { doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";

export async function saveUserProfile(uid: string, data: Record<string, unknown>) {
  await setDoc(doc(db, "users", uid), data, { merge: true });
}

export async function getUserProfile(uid: string) {
  const snapshot = await getDoc(doc(db, "users", uid));
  return snapshot.exists() ? snapshot.data() : null;
}

export async function createCollectionItem(collectionPath: string, data: Record<string, unknown>) {
  const ref = collection(db, collectionPath);
  return addDoc(ref, data);
}
