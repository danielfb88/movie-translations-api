import { Context } from "../Context";
import { NotFoundError } from "../errors";
import { getMovie, getTranslations } from "../integrations/themoviedb";
import { IMovie, IMovieTranslations, ITranslation } from "../types";

class MovieTranslationsService {
  /**
   * Persist movie and translations from external api
   *
   * @param {number} movieId
   * @memberof MovieService
   */
  async persistMovieTranslationsFromExternalApi(movieId: number): Promise<IMovieTranslations> {
    try {
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
    } catch (err) {
      if (err.response.status === 404) {
        throw new NotFoundError(`Movie not found: ${movieId}`);
      } else {
        throw err;
      }
    }
  }
}
export default new MovieTranslationsService();
