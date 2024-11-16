import { Provider } from '@nestjs/common';
import { EventBusService } from 'src/application/event-bus/event-bus.service';
import { IEventBus } from 'src/core/abstracts/event-bus.abstract';

const eventBus = new EventBusService();

export const EventBusProvider: Provider = {
  provide: IEventBus,
  useValue: eventBus,
};
