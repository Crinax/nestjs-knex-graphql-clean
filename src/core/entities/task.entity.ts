import { Entity } from '../abstracts/entity.abstract';
import { z } from 'zod';

export const TaskValidator = z
  .object({
    id: z.number().int().nonnegative().finite().safe(),
    name: z.string().min(1),
    createdAt: z.date().default(new Date()),
    updatedAt: z.date().default(new Date()),
  })
  .refine((task) => task.createdAt > task.updatedAt, {
    message: 'created_at should be lower or equal to updated_at',
    path: ['createdAt', 'updatedAt'],
  });

export type TaskProps = z.infer<typeof TaskValidator>;

export class TaskEntity implements Entity {
  private props: Required<TaskProps>;

  constructor(props: TaskProps) {
    this.props = TaskValidator.parse(props);
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
