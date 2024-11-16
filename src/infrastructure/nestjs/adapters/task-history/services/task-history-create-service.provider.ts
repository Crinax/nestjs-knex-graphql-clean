import { Provider } from '@nestjs/common';
import { TaskHistoryCreateService } from 'src/application/task-history/task-history-create.service';
import { IEventBus } from 'src/core/abstracts/event-bus.abstract';
import { TaskHistoryCreateUseCase } from 'src/core/ports/task-history/primary/use-cases/task-history-create.use-case';
import { IDb } from 'src/infrastructure/knex/abstract/db.abstract';
import { KnexDb } from 'src/infrastructure/knex/knex.infrastructure';
import { TaskHistoryRepository } from 'src/infrastructure/knex/repositories/task-history/task-history.repository';

export const TaskHistoryServiceCreateProvider: Provider = {
  provide: TaskHistoryCreateUseCase,
  useFactory: (db: KnexDb, eventBus: IEventBus) =>
    new TaskHistoryCreateService(new TaskHistoryRepository(db), eventBus),
  inject: [IDb, IEventBus],
};
