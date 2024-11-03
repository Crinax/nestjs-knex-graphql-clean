import { TaskServiceMapper } from 'src/application/task/mappers';
import { TaskProps } from 'src/core/task/entities/taks.prop';
import { TaskEntity } from 'src/core/task/entities/task.entity';
import { CreateTaskCommand } from 'src/core/task/ports/primary/commands/create-task.command';
import { TaskResponse } from 'src/core/task/ports/primary/responses';
import { CreateTaskUseCase } from 'src/core/task/ports/primary/use-cases/create-task.use-case';
import { TaskSavePort } from 'src/core/task/ports/secondary/task-save.port';

export class TaskCreateService implements CreateTaskUseCase {
  constructor(private readonly savePort: TaskSavePort) {}

  async create(command: CreateTaskCommand): Promise<TaskResponse> {
    const task = TaskProps.from(0, command.name);
    const saved = await this.savePort.save(new TaskEntity(task));

    return TaskServiceMapper.toResponse(saved);
  }
}
