import { TaskEntity } from 'src/core/entities/task/task.entity';

export abstract class TaskLoaderPort {
  abstract load(): Promise<TaskEntity[]>;
}
