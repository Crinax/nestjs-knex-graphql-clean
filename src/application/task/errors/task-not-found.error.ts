export class TaskNotFoundError extends Error {
  constructor(public readonly taskId: number) {
    super(`Task ${taskId} not found`);
  }
}
