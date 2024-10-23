import { TaskEntity } from 'src/core/entities/task/task.entity';

export abstract class TaskLoaderByIdPort {
  abstract loadById(id: number): Promise<TaskEntity | null>;
}
