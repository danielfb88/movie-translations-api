import { Request, Response } from "express";
import movieController from "../controllers/MovieController";

class MovieRoute {
  /**
   * Get Movie with all translations
   *
   * @param {Request} req
   * @param {Response} res
   * @returns
   * @memberof MovieRoute
   */
  async getMovie(req: Request, res: Response) {
    return movieController.getMovie(req, res);
  }
}

export default new MovieRoute();
