import { Knex } from 'knex';
import { IDb, IRepository, IUnitOfWork, Work } from './abstract/db.abstract';

// const knexDb = knex({
//   client: 'sqlite3',
//   connection: {
//     filename: './db.sqlite3',
//   },
// });

export class KnexDb implements IDb<Knex> {
  private _connection: Knex;

  constructor(connection: Knex) {
    this._connection = connection;
  }

  async getConnection(): Promise<Knex> {
    return this._connection;
  }
}

export class UnitOfWork<RepositoryMap = object>
  implements IUnitOfWork<KnexDb, RepositoryMap>
{
  private _db: IDb<Knex>;
  private _tx: Knex.Transaction | null = null;
  private _repositories: RepositoryMap;

  private constructor(db: IDb<Knex>, repositories: RepositoryMap) {
    this._db = db;
    this._repositories = repositories;
  }

  use<K extends string, R extends IRepository<KnexDb>>(
    key: K,
    repository: R,
  ): IUnitOfWork<KnexDb, { [I in K]: R } & RepositoryMap> {
    return new UnitOfWork(this._db, {
      ...this._repositories,
      [key]: repository,
    } as { [I in K]: R } & RepositoryMap);
  }

  async begin(): Promise<IUnitOfWork<KnexDb, RepositoryMap>> {
    if (this._tx) {
      throw new Error('Transaction already started');
    }

    const connection = await this._db.getConnection();

    this._tx = await connection.transaction();

    return this;
  }

  async end(): Promise<IUnitOfWork<KnexDb, RepositoryMap>> {
    if (!this._tx) {
      throw new Error('Transaction not started');
    }

    this._tx = null;

    return this;
  }

  async commit(): Promise<IUnitOfWork<KnexDb, RepositoryMap>> {
    if (!this._tx) {
      throw new Error('Transaction not started');
    }

    await this._tx.commit();

    return this;
  }

  async rollback(): Promise<IUnitOfWork<KnexDb, RepositoryMap>> {
    if (!this._tx) {
      throw new Error('Transaction not started');
    }

    await this._tx.rollback();

    return this;
  }

  async exec<Result>(
    work: Work<Result, RepositoryMap, IUnitOfWork<KnexDb, RepositoryMap>>,
  ): Promise<Result> {
    if (!this._tx) {
      throw new Error('Transaction not started');
    }

    const proxy = new Proxy(this._repositories as object, {
      get: (target, prop) => {
        if (prop in target) {
          const repository = target[prop] as IRepository<KnexDb>;

          if (this._tx) {
            return repository.useDatabase(new KnexDb(this._tx));
          }
        }

        return undefined;
      },
    });

    try {
      await this.begin();

      const result = await work(this, proxy as RepositoryMap);

      await this.commit();
      return result;
    } catch (err) {
      await this.rollback();
      throw err;
    }
  }
}
