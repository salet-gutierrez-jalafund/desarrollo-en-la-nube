import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { uploadToCloudinary } from "./cloudinary";
import type { Artist } from "../types";

export const addArtist = async (name: string, genreId: string, image: File) => {
  const { url, publicId } = await uploadToCloudinary(image, "image");
  const artistRef = await addDoc(collection(db, "artists"), {
    name,
    genreId,
    imageUrl: url,
    imagePublicId: publicId,
  });
  return { id: artistRef.id, name, genreId, imageUrl: url, imagePublicId: publicId };
};

export const getArtistsByGenre = async (genreId: string): Promise<Artist[]> => {
  const q = query(collection(db, "artists"), where("genreId", "==", genreId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Artist[];
};

export const updateArtist = async (id: string, name: string, genreId: string, image?: File) => {
  const updates: Partial<Artist> = { name, genreId };
  if (image) {
    const { url, publicId } = await uploadToCloudinary(image, "image");
    updates.imageUrl = url;
    updates.imagePublicId = publicId;
  }
  await updateDoc(doc(db, "artists", id), updates);
};

export const deleteArtist = async (id: string) => {
  await deleteDoc(doc(db, "artists", id));
};