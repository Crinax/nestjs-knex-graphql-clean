import { TaskEntity } from 'src/core/task/entities/task.entity';

export type EventDtos = {
  task_name_updated: TaskEntity;
};

export type DomainEvent<EventName extends keyof EventDtos> = {
  name: EventName;
  data: EventDtos[EventName];
};
