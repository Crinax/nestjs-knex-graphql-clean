import { Provider } from '@nestjs/common';
import { TaskCreateService } from 'src/application/task/task-create.service';
import { CreateTaskUseCase } from 'src/core/task/ports/primary/use-cases/create-task.use-case';
import { IDb } from 'src/infrastructure/knex/abstract/db.abstract';
import { KnexDb } from 'src/infrastructure/knex/knex.infrastructure';
import { TaskRepository } from 'src/infrastructure/knex/repositories/task/task.repository';

export const TaskCreteServiceProvider: Provider = {
  provide: CreateTaskUseCase,
  useFactory: (db: KnexDb) => new TaskCreateService(new TaskRepository(db)),
  inject: [IDb],
};
