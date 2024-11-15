import { TaskServiceMapper } from 'src/application/task/mappers';
import { GetTaskByIdQuery } from 'src/core/ports/task/primary/queries/get-task-by-id.query';
import { TaskResponse } from 'src/core/ports/task/primary/responses';
import { TaskLoaderByIdPort } from 'src/core/ports/task/secondary/task-loader-id.port';
import { IdRule } from 'src/core/rules/id.rule';

export class TaskGetByIdService implements GetTaskByIdQuery {
  constructor(private readonly loadPort: TaskLoaderByIdPort) {}

  async getById(id: number): Promise<TaskResponse | null> {
    const idRule = new IdRule(id);

    idRule.check();

    const task = await this.loadPort.loadById(idRule);

    if (!task) {
      return null;
    }

    return TaskServiceMapper.toResponse(task);
  }
}
