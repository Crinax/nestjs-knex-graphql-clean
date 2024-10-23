export abstract class IDb<DbConnection = any> {
  abstract getConnection(): Promise<DbConnection>;
}

export abstract class IRepository<Database> {
  abstract useDatabase(database: Database): IRepository<Database>;
}

export type Work<WorkResult = any, RepositoryMap = object, UoW = any> = (
  unitOfWork: UoW,
  repositories: RepositoryMap,
) => Promise<WorkResult>;

export abstract class IUnitOfWork<Database = any, RepositoryMap = object> {
  abstract use<K extends string, R extends IRepository<Database>>(
    key: K,
    repository: R,
  ): IUnitOfWork<Database, { [I in K]: R } & RepositoryMap>;

  abstract begin(): Promise<IUnitOfWork<Database, RepositoryMap>>;

  abstract end(): Promise<IUnitOfWork<Database, RepositoryMap>>;

  abstract commit(): Promise<IUnitOfWork<Database, RepositoryMap>>;

  abstract rollback(): Promise<IUnitOfWork<Database, RepositoryMap>>;

  abstract exec<Result>(
    work: Work<Result, RepositoryMap, IUnitOfWork<Database, RepositoryMap>>,
  ): Promise<Result>;
}
