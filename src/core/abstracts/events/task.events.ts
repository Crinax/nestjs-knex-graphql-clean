import { TaskEntity } from 'src/core/task/entities/task.entity';

export class TaskEvents {
  static readonly TASK_CREATED = Symbol('task_created');
  static readonly TASK_NAME_UPDATED = Symbol('task_name_updated');
}

export type TaskEventsDtos = {
  [TaskEvents.TASK_CREATED]: TaskEntity;
  [TaskEvents.TASK_NAME_UPDATED]: TaskEntity;
};
