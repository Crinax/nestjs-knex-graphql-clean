import { TaskResponse } from 'src/core/ports/task/primary/responses';

export abstract class GetTaskByIdQuery {
  abstract getById(id: number): Promise<TaskResponse | null>;
}
