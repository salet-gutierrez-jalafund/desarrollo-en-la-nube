import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Header } from "./components/common/Header";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import { GenreList } from "./components/Genre/GenreList";
import { GenreForm } from "./components/Genre/GenreForm";
import { ArtistList } from "./components/Artist/ArtistList";
import { ArtistForm } from "./components/Artist/ArtistForm";
import { SongList } from "./components/Song/SongList";
import { SongForm } from "./components/Song/SongForm";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<GenreList />} />
          <Route path="/genres" element={<GenreList />} />
          <Route path="/genres/new" element={<GenreForm />} />
          <Route path="/genres/edit/:id" element={<GenreForm />} />
          <Route path="/genres/:genreId" element={<ArtistList />} />
          <Route path="/genres/:genreId/artists/new" element={<ArtistForm />} />
          <Route path="/genres/:genreId/artists/edit/:id" element={<ArtistForm />} />
          <Route path="/artists/:artistId" element={<SongList />} />
          <Route path="/artists/:artistId/songs/new" element={<SongForm />} />
          <Route path="/artists/:artistId/songs/edit/:id" element={<SongForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}