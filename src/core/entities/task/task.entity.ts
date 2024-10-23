import { Entity } from '../../abstracts/entity.abstract';
import { TaskProps } from './taks.prop';

export class TaskEntity implements Entity {
  private props: TaskProps;

  constructor(props: TaskProps) {
    this.props = props;
  }

  get id(): number {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
