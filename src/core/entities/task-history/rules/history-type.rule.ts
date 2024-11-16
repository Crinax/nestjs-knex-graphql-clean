import { BuisenessRuleError } from 'src/core/rules/buiseness-rule.error';
import { BuisenessRule } from 'src/core/rules/buiseness.rule';

export const TaskHistoryTypeMap = {
  CREATED: 'task_created',
  NAME_UPDATED: 'task_name_updated',
} as const;

export class TaskHistoryTypeRule implements BuisenessRule<string> {
  constructor(public readonly value: string) {}

  isValid(): boolean {
    const values: string[] = Object.values(TaskHistoryTypeMap);

    return values.includes(this.value);
  }

  check(): void {
    if (!this.isValid()) {
      throw new BuisenessRuleError(
        'HistoryType',
        'should be a valid history type',
      );
    }
  }
}
