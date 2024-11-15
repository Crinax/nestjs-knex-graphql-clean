import { BuisenessRuleError } from 'src/core/rules/buiseness-rule.error';
import { BuisenessRule } from 'src/core/rules/buiseness.rule';

const TaskHistoryTypeMap: Record<string, string> = {
  created: 'task_created',
  name_updated: 'task_name_updated',
};

export class TaskHistoryTypeRule implements BuisenessRule<string> {
  constructor(private readonly _value: string) {}

  public get value(): string {
    this.check();

    return TaskHistoryTypeMap[this._value]!;
  }

  isValid(): boolean {
    return TaskHistoryTypeMap[this._value] !== undefined;
  }

  check(): void {
    if (!this.isValid()) {
      throw new BuisenessRuleError(
        'HistoryType',
        'should a valid history type',
      );
    }
  }
}
