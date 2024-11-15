import { TaskServiceMapper } from 'src/application/task/mappers';
import { GetAllTaskQuery } from 'src/core/ports/task/primary/queries/get-all-task.query';
import { TaskResponse } from 'src/core/ports/task/primary/responses';
import { TaskLoaderPort } from 'src/core/ports/task/secondary/task-loader.port';

export class TaskGetAllService implements GetAllTaskQuery {
  constructor(private readonly port: TaskLoaderPort) {}

  async getAll(): Promise<TaskResponse[]> {
    const tasks = await this.port.load();

    return tasks.map(TaskServiceMapper.toResponse);
  }
}
