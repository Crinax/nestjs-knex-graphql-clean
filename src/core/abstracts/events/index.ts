import { TaskEventsDtos } from 'src/core/abstracts/events/task.events';

export type EventDtos = {
  [K in keyof TaskEventsDtos]: TaskEventsDtos[K];
};

export type DomainEvent<EventName extends keyof EventDtos> = {
  name: EventName;
  data: EventDtos[EventName];
};
