import { UpdateTaskNameCommand } from '../../commands/tasks/update-name.command';
import { TaskResponse } from './responses';

export abstract class UpdateTaskNameUseCase {
  abstract update(command: UpdateTaskNameCommand): Promise<TaskResponse>;
}
