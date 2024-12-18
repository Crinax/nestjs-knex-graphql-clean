import { IdRule } from 'src/core/rules/id.rule';
import { TaskEntity } from 'src/core/entities/task/task.entity';

export abstract class TaskLoaderByIdPort {
  abstract loadById(id: IdRule): Promise<TaskEntity | null>;
}
