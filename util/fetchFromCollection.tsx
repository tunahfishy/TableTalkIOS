import {
    getFirestore,
    getDoc,
    doc,
    DocumentReference,
  } from "firebase/firestore";
  import { app } from "./firebase";
  
  const db = getFirestore(app);
  
  export default function fetchFromCollection(item_path: string) {
    const itemRef: DocumentReference = doc(db, item_path);
    const itemDoc = getDoc(itemRef);
    return itemDoc;
  }