import { Context } from "../Context";
import { getMovie, getTranslations } from "../integrations/themoviedb";
import { IMovie, ITranslation } from "../types";

class MovieTranslationService {
  /**
   * Persist movie and translations from external api
   *
   * @param {number} movieId
   * @memberof MovieService
   */
  async persistMovieTranslationFromExternalApi(movieId: number) {
    const externMovie = await getMovie(movieId);

    const createdMovie = await Context.getInstance().db.movies.save({
      apiMovieId: externMovie.id,
      originalTitle: externMovie.original_title,
    });

    const translationsResponse = await getTranslations(movieId);
    const { translations } = translationsResponse;

    const translationsReturn: ITranslation[] = [];

    for (const translation of translations) {
      translationsReturn.push(
        await Context.getInstance().db.translations.save({
          englishName: translation.english_name,
          homepage: translation.data.homepage,
          iso31661: translation.iso_3166_1,
          iso6391: translation.iso_639_1,
          movieId: createdMovie.id,
          name: translation.name,
          overview: translation.data.overview,
          title: translation.data.title,
        }),
      );
    }

    return {
      movie: {
        apiMovieId: movieId,
        originalTitle: createdMovie.originalTitle,
      } as IMovie,
      translations: translationsReturn,
    };
  }
}
export default new MovieTranslationService();
