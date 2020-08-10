/* eslint-disable @typescript-eslint/camelcase */
import * as faker from "faker";
import { IMovie } from "../../src/types";

/**
 * Mock Movie
 *
 * @export
 * @param {{ apiMovieId: number }} args
 * @returns {IMovie}
 */
export function mockMovie(apiMovieId?: number): IMovie {
  return {
    apiMovieId: apiMovieId || faker.random.number(),
    originalTitle: faker.random.words(),
  };
}
