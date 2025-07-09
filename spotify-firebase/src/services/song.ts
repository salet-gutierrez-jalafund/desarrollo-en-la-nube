import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { uploadToCloudinary } from "./cloudinary";
import type { Song } from "../types";

export const addSong = async (name: string, artistId: string, audio: File) => {
  try {
    const { url, publicId } = await uploadToCloudinary(audio, "audio");
    const songRef = await addDoc(collection(db, "songs"), {
      name,
      artistId,
      audioUrl: url,
      audioPublicId: publicId,
    });
    return { id: songRef.id, name, artistId, audioUrl: url, audioPublicId: publicId };
  } catch (error) {
    console.error("Error en addSong:", error);
    throw error;
  }
};

export const getSongsByArtist = async (artistId: string): Promise<Song[]> => {
  const q = query(collection(db, "songs"), where("artistId", "==", artistId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Song[];
};

export const updateSong = async (id: string, name: string, artistId: string, audio?: File) => {
  const updates: Partial<Song> = { name, artistId };
  if (audio) {
    const { url, publicId } = await uploadToCloudinary(audio, "audio");
    updates.audioUrl = url;
    updates.audioPublicId = publicId;
  }
  await updateDoc(doc(db, "songs", id), updates);
};

export const deleteSong = async (id: string) => {
  await deleteDoc(doc(db, "songs", id));
};