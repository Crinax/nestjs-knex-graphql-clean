import { TaskResponse } from 'src/core/task/ports/primary/responses';

export abstract class GetAllTaskQuery {
  abstract getAll(): Promise<TaskResponse[]>;
}
