import {
  getFirestore,
  collection,
  CollectionReference,
  addDoc,
} from "firebase/firestore";
import { app } from "./firebase";
import { PostObject, User, CommentObject } from "./types";

const db = getFirestore(app);

export default function addToCollection(item_path: string, data: PostObject | User | CommentObject) {
  const collectionRef: CollectionReference = collection(db, item_path);
  addDoc(collectionRef, data);
}
