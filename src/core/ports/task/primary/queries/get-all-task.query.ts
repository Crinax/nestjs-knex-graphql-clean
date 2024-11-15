import { TaskResponse } from 'src/core/ports/task/primary/responses';

export abstract class GetAllTaskQuery {
  abstract getAll(): Promise<TaskResponse[]>;
}
