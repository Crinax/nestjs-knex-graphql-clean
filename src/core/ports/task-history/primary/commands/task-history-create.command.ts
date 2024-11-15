import { TaskHistoryTypeRule } from 'src/core/entities/task-history/rules/history-type.rule';
import { TaskEntity } from 'src/core/entities/task/task.entity';
import { TextRule } from 'src/core/rules/text.rule';

export class TaskHistoryCreateCommand {
  private constructor(
    private readonly taskEntity: TaskEntity,
    private readonly _historyType: TaskHistoryTypeRule,
    private readonly _oldState: TextRule,
    private readonly _currentState: TextRule,
  ) {}

  public get task(): TaskEntity {
    return this.taskEntity;
  }

  public get historyType(): string {
    return this._historyType.value;
  }

  public get oldState(): string {
    return this._oldState.value;
  }

  public get currentState(): string {
    return this._currentState.value;
  }

  public static from(
    taskEntity: TaskEntity,
    oldState: string,
    historyType: string,
  ) {
    const historyTypeRule = new TaskHistoryTypeRule(historyType);
    const oldStateRule = new TextRule(oldState);
    const currentStateRule = new TextRule(taskEntity.name, 1);

    historyTypeRule.check();
    oldStateRule.check();
    currentStateRule.check();

    return new TaskHistoryCreateCommand(
      taskEntity,
      historyTypeRule,
      oldStateRule,
      currentStateRule,
    );
  }
}
