import { DocumentReference } from "firebase/firestore";

export interface Question {
  data: string;
  id: string;
}

export interface User {
  name: string;
  email: string;
  friends: string[];
}

export interface PostObject {
  content: string;
  author: string;
  comments: string[];
  likes: string[];
  question: string;
  // timestamp:
}

export interface CommentObject {
  post: string;
  text: string;
  author: string;
}
