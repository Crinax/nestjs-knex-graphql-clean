import { IdRule } from 'src/core/rules/id.rule';
import { TextRule } from 'src/core/rules/text.rule';
import { TaskEntity } from 'src/core/task/entities/task.entity';

export abstract class TaskUpdateNamePort {
  abstract updateName(id: IdRule, name: TextRule): Promise<TaskEntity>;
}
