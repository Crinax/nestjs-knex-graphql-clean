import { CreateTaskCommand } from 'src/core/task/ports/primary/commands/create-task.command';
import { TaskResponse } from 'src/core/task/ports/primary/responses';

export abstract class CreateTaskUseCase {
  abstract create(command: CreateTaskCommand): Promise<TaskResponse>;
}
