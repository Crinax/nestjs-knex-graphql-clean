import type { Knex } from 'knex';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/infrastructure/knex/dev.sqlite3',
    },
    migrations: {
      directory: './src/infrastructure/knex/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './src/infrastructure/knex/seeds',
    },
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: './src/infrastructure/knex/dev.sqlite3',
    },
    migrations: {
      directory: './src/infrastructure/knex/migrations',
      tableName: 'knex_migrations',
    },
  },
};

module.exports = config;
