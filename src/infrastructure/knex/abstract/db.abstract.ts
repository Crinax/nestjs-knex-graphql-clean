export abstract class IDb<DbConnection = any> {
  abstract getConnection(): Promise<DbConnection>;
}
