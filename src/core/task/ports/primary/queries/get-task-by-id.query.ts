import { TaskResponse } from 'src/core/task/ports/primary/responses';

export abstract class GetTaskByIdQuery {
  abstract getById(id: number): Promise<TaskResponse | null>;
}
