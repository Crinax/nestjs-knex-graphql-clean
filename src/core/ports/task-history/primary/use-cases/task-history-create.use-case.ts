import { TaskHistoryCreateCommand } from 'src/core/ports/task-history/primary/commands/task-history-create.command';
import { TaskHistoryCreateResult } from 'src/core/ports/task-history/primary/responses';

export abstract class TaskHistoryCreateUseCase {
  abstract create(
    command: TaskHistoryCreateCommand,
  ): Promise<TaskHistoryCreateResult>;
}
