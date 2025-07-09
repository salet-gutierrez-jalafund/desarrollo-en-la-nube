import { logEvent } from "firebase/analytics";
import { analytics } from "./firebase";

export const logViewGenre = (genreId: string) => {
  logEvent(analytics, "view_genre", { genre_id: genreId });
};

export const logViewArtist = (artistId: string) => {
  logEvent(analytics, "view_artist", { artist_id: artistId });
};

export const logPlaySong = (songId: string) => {
  logEvent(analytics, "play_song", { song_id: songId });
};