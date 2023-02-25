export interface Question {
  data: string;
  id: string;
}

export interface User {
  name: string;
  email: string;
}

export interface Post {
  id: any;
  data: any;
}

export interface PostObject {
  content: string;
  author: string;
  comments: string[];
  likes: string[];
  question: string;
  // timestamp:
}
