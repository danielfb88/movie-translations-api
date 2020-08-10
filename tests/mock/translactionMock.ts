/* eslint-disable @typescript-eslint/camelcase */
import * as faker from "faker";
import { ITranslaction } from "../../src/types";

/**
 * Mock translaction
 *
 * @export
 * @param {number} apiMovie
 * @returns {ITranslaction}
 */
export function mockTranslaction(movieId: string): ITranslaction {
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
