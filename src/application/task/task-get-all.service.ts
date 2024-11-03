import { TaskServiceMapper } from 'src/application/task/mappers';
import { GetAllTaskQuery } from 'src/core/task/ports/primary/queries/get-all-task.query';
import { TaskResponse } from 'src/core/task/ports/primary/responses';
import { TaskLoaderPort } from 'src/core/task/ports/secondary/task-loader.port';

export class TaskGetAllService implements GetAllTaskQuery {
  constructor(private readonly port: TaskLoaderPort) {}

  async getAll(): Promise<TaskResponse[]> {
    const tasks = await this.port.load();

    return tasks.map(TaskServiceMapper.toResponse);
  }
}
