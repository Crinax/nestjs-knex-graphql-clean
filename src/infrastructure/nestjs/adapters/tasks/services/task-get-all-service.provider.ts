import { Provider } from '@nestjs/common';
import { TaskGetAllService } from 'src/application/task/task-get-all.service';
import { GetAllTaskQuery } from 'src/core/ports/task/primary/queries/get-all-task.query';
import { IDb } from 'src/infrastructure/knex/abstract/db.abstract';
import { KnexDb } from 'src/infrastructure/knex/knex.infrastructure';
import { TaskRepository } from 'src/infrastructure/knex/repositories/task/task.repository';

export const TaskAllGetServiceProvider: Provider = {
  provide: GetAllTaskQuery,
  useFactory: (db: KnexDb) => new TaskGetAllService(new TaskRepository(db)),
  inject: [IDb],
};
