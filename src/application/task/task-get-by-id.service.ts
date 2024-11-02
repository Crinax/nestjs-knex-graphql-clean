import { GetTaskByIdQuery } from 'src/core/task/ports/primary/queries/get-task-by-id.query';
import { GetTaskByIdResponse } from 'src/core/task/ports/primary/queries/responses';
import { TaskLoaderByIdPort } from 'src/core/task/ports/secondary/task-loader-id.port';

export class TaskGetByIdService implements GetTaskByIdQuery {
  constructor(private readonly loadPort: TaskLoaderByIdPort) {}

  async getById(id: number): Promise<GetTaskByIdResponse | null> {
    const task = await this.loadPort.loadById(id);

    if (!task) {
      return null;
    }

    return {
      id: task.id,
      name: task.name,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
