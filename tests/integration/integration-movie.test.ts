import { IContext } from "../../src/Context";
import { makeCtx } from "../helpers";

let ctx: IContext;

describe("Integration tests", () => {
  beforeAll(() => {
    ctx = makeCtx({});
  });

  beforeEach(async () => {
    await ctx.db.movies.delete({});
    await ctx.db.translations.delete({});
  });

  describe("Movie", () => {
    test("Should get a movie", async done => {
      done();
    });
  });
});
