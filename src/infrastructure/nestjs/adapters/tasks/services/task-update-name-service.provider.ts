import { Provider } from '@nestjs/common';
import { TaskUpdateNameService } from 'src/application/task/task-update-name.service';
import { IEventBus } from 'src/core/abstracts/event-bus.abstract';
import { UpdateTaskNameUseCase } from 'src/core/ports/task/primary/use-cases/update-task-name.use-case';
import { IDb } from 'src/infrastructure/knex/abstract/db.abstract';
import { KnexDb } from 'src/infrastructure/knex/knex.infrastructure';
import { TaskRepository } from 'src/infrastructure/knex/repositories/task/task.repository';

export const TaskUpdateNameServiceProvider: Provider = {
  provide: UpdateTaskNameUseCase,
  useFactory: (db: KnexDb, eventBus: IEventBus) => {
    const repository = new TaskRepository(db);

    return new TaskUpdateNameService(repository, repository, eventBus);
  },
  inject: [IDb, IEventBus],
};
