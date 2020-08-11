import App from "../../src/App";
import { IContext } from "../../src/Context";
import { IMovieTranslations } from "../../src/types";
import { makeCtx } from "../helpers";
const supertest = require("supertest");

const app = App;
const request = supertest;

let ctx: IContext;

describe("MovieTranslations Integration tests", () => {
  beforeAll(() => {
    ctx = makeCtx({});
  });

  beforeEach(async () => {
    await ctx.db.translations.delete({});
    await ctx.db.movies.delete({});
  });

  describe("GET /api/movie-translations/:movieId", () => {
    const movieId = 550; // Fight Club
    const endpoint = "/api/movie-translations";

    test("Persist and return Movie and translations getting from external API", done => {
      request(app)
        .get(`${endpoint}/${movieId}`)
        .end((error: Error, res: any) => {
          const movieTranslation: IMovieTranslations = res.body.data;

          expect(res.status).toEqual(200);

          expect(movieTranslation.movie.originalTitle).toEqual("Fight Club");
          expect(movieTranslation.translations).not.toBeUndefined();

          done();
        });
    });

    test("Get Movie and translations getting from local database", done => {
      // First call
      request(app)
        .get(`${endpoint}/${movieId}`)
        .end((error: Error, res: any) => {
          // Second call
          request(app)
            .get(`${endpoint}/${movieId}`)
            .end((error2: Error, res2: any) => {
              const movieTranslation: IMovieTranslations = res2.body.data;

              expect(res2.status).toEqual(200);

              expect(movieTranslation.movie.originalTitle).toEqual("Fight Club");
              expect(movieTranslation.translations).not.toBeUndefined();

              done();
            });
        });
    });

    test("Should return status 404 if not found movie", done => {
      request(app)
        .get(`${endpoint}/12345567`)
        .end((error: Error, res: any) => {
          expect(res.status).toEqual(404);

          done();
        });
    });
  });
});
