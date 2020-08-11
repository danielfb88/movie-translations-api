import App from "../../src/App";
import { IContext } from "../../src/Context";
import { IMovieTranslation } from "../../src/types";
import { makeCtx } from "../helpers";
const supertest = require("supertest");

const app = App;
const request = supertest;

let ctx: IContext;

describe("MovieTranslates Integration tests", () => {
  beforeAll(() => {
    ctx = makeCtx({});
  });

  beforeEach(async () => {
    await ctx.db.movies.delete({});
    await ctx.db.translations.delete({});
  });

  describe("GET /api/movie-translates/:movieId", () => {
    const movieId = 550; // Fight Club
    const endpoint = `/api/movie-translates/${movieId}`;

    test("Get Movie and translations by ID", done => {
      request(app)
        .get(endpoint)
        .end((error: Error, res: any) => {
          const movieTranslation: IMovieTranslation = res.body.data;

          expect(res.status).toEqual(200);

          expect(movieTranslation.movie.originalTitle).toEqual("Fight Club");
          expect(movieTranslation.translations).not.toBeUndefined();

          done();
        });
    });
  });
});
