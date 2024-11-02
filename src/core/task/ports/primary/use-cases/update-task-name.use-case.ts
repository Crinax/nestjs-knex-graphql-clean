import { UpdateTaskNameCommand } from 'src/core/task/ports/primary/commands/tasks/update-name.command';
import { TaskResponse } from '../responsessk/ports/primary/use-cases/tasks/responses';

export abstract class UpdateTaskNameUseCase {
  abstract update(command: UpdateTaskNameCommand): Promise<TaskResponse>;
}
