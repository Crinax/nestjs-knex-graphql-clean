import { TaskServiceMapper } from 'src/application/task/mappers';
import { IEventBus } from 'src/core/abstracts/event-bus.abstract';
import { TaskEvents } from 'src/core/events/task.events';
import { TaskProps } from 'src/core/task/entities/taks.prop';
import { TaskEntity } from 'src/core/task/entities/task.entity';
import { CreateTaskCommand } from 'src/core/task/ports/primary/commands/create-task.command';
import { TaskResponse } from 'src/core/task/ports/primary/responses';
import { CreateTaskUseCase } from 'src/core/task/ports/primary/use-cases/create-task.use-case';
import { TaskSavePort } from 'src/core/task/ports/secondary/task-save.port';

export class TaskCreateService implements CreateTaskUseCase {
  constructor(
    private readonly savePort: TaskSavePort,
    private readonly eventBus?: IEventBus,
  ) {}

  async create(command: CreateTaskCommand): Promise<TaskResponse> {
    const task = TaskProps.from(0, command.name);
    const saved = await this.savePort.save(new TaskEntity(task));

    if (this.eventBus) {
      this.eventBus.publish({
        name: TaskEvents.TASK_CREATED,
        data: saved,
      });
    }

    return TaskServiceMapper.toResponse(saved);
  }
}
