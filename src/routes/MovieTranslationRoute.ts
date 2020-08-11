import { Request, Response } from "express";
import movieTranslationsController from "../controllers/MovieTranslationsController";

class MovieTranslationsRoute {
  /**
   * Get Movie with all translations
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   * @memberof MovieRoute
   */
  async getMovieTranslations(req: Request, res: Response) {
    return movieTranslationsController.getMovieTranslations(req, res);
  }
}

export default new MovieTranslationsRoute();
