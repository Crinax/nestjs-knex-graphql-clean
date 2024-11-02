import { TaskEntity } from 'src/core/task/entities/task.entity';

export abstract class TaskLoaderByIdPort {
  abstract loadById(id: number): Promise<TaskEntity | null>;
}
