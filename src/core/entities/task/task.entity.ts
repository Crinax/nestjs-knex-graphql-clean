import { Entity } from 'src/core/abstracts/entity.abstract';
import { TextRule } from 'src/core/rules/text.rule';
import { TaskProps } from 'src/core/entities/task/taks.prop';

export class TaskEntity implements Entity {
  private _id: number;
  private _name: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: TaskProps) {
    this._id = props.id;
    this._name = props.name;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  updateName(name: TextRule): void {
    this._name = name.value;
  }
}
