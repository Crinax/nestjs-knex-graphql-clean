import { TaskEntity } from 'src/core/task/entities/task.entity';
import { TaskResponse } from 'src/core/task/ports/primary/responses';

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
