export class UnitOfWorkError extends Error {
  constructor(
    public readonly errorType: string,
    message: string,
  ) {
    super(message);
    this.name = `[UnitOfWorkError::${errorType}]`;
  }
}
