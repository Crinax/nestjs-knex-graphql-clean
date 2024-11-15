import { TaskHistoryTypeRule } from 'src/core/entities/task-history/rules/history-type.rule';
import { TaskEntity } from 'src/core/entities/task/task.entity';
import { DateRule } from 'src/core/rules/date.rule';
import { IdRule } from 'src/core/rules/id.rule';
import { TextRule } from 'src/core/rules/text.rule';

export class TaskHistoryProps {
  private constructor(
    private readonly idRule: IdRule,
    private readonly taskEntity: TaskEntity,
    private readonly historyTypeRule: TaskHistoryTypeRule,
    private readonly createdAtRule: DateRule,
    private readonly fromStateRule: TextRule,
    private readonly toStateRule: TextRule,
  ) {}

  public get id(): number {
    return this.idRule.value;
  }

  public get task(): TaskEntity {
    return this.taskEntity;
  }

  public get historyType(): string {
    return this.historyTypeRule.value;
  }

  public get createdAt(): Date {
    return this.createdAtRule.value;
  }

  public get fromState(): string {
    return this.fromStateRule.value;
  }

  public get toState(): string {
    return this.toStateRule.value;
  }

  public static from(
    id: number,
    taskEntity: TaskEntity,
    historyType: string,
    fromState: string,
    toState: string,
    createdAt: Date = new Date(),
  ) {
    const idRule = new IdRule(id);
    const historyTypeRule = new TaskHistoryTypeRule(historyType);
    const createdAtRule = new DateRule(createdAt);
    const fromStateRule = new TextRule(fromState, 1);
    const toStateRule = new TextRule(toState);

    idRule.check();
    historyTypeRule.check();
    createdAtRule.check();
    fromStateRule.check();
    toStateRule.check();

    return new TaskHistoryProps(
      idRule,
      taskEntity,
      historyTypeRule,
      createdAtRule,
      fromStateRule,
      toStateRule,
    );
  }
}
