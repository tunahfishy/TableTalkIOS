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
  author: string;
  comments: string[];
  likes: string[];
  question: string;
  // timestamp:
}
