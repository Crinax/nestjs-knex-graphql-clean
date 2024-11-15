import { TaskHistoryEntity } from 'src/core/entities/task-history/task-history.entity';

export abstract class TaskHistorySavePort {
  abstract save(history: TaskHistoryEntity): Promise<TaskHistoryEntity>;
}
