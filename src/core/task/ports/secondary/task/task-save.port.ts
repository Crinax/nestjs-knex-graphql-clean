import { TaskEntity } from 'src/core/task/entities/task.entity';

export abstract class TaskSavePort {
  abstract save(task: TaskEntity): Promise<TaskEntity>;
}
