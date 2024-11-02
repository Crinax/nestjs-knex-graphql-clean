import knex from 'knex';
import { join } from 'path';
import { Config } from 'src/infrastructure/common/config';
import { KnexDb } from 'src/infrastructure/knex/knex.infrastructure';

const knexDb = knex({
  client: 'sqlite3',
  connection: {
    filename: join(Config.rootPath, 'src/infrastructure/knex/dev.sqlite3'),
  },
});

export const defineDb = () => {
  return new KnexDb(knexDb);
};
