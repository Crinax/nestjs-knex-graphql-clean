import { Module } from '@nestjs/common';
import { KnexProvider } from 'src/infrastructure/nestjs/adapters/knex/knex.provider';
import { TaskAllGetServiceProvider } from 'src/infrastructure/nestjs/adapters/tasks/services/task-get-all-service.provider';
import { TaskGetByIdServiceProvider } from 'src/infrastructure/nestjs/adapters/tasks/services/task-get-by-id-service.provider';

@Module({
  providers: [
    KnexProvider,
    TaskGetByIdServiceProvider,
    TaskAllGetServiceProvider,
  ],
  exports: [TaskAllGetServiceProvider, TaskGetByIdServiceProvider],
})
export class TaskModule {}
