import { Knex } from 'knex';
import { IDb } from 'src/infrastructure/knex/abstract/db.abstract';

export class KnexDb implements IDb<Knex> {
  private _connection: Knex;

  constructor(connection: Knex) {
    this._connection = connection;
  }

  async getConnection(): Promise<Knex> {
    return this._connection;
  }
}
