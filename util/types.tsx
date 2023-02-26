import { DocumentReference } from "firebase/firestore";

export interface Question {
  data: string;
  id: string;
}

export interface User {
  name: string;
  email: string;
  friends: User[];
}

export interface PostObject {
  content: string;
  author: DocumentReference;
  comments: string[];
  likes: string[];
  question: string;
  // id: string;
  // timestamp:
}

export interface CommentObject {
  post: DocumentReference;
  text: string;
  author: DocumentReference;
}
