import { TaskEntity } from 'src/core/task/entities/task.entity';

export abstract class TaskLoaderPort {
  abstract load(): Promise<TaskEntity[]>;
}
