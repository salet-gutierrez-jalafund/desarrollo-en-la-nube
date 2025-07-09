import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import { uploadToCloudinary } from "./cloudinary";
import type { Genre } from "../types";

export const addGenre = async (name: string, image: File) => {
  const { url, publicId } = await uploadToCloudinary(image, "image");
  const genreRef = await addDoc(collection(db, "genres"), {
    name,
    imageUrl: url,
    imagePublicId: publicId,
  });
  return { id: genreRef.id, name, imageUrl: url, imagePublicId: publicId };
};

export const getGenres = async (): Promise<Genre[]> => {
  const querySnapshot = await getDocs(collection(db, "genres"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Genre[];
};

export const updateGenre = async (id: string, name: string, image?: File) => {
  const updates: Partial<Genre> = { name };
  if (image) {
    const { url, publicId } = await uploadToCloudinary(image, "image");
    updates.imageUrl = url;
    updates.imagePublicId = publicId;
  }
  await updateDoc(doc(db, "genres", id), updates);
};

export const deleteGenre = async (id: string) => {
  await deleteDoc(doc(db, "genres", id));
};