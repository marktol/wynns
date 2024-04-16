import { initializeApp } from "firebase/app";
import {
  User,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  writeBatch,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: "831221351615",
  appId: "1:831221351615:web:73dffb397da8844e44320a",
};

initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore();

export const storage = getStorage();

export const uploadImageData = async (img: any) => {
  const imageRef = ref(storage, `assets/${img.name}`);
  await uploadBytes(imageRef, img);

  const downloadURLPromise = getDownloadURL(imageRef);
  const downloadURL = await downloadURLPromise;

  return downloadURL;
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (
  callback: (user: User | null) => void
) => onAuthStateChanged(auth, callback);

export const addCollectionAndDocuments = async (
  collectionKey: string,
  objectsToAdd: any[],
  idField: string
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((o) => {
    const docRef = doc(collectionRef, o[idField].toString());
    batch.set(docRef, o);
  });

  await batch.commit();
};

export const getCollectionAndDocuments = async (collectionKey: string) => {
  const collectionRef = collection(db, collectionKey);
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((d) => d.data());
};

export const getDocumentById = async (
  collectionKey: string,
  documentId: string
) => {
  const docRef = doc(db, collectionKey, documentId);

  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    return docSnapshot.data();
  } else {
    console.log("Документ не найден!");
    return null;
  }
};
