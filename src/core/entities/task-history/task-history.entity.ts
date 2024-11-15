import { TaskHistoryProps } from 'src/core/entities/task-history/task-history.prop';
import { TaskEntity } from 'src/core/entities/task/task.entity';

export class TaskHistoryEntity {
  private _id: number;
  private _task: TaskEntity;
  private _historyType: string;
  private _createdAt: Date;
  private _fromState: string;
  private _toState: string;

  constructor(props: TaskHistoryProps) {
    this._id = props.id;
    this._task = props.task;
    this._historyType = props.historyType;
    this._createdAt = props.createdAt;
    this._fromState = props.fromState;
    this._toState = props.toState;
  }

  public get id(): number {
    return this._id;
  }

  public get task(): TaskEntity {
    return this._task;
  }

  public get historyType(): string {
    return this._historyType;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get fromState(): string {
    return this._fromState;
  }

  public get toState(): string {
    return this._toState;
  }
}
