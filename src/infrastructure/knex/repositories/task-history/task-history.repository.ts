import { TaskHistoryEntity } from 'src/core/entities/task-history/task-history.entity';
import { KnexDb } from 'src/infrastructure/knex/knex.infrastructure';
import { IdResponse } from 'src/infrastructure/knex/repositories/common/responses';
import { TaskHistoryRepositoryMapper } from 'src/infrastructure/knex/repositories/task-history/mappers/task-history-repository.mapper';
import { TaskHistoryLoadResponse } from 'src/infrastructure/knex/repositories/task-history/task-repository.response';

export class TaskHistoryRepository {
  constructor(private readonly database: KnexDb) {}

  async save(taskHistory: TaskHistoryEntity): Promise<TaskHistoryEntity> {
    const connection = await this.database.getConnection();

    const result = await connection.transaction(async (trx) => {
      let result: IdResponse[];
      if (taskHistory.id === 0) {
        result = await trx('task_history')
          .insert({
            task_id: taskHistory.task.id,
            type: taskHistory.historyType,
            created_at: taskHistory.createdAt,
            from_state: taskHistory.fromState,
            to_state: taskHistory.toState,
          })
          .returning<IdResponse[]>(['id']);
      } else {
        result = await trx('task_history')
          .where({ id: taskHistory.id })
          .update({
            type: taskHistory.historyType,
            created_at: taskHistory.createdAt,
            from_state: taskHistory.fromState,
            to_state: taskHistory.toState,
          })
          .returning<IdResponse[]>(['id']);
      }

      // TODO: Error handling
      const taskHistoryResult: TaskHistoryLoadResponse = await trx(
        'task_history',
      )
        .select(
          'id',
          'type',
          'created_at',
          'from_state',
          'to_state',
          'tasks.id as task_id',
          'tasks.name as task_name',
          'tasks.updated_at as task_updated_at',
          'tasks.created_at as task_created_at',
        )
        .where({
          id: result[0]!.id,
        })
        .leftJoin('tasks', { 'tasks.id': 'task_history.task_id' })
        .first();

      return taskHistoryResult;
    });

    return TaskHistoryRepositoryMapper.toDomain(result);
  }
}
