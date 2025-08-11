// Utility for interacting with Firebase Realtime Database
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, update, remove } from "firebase/database";
import { firebaseConfig } from "../firebase";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const fetchPageContent = async (page: string) => {
  const pageRef = ref(db, `pages/${page}`);
  const snapshot = await get(pageRef);
  return snapshot.exists() ? snapshot.val() : null;
};

export const updatePageContent = async (page: string, data: any) => {
  const pageRef = ref(db, `pages/${page}`);
  await set(pageRef, data);
};

export const fetchAllPages = async () => {
  const pagesRef = ref(db, "pages");
  const snapshot = await get(pagesRef);
  return snapshot.exists() ? snapshot.val() : null;
};

export { db, ref, get, set, update, remove };
