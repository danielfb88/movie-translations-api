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

export interface IGetTranslactionsResponse {
  id: number;
  translations: Array<{
    iso_3166_1: string;
    iso_639_1: string;
    name: string;
    english_name: string;
    data: {
      homepage: string;
      overview: string;
      runtime: number;
      tagline: string;
      title: string;
    };
  }>;
}

export interface IGetMovieResponse {
  name: string;
}
