import { TaskEntity } from 'src/core/task/entities/task.entity';
import { TaskLoaderByIdPort } from 'src/core/task/ports/secondary/task-loader-id.port';
import { TaskLoaderPort } from 'src/core/task/ports/secondary/task-loader.port';
import { TaskSavePort } from 'src/core/task/ports/secondary/task-save.port';
import { IRepository } from 'src/infrastructure/knex/abstract/db.abstract';
import { KnexDb } from 'src/infrastructure/knex/knex.infrastructure';
import { TaskRepositoryMapper } from 'src/infrastructure/knex/repositories/task/mappers/task-repository.mapper';
import { TaskLoadResponse } from 'src/infrastructure/knex/repositories/task/task-repository.responses';

export class TaskRepository
  implements
    IRepository<KnexDb>,
    TaskLoaderByIdPort,
    TaskLoaderPort,
    TaskSavePort
{
  constructor(private readonly database: KnexDb) {}

  useDatabase(database: KnexDb): IRepository<KnexDb> {
    return new TaskRepository(database);
  }

  async save(task: TaskEntity): Promise<TaskEntity> {
    const connection = await this.database.getConnection();

    let result: TaskLoadResponse;
    if (task.id > 0) {
      result = await connection<TaskLoadResponse>('tasks').insert({
        name: task.name,
        created_at: task.createdAt,
        updated_at: task.updatedAt,
      });
    } else {
      result = await connection<TaskLoadResponse>('tasks')
        .where({ id: task.id })
        .update({
          name: task.name,
          created_at: task.createdAt,
          updated_at: task.updatedAt,
        });
    }

    return TaskRepositoryMapper.toDomain(result);
  }

  async loadById(id: number): Promise<TaskEntity | null> {
    const connection = await this.database.getConnection();

    const task = await connection<TaskLoadResponse>('tasks')
      .where({ id })
      .first();

    return task ? TaskRepositoryMapper.toDomain(task) : null;
  }

  async load(): Promise<TaskEntity[]> {
    const connection = await this.database.getConnection();

    const tasks = await connection<TaskLoadResponse>('tasks').select();

    return tasks.map(TaskRepositoryMapper.toDomain);
  }
}
