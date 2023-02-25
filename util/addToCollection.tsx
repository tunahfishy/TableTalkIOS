import {
  getFirestore,
  setDoc,
  doc,
  DocumentReference,
} from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

export interface DataObject {
  data: String,
};

export default function addToCollection(item_path: string, data: DataObject) {
  const itemRef: DocumentReference = doc(db, item_path);
  const itemDoc = setDoc(itemRef, data);
  return itemDoc;
}
