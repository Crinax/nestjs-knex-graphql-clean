import { TaskNotFoundError } from 'src/application/task/errors/task-not-found.error';
import { TaskServiceMapper } from 'src/application/task/mappers';
import { IEventBus } from 'src/core/abstracts/event-bus.abstract';
import { TaskEvents } from 'src/core/events/task.events';
import { UpdateTaskNameCommand } from 'src/core/ports/task/primary/commands/update-name.command';
import { TaskResponse } from 'src/core/ports/task/primary/responses';
import { UpdateTaskNameUseCase } from 'src/core/ports/task/primary/use-cases/update-task-name.use-case';
import { TaskLoaderByIdPort } from 'src/core/ports/task/secondary/task-loader-id.port';
import { TaskUpdateNamePort } from 'src/core/ports/task/secondary/task-update-name.port';

export class TaskUpdateNameService implements UpdateTaskNameUseCase {
  constructor(
    private readonly loadByIdPort: TaskLoaderByIdPort,
    private readonly updateNamePort: TaskUpdateNamePort,
    private readonly eventBus?: IEventBus,
  ) {}

  async update(command: UpdateTaskNameCommand): Promise<TaskResponse> {
    const task = await this.loadByIdPort.loadById(command.id);

    if (!task) {
      throw new TaskNotFoundError(command.id.value);
    }

    const result = await this.updateNamePort.updateName(
      command.id,
      command.name,
    );

    if (this.eventBus) {
      this.eventBus.publish({
        name: TaskEvents.TASK_NAME_UPDATED,
        data: {
          task: result,
          oldName: task.name,
        },
      });
    }

    return TaskServiceMapper.toResponse(result);
  }
}
