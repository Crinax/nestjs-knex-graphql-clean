import { TaskEntity } from 'src/core/entities/task/task.entity';

export abstract class TaskSavePort {
  abstract save(task: TaskEntity): Promise<TaskEntity>;
}
