import { TaskHistoryEntity } from 'src/core/entities/task-history/task-history.entity';
import { TaskHistoryCreateResult } from 'src/core/ports/task-history/primary/responses';

export class TaskHistoryMapper {
  private constructor() {
    throw new Error('Cannot create instance of static class');
  }

  public static toCreateResult(
    taskHistory: TaskHistoryEntity,
  ): TaskHistoryCreateResult {
    return {
      id: taskHistory.id,
      historyType: taskHistory.historyType,
      createdAt: taskHistory.createdAt,
      fromState: taskHistory.fromState,
      toState: taskHistory.toState,
      taskId: taskHistory.task.id,
    };
  }
}
