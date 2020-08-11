import { Request, Response } from "express";
import * as HTTPStatus from "http-status";
import { Context } from "../Context";
import { responseErrorHandler } from "../errorHandlerApi";
import movieTranslationService from "../services/MovieTranslationsService";
import { IMovieTranslations } from "../types";

class MovieTranslationsController {
  /**
   * Get movie with all translations
   *
   * @export
   * @param {Request} req
   * @param {Response} res
   */
  async getMovieTranslations(req: Request, res: Response) {
    const { movieId } = req.params;
    let data: IMovieTranslations;

    try {
      const localMovie = await Context.getInstance().db.movies.findOne({
        where: {
          apiMovieId: movieId,
        },
      });

      if (localMovie) {
        data = {
          movie: localMovie,
          translations: await Context.getInstance().db.translations.find({ where: { movieId: localMovie.id } }),
        };
      } else {
        data = await movieTranslationService.persistMovieTranslationsFromExternalApi(parseInt(movieId, 10));
      }

      res.status(HTTPStatus.OK).json({
        data,
        message: "OK",
      });
    } catch (err) {
      responseErrorHandler(err, res);
    }
  }
}
export default new MovieTranslationsController();
