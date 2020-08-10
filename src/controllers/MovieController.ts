import { Request, Response } from "express";
import * as HTTPStatus from "http-status";
import { Context } from "../Context";
import { responseErrorHandler } from "../errorHandlerApi";
import { MissingArgumentError } from "../errors";

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

    if (!movieId) {
      throw new MissingArgumentError("Missing argument: 'movieId'");
    }

    const localMovie = await Context.getInstance().db.movies.findOne({
      where: {
        apiMovieId: movieId,
      },
    });

    if (!localMovie) {
      const { movie, translations } = persistMovieTranslationFromExternalApi(movieId);
    }

    try {
      res.status(HTTPStatus.OK).json({
        data: listOffer,
        message: "OK",
      });
    } catch (err) {
      console.error(err);
      responseErrorHandler(err, res);
    }
  }
}
export default new MovieController();
