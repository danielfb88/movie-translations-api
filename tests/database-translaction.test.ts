import { IContext } from "../src/Context";
import { makeCtx } from "./helpers";
import { mockMovie } from "./mock/movieMock";
import { mockTranslaction } from "./mock/translactionMock";

let ctx: IContext;

describe("Database tests", () => {
  beforeAll(() => {
    ctx = makeCtx({});
  });

  beforeEach(async () => {
    await ctx.db.movie.delete({});
    await ctx.db.translaction.delete({});
  });

  describe("Translaction", () => {
    test("Should create a translaction", async done => {
      const createdMovie = await ctx.db.movie.save(mockMovie());

      const newTranslaction = mockTranslaction(createdMovie.id);
      const createdTranslaction = await ctx.db.translaction.save(newTranslaction);

      expect(createdTranslaction.movieId).toEqual(createdMovie.id);
      expect(createdTranslaction.englishName).toEqual(newTranslaction.englishName);
      expect(createdTranslaction.homepage).toEqual(newTranslaction.homepage);
      expect(createdTranslaction.iso31661).toEqual(newTranslaction.iso31661);
      expect(createdTranslaction.iso6391).toEqual(newTranslaction.iso6391);
      expect(createdTranslaction.name).toEqual(newTranslaction.name);
      expect(createdTranslaction.overview).toEqual(newTranslaction.overview);
      expect(createdTranslaction.title).toEqual(newTranslaction.title);
      done();
    });
  });
});
