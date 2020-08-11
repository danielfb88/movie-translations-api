import { Application } from "express";
import movieRoute from "./routes/MovieRoute";

class Routes {
  /**
   * Initialize routes
   *
   * @param {Application} app
   * @memberof Routes
   */
  initRoutes(app: Application): void {
    app.route("/api/movie-translates/:movieId").get((req, res) => {
      movieRoute.getMovie(req, res);
    });
  }
}

export default new Routes();
