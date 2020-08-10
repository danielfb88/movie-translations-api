/* eslint-disable @typescript-eslint/camelcase */
import * as faker from "faker";
import { ITranslation } from "../../src/integrations/themoviedb/theMovieDBTypes";

/**
 * Mock translation
 *
 * @export
 * @param {number} apiMovie
 * @returns {ITranslation}
 */
export function mockTranslation(movieId: string): ITranslation {
  return {
    englishName: faker.random.words(),
    homepage: faker.internet.domainName(),
    iso31661: "PT",
    iso6391: "pt",
    movieId,
    name: faker.random.words(),
    overview: faker.random.words(),
    title: faker.random.words(),
  };
}
