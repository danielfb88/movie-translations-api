export interface IMovie {
  apiMovieId: number;
  originalTitle: string;
}

export interface ITranslation {
  movieId: string;
  iso31661: string;
  iso6391: string;
  name: string;
  englishName: string;
  title?: string;
  overview?: string;
  homepage?: string;
}

export interface IMovieTranslation {
  movie: IMovie;
  translations: ITranslation[];
}
