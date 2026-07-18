import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  type FirestoreDataConverter,
} from "firebase/firestore";
import { db } from "@/firebase";

export type FirestoreDocument = Record<string, unknown>;

async function createDocument(path: string[], data: FirestoreDocument) {
  const ref = doc(db, ...path);
  await setDoc(ref, data, { merge: true });
  return ref;
}

async function readDocument(path: string[]) {
  const ref = doc(db, ...path);
  const snapshot = await getDoc(ref);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

async function readCollection(path: string[], filters?: Array<{ field: string; op: "=="; value: unknown }>) {
  let q = query(collection(db, ...path));

  if (filters?.length) {
    q = query(
      collection(db, ...path),
      ...filters.map((filter) => where(filter.field, filter.op, filter.value)),
    );
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
}

async function updateDocument(path: string[], data: FirestoreDocument) {
  const ref = doc(db, ...path);
  await updateDoc(ref, data);
  return ref;
}

async function deleteDocument(path: string[]) {
  const ref = doc(db, ...path);
  await deleteDoc(ref);
}

export const usersService = {
  async saveUser(uid: string, data: FirestoreDocument) {
    return createDocument(["users", uid], data);
  },

  async getUser(uid: string) {
    return readDocument(["users", uid]);
  },
};

export const conversationsService = {
  async createConversation(uid: string, conversation: FirestoreDocument) {
    return createDocument(["users", uid, "conversations", conversation.id as string], conversation);
  },

  async getConversation(uid: string, conversationId: string) {
    return readDocument(["users", uid, "conversations", conversationId]);
  },

  async listConversations(uid: string) {
    return readCollection(["users", uid, "conversations"]);
  },
};

export const messagesService = {
  async addMessage(uid: string, conversationId: string, message: FirestoreDocument) {
    const ref = await addDoc(collection(db, "users", uid, "conversations", conversationId, "messages"), message);
    return ref;
  },

  async listMessages(uid: string, conversationId: string) {
    return readCollection(["users", uid, "conversations", conversationId, "messages"]);
  },
};

export const personalityService = {
  async savePersonality(uid: string, data: FirestoreDocument) {
    return createDocument(["users", uid, "personality"], data);
  },

  async getPersonality(uid: string) {
    return readDocument(["users", uid, "personality"]);
  },
};

export const memoriesService = {
  async saveMemory(uid: string, memoryId: string, data: FirestoreDocument) {
    return createDocument(["users", uid, "memories", memoryId], data);
  },

  async listMemories(uid: string) {
    return readCollection(["users", uid, "memories"]);
  },

  async updateMemory(uid: string, memoryId: string, data: FirestoreDocument) {
    return updateDocument(["users", uid, "memories", memoryId], data);
  },

  async deleteMemory(uid: string, memoryId: string) {
    return deleteDocument(["users", uid, "memories", memoryId]);
  },
};

export const knowledgeService = {
  async saveKnowledgeItem(uid: string, itemId: string, data: FirestoreDocument) {
    return createDocument(["users", uid, "knowledge", itemId], data);
  },

  async listKnowledge(uid: string) {
    return readCollection(["users", uid, "knowledge"]);
  },

  async updateKnowledgeItem(uid: string, itemId: string, data: FirestoreDocument) {
    return updateDocument(["users", uid, "knowledge", itemId], data);
  },

  async deleteKnowledgeItem(uid: string, itemId: string) {
    return deleteDocument(["users", uid, "knowledge", itemId]);
  },
};
