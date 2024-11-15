import { TaskServiceMapper } from 'src/application/task/mappers';
import { IEventBus } from 'src/core/abstracts/event-bus.abstract';
import { TaskEvents } from 'src/core/events/task.events';
import { CreateTaskCommand } from 'src/core/ports/task/primary/commands/create-task.command';
import { TaskResponse } from 'src/core/ports/task/primary/responses';
import { CreateTaskUseCase } from 'src/core/ports/task/primary/use-cases/create-task.use-case';
import { TaskSavePort } from 'src/core/ports/task/secondary/task-save.port';
import { TaskProps } from 'src/core/entities/task/taks.prop';
import { TaskEntity } from 'src/core/entities/task/task.entity';

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
