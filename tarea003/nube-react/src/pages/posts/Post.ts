/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import type { DocumentData } from "firebase/firestore";

export interface Post {
  id?: string;
  content: string;
  createdAt: Date | null;
  userId: string;
  userName: string;
}

export class Post {
  id?: string;
  content: string = "";
  createdAt: Date | null = null;
  userId: string = "";
  userName: string = "";
  
  static fromFirestore(id: string, data: DocumentData): Post {
    return {
      id: id,
      content: data.content || "",
      createdAt: data.createdAt ? data.createdAt.toDate() : null,
      userId: data.userId || "",
      userName: data.userName || "",
    };
  }
}