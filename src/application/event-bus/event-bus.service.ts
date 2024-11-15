import { IEventBus } from 'src/core/abstracts/event-bus.abstract';
import { DomainEvent, EventDtos } from 'src/core/events';

type HandlersMap = {
  [K in keyof EventDtos]?: ((event: DomainEvent<K>) => void | Promise<void>)[];
};

export class EventBusService implements IEventBus {
  constructor() {}

  private handlers: HandlersMap = {};

  async publish<T extends keyof EventDtos>(
    event: DomainEvent<T>,
  ): Promise<void> {
    const handlers = this.handlers[event.name];

    if (handlers) {
      const promises = handlers
        .map((handler) => handler(event))
        .filter((result) => result instanceof Promise);

      await Promise.all(promises);
    }
  }

  async subscribe<T extends keyof EventDtos>(
    name: T,
    handler: (event: DomainEvent<T>) => void,
  ): Promise<void> {
    if (!this.handlers[name]) {
      this.handlers[name] = [];
    }

    this.handlers[name].push(handler);
  }
}
