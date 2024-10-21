export default {
  client: 'sqlite3',
  connection: {
    filename: 'src/infrastructure/knex/db.sqlite3',
  },
  migration: {
    extension: 'ts',
    directory: 'src/infrastructure/knex/migrations',
  },
};
