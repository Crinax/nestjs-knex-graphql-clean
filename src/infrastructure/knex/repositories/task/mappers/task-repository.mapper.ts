import { TaskProps } from 'src/core/entities/task/taks.prop';
import { TaskEntity } from 'src/core/entities/task/task.entity';
import { TaskLoadResponse } from 'src/infrastructure/knex/repositories/task/task-repository.responses';

export class TaskRepositoryMapper {
  private constructor() {
    throw new Error('Cannot create instance of static class');
  }

  public static toDomain(task: TaskLoadResponse): TaskEntity {
    const props = TaskProps.from(
      task.id,
      task.name,
      new Date(task.created_at),
      new Date(task.updated_at),
    );

    return new TaskEntity(props);
  }
}
