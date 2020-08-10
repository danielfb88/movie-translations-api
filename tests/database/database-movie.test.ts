import { IContext } from "../../src/Context";
import { makeCtx } from "../helpers";

let ctx: IContext;

describe("Database tests", () => {
  beforeAll(() => {
    ctx = makeCtx({});
  });

  beforeEach(async () => {
    await ctx.db.movies.delete({});
    await ctx.db.translations.delete({});
  });

  describe("Movie", () => {
    test("Should create a movie", async done => {
      console.log("test");
      done();
    });
  });
});
