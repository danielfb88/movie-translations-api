import { Application } from "express";
import movieTranslationsRoute from "./routes/MovieTranslationRoute";

class Routes {
  /**
   * Initialize routes
   *
   * @param {Application} app
   * @memberof Routes
   */
  initRoutes(app: Application): void {
    app.route("/api/movie-translations/:movieId").get((req, res) => {
      movieTranslationsRoute.getMovieTranslations(req, res);
    });
  }
}

export default new Routes();
