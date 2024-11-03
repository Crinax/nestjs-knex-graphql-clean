import { Provider } from '@nestjs/common';
import { TaskUpdateNameService } from 'src/application/task/task-update-name.service';
import { UpdateTaskNameUseCase } from 'src/core/task/ports/primary/use-cases/update-task-name.use-case';
import { IDb } from 'src/infrastructure/knex/abstract/db.abstract';
import {
  KnexDb,
  UnitOfWork,
} from 'src/infrastructure/knex/knex.infrastructure';
import { TaskRepository } from 'src/infrastructure/knex/repositories/task/task.repository';

export const TaskUpdateNameServiceProvider: Provider = {
  provide: UpdateTaskNameUseCase,
  useFactory: (db: KnexDb) => {
    const uow = new UnitOfWork(db);
    const repository = new TaskRepository(db);

    return new TaskUpdateNameService(repository, repository, uow);
  },
  inject: [IDb],
};
