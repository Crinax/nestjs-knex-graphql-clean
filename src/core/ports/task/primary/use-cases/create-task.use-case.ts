import { CreateTaskCommand } from 'src/core/ports/task/primary/commands/create-task.command';
import { TaskResponse } from 'src/core/ports/task/primary/responses';

export abstract class CreateTaskUseCase {
  abstract create(command: CreateTaskCommand): Promise<TaskResponse>;
}
