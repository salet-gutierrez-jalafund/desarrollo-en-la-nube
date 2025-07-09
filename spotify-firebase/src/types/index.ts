export type Genre = {
  id: string;
  name: string;
  imageUrl: string;
  imagePublicId: string;
};

export type Artist = {
  id: string;
  name: string;
  genreId: string;
  imageUrl: string;
  imagePublicId: string;
};

export type Song = {
  id: string;
  name: string;
  artistId: string;
  audioUrl: string;
  audioPublicId: string;
};