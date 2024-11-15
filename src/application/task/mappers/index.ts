import { TaskResponse } from 'src/core/ports/task/primary/responses';
import { TaskEntity } from 'src/core/entities/task/task.entity';

export class TaskServiceMapper {
  private constructor() {
    throw new Error('Cannot instance of static class');
  }

  public static toResponse(task: TaskEntity): TaskResponse {
    return {
      id: task.id,
      name: task.name,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
