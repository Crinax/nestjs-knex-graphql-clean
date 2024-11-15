import { TaskHistoryEntity } from 'src/core/entities/task-history/task-history.entity';
import { TaskHistoryProps } from 'src/core/entities/task-history/task-history.prop';
import { TaskHistoryLoadResponse } from 'src/infrastructure/knex/repositories/task-history/task-repository.response';
import { TaskRepositoryMapper } from 'src/infrastructure/knex/repositories/task/mappers/task-repository.mapper';

export class TaskHistoryRepositoryMapper {
  private constructor() {
    throw new Error('Cannot create instance of static class');
  }

  static toDomain(taskHistory: TaskHistoryLoadResponse): TaskHistoryEntity {
    const taskEntity = TaskRepositoryMapper.toDomain({
      id: taskHistory.task_id,
      name: taskHistory.task_name,
      created_at: taskHistory.task_created_at,
      updated_at: taskHistory.task_updated_at,
    });
    const props = TaskHistoryProps.from(
      taskHistory.id,
      taskEntity,
      taskHistory.type,
      taskHistory.from_state,
      taskHistory.to_state,
      new Date(taskHistory.created_at),
    );

    return new TaskHistoryEntity(props);
  }
}
