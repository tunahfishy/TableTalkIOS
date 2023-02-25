import {
  getFirestore,
  setDoc,
  doc,
  DocumentReference,
  collection,
  CollectionReference,
  addDoc,
} from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

export interface PostObject {
  content: string;
  author: string;
  comments: string[];
  likes: string[];
  // timestamp:
}

export default function addToCollection(item_path: string, data: PostObject) {
  const collectionRef: CollectionReference = collection(db, item_path);
  addDoc(collectionRef, data);
}
