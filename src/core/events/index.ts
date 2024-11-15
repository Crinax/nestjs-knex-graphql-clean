import { TaskEventsDtos } from 'src/core/events/task.events';

export type EventDtos = {
  [K in keyof TaskEventsDtos]: TaskEventsDtos[K];
};

export type DomainEvent<EventName extends keyof EventDtos> = {
  name: EventName;
  data: EventDtos[EventName];
};
