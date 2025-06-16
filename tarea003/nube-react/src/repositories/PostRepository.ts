import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { firebaseDb } from "../firebase/FirebaseConfig";
import { Post } from "../pages/posts/Post";

export class PostRepository {
  collectionName = "posts";

  private getCollectionRef() {
    return collection(firebaseDb, this.collectionName);
  }

  addPost(post: Post): Promise<Post> {
    return new Promise((resolve, reject) => {
      if (post.id) {
        delete post.id;
      }
      addDoc(collection(firebaseDb, this.collectionName), {
        ...post,
        createdAt: new Date(),
      })
        .then((docRef) => {
          resolve({
            ...post,
            id: docRef.id,
            createdAt: new Date(),
          });
        })
        .catch((e) => {
          console.error("Error adding post: ", e);
          reject(e);
        });
    });
  }

  getPostsByUserId(userId: string): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      const postsQuery = query(
        this.getCollectionRef(),
        where("userId", "==", userId)
      );
      getDocs(postsQuery)
        .then((querySnapshot) => {
          const posts: Post[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            posts.push(Post.fromFirestore(doc.id, data));
          });
          resolve(posts);
        })
        .catch((error) => {
          console.error("Error getting posts:", error);
          reject(error);
        });
    });
  }

  deletePost(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const postDoc = doc(firebaseDb, this.collectionName, id);
      deleteDoc(postDoc)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          console.error("Error deleting post: ", error);
          reject(error);
        });
    });
  }
}