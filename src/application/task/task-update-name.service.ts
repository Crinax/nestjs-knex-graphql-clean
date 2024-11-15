import { TaskServiceMapper } from 'src/application/task/mappers';
import { UpdateTaskNameCommand } from 'src/core/task/ports/primary/commands/update-name.command';
import { TaskResponse } from 'src/core/task/ports/primary/responses';
import { UpdateTaskNameUseCase } from 'src/core/task/ports/primary/use-cases/update-task-name.use-case';
import { TaskUpdateNamePort } from 'src/core/task/ports/secondary/task-update-name.port';

export class TaskUpdateNameService implements UpdateTaskNameUseCase {
  constructor(private readonly updateNamePort: TaskUpdateNamePort) {}

  async update(command: UpdateTaskNameCommand): Promise<TaskResponse> {
    const result = await this.updateNamePort.updateName(
      command.id,
      command.name,
    );

    return TaskServiceMapper.toResponse(result);
  }
}
