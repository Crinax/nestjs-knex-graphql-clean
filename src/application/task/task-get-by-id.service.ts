import { TaskServiceMapper } from 'src/application/task/mappers';
import { GetTaskByIdQuery } from 'src/core/task/ports/primary/queries/get-task-by-id.query';
import { TaskResponse } from 'src/core/task/ports/primary/responses';
import { TaskLoaderByIdPort } from 'src/core/task/ports/secondary/task-loader-id.port';

export class TaskGetByIdService implements GetTaskByIdQuery {
  constructor(private readonly loadPort: TaskLoaderByIdPort) {}

  async getById(id: number): Promise<TaskResponse | null> {
    const task = await this.loadPort.loadById(id);

    if (!task) {
      return null;
    }

    return TaskServiceMapper.toResponse(task);
  }
}
