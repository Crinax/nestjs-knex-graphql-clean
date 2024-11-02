import { TaskProps } from 'src/core/task/entities/taks.prop';
import { TaskEntity } from 'src/core/task/entities/task.entity';
import { TaskLoadResponse } from 'src/infrastructure/knex/repositories/task/task-repository.responses';

export class TaskRepositoryMapper {
  private constructor() {
    throw new Error('Cannot create instance of static class');
  }

  public static toDomain(task: TaskLoadResponse): TaskEntity {
    const props = TaskProps.from(
      task.id,
      task.name,
      task.created_at,
      task.updated_at,
    );

    return new TaskEntity(props);
  }
}
