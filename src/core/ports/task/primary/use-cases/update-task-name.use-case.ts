import { UpdateTaskNameCommand } from 'src/core/ports/task/primary/commands/update-name.command';
import { TaskResponse } from 'src/core/ports/task/primary/responses';

export abstract class UpdateTaskNameUseCase {
  abstract update(command: UpdateTaskNameCommand): Promise<TaskResponse>;
}
