import { BuisenessRuleError } from 'src/core/rules/buiseness-rule.error';
import { BuisenessRule } from 'src/core/rules/buiseness.rule';

export const TaskHistoryTypeMap = {
  CREATED: 'task_created',
  NAME_UPDATED: 'task_name_updated',
} as const;

export class TaskHistoryTypeRule implements BuisenessRule<string> {
  constructor(private readonly _value: string) {}

  public get value(): string {
    this.check();

    return Reflect.get(TaskHistoryTypeMap, this._value);
  }

  isValid(): boolean {
    const values: string[] = Object.values(TaskHistoryTypeMap);

    return values.includes(this._value);
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
