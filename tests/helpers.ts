import { randomBytes } from "crypto";
import * as faker from "faker";
import "reflect-metadata";
import { Connection, createConnection, getConnectionOptions } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import App from "../src/App";
import { Context, IContext } from "../src/Context";
import { MovieRepository, TranslationRepository } from "../src/repositories";

process.env.TZ = "UTC";

const FAKER_SEED = parseInt(process.env.FAKER_SEED ?? "0", 10);

console.log(`FAKER SEED: ${FAKER_SEED}`);

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer K>
    ? ReadonlyArray<DeepPartial<K>>
    : T[P] extends Function
    ? T[P]
    : DeepPartial<T[P]>;
};

const databaseName = `test_${randomBytes(8).toString("hex")}`;
let masterConn: Connection;
let connection: Connection;

beforeAll(async () => {
  faker.seed(FAKER_SEED);

  try {
    masterConn = await createConnection({
      ...(await getConnectionOptions()),
      name: "master",
    });

    await masterConn.query(`CREATE DATABASE ${databaseName};`);

    connection = await createConnection({
      ...((await getConnectionOptions()) as PostgresConnectionOptions),
      database: databaseName,
      logging: false,
      migrationsRun: true,
    });

    Context.createContext({ app: App, connection });
  } catch (err) {
    process.stderr.write(`${err}\n${err.stack || ""}\n`);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
}, 60000);

afterAll(async () => {
  await connection.close();
  await masterConn.query(`DROP DATABASE ${databaseName};`);
  await masterConn.close();
});

export function makeCtx(ctx: DeepPartial<IContext>) {
  return {
    captureException: () => null,
    db: {
      connection,
      movies: connection.getCustomRepository(MovieRepository),
      translations: connection.getCustomRepository(TranslationRepository),
    },
    ...ctx,
  } as IContext;
}
