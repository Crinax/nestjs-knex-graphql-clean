import { DomainEvent, EventDtos } from 'src/core/abstracts/events';

export abstract class IEventBus {
  abstract publish<T extends keyof EventDtos>(
    event: DomainEvent<T>,
  ): Promise<void>;

  abstract subscribe<T extends keyof EventDtos>(
    name: T,
    handler: (event: DomainEvent<T>) => void | Promise<void>,
  ): Promise<void>;
}
