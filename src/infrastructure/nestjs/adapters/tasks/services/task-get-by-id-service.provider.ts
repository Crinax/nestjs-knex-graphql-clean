import { Provider } from '@nestjs/common';
import { TaskGetByIdService } from 'src/application/task/task-get-by-id.service';
import { GetTaskByIdQuery } from 'src/core/ports/task/primary/queries/get-task-by-id.query';
import { IDb } from 'src/infrastructure/knex/abstract/db.abstract';
import { KnexDb } from 'src/infrastructure/knex/knex.infrastructure';
import { TaskRepository } from 'src/infrastructure/knex/repositories/task/task.repository';

export const TaskGetByIdServiceProvider: Provider = {
  provide: GetTaskByIdQuery,
  useFactory: (db: KnexDb) => new TaskGetByIdService(new TaskRepository(db)),
  inject: [IDb],
};
