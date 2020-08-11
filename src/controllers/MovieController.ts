import { Request, Response } from "express";
import * as HTTPStatus from "http-status";
import { Context } from "../Context";
import { responseErrorHandler } from "../errorHandlerApi";
import { MissingArgumentError } from "../errors";
import { IMovieTranslation } from "../types";
import movieTranslationService from "./../services/MovieTranslationService";

class MovieController {
  /**
   * Get movie with all translates
   *
   * @export
   * @param {Request} req
   * @param {Response} res
   */
  async getMovie(req: Request, res: Response) {
    const { movieId } = req.params;
    let data: IMovieTranslation;

    if (!movieId) {
      throw new MissingArgumentError("Missing argument: 'movieId'");
    }

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
      data = await movieTranslationService.persistMovieTranslationFromExternalApi(parseInt(movieId, 10));
    }

    try {
      res.status(HTTPStatus.OK).json({
        data,
        message: "OK",
      });
    } catch (err) {
      console.error(err);
      responseErrorHandler(err, res);
    }
  }
}
export default new MovieController();
