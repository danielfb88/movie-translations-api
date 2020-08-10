import { IContext } from "../src/Context";
import { makeCtx } from "./helpers";
import { mockMovie } from "./mock/movieMock";

let ctx: IContext;

describe("Database tests", () => {
  beforeAll(() => {
    ctx = makeCtx({});
  });

  beforeEach(async () => {
    await ctx.db.movie.delete({});
    await ctx.db.translaction.delete({});
  });

  describe("Movie", () => {
    test("Should create a movie", async done => {
      const movie = mockMovie();

      const createdMovie = await ctx.db.movie.save(movie);

      expect(movie.apiMovieId).toEqual(createdMovie.apiMovieId);
      expect(movie.originalTitle).toEqual(createdMovie.originalTitle);
      done();
    });
  });
});
