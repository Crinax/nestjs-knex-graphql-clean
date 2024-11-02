import { UpdateTaskNameCommand } from 'src/core/task/ports/primary/commands/tasks/update-name.command';
import { TaskResponse } from 'src/core/task/ports/primary/use-cases/responses';

export abstract class UpdateTaskNameUseCase {
  abstract update(command: UpdateTaskNameCommand): Promise<TaskResponse>;
}
