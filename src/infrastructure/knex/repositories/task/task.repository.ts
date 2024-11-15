import { TaskLoaderByIdPort } from 'src/core/ports/task/secondary/task-loader-id.port';
import { TaskLoaderPort } from 'src/core/ports/task/secondary/task-loader.port';
import { TaskSavePort } from 'src/core/ports/task/secondary/task-save.port';
import { TaskUpdateNamePort } from 'src/core/ports/task/secondary/task-update-name.port';
import { IdRule } from 'src/core/rules/id.rule';
import { TextRule } from 'src/core/rules/text.rule';
import { TaskEntity } from 'src/core/entities/task/task.entity';
import { KnexDb } from 'src/infrastructure/knex/knex.infrastructure';
import { TaskRepositoryMapper } from 'src/infrastructure/knex/repositories/task/mappers/task-repository.mapper';
import { TaskLoadResponse } from 'src/infrastructure/knex/repositories/task/task-repository.responses';

export class TaskRepository
  implements
    TaskLoaderByIdPort,
    TaskLoaderPort,
    TaskSavePort,
    TaskUpdateNamePort
{
  constructor(private readonly database: KnexDb) {}

  async save(task: TaskEntity): Promise<TaskEntity> {
    const connection = await this.database.getConnection();

    let result: TaskLoadResponse[];
    if (task.id === 0) {
      result = await connection<TaskLoadResponse>('tasks')
        .insert({
          name: task.name,
          created_at: task.createdAt,
          updated_at: task.updatedAt,
        })
        .returning<TaskLoadResponse[]>([
          'id',
          'name',
          'created_at',
          'updated_at',
        ]);
    } else {
      result = await connection('tasks')
        .where({ id: task.id })
        .update({
          name: task.name,
          created_at: task.createdAt,
          updated_at: task.updatedAt,
        })
        .returning<TaskLoadResponse[]>([
          'id',
          'name',
          'created_at',
          'updated_at',
        ]);
    }

    // TODO: Error handling
    return TaskRepositoryMapper.toDomain(result[0]!);
  }

  async loadById(id: IdRule): Promise<TaskEntity | null> {
    const connection = await this.database.getConnection();

    const task = await connection<TaskLoadResponse>('tasks')
      .where({ id: id.value })
      .first();

    return task ? TaskRepositoryMapper.toDomain(task) : null;
  }

  async load(): Promise<TaskEntity[]> {
    const connection = await this.database.getConnection();

    const tasks = await connection<TaskLoadResponse>('tasks').select();

    return tasks.map(TaskRepositoryMapper.toDomain);
  }

  async updateName(id: IdRule, name: TextRule): Promise<TaskEntity> {
    const connection = await this.database.getConnection();

    const task = await connection<TaskLoadResponse>('tasks')
      .where({ id: id.value })
      .update({
        name: name.value,
      })
      .returning(['id', 'name', 'created_at', 'updated_at']);

    // TODO: Error handling
    return TaskRepositoryMapper.toDomain(task[0]!);
  }
}
