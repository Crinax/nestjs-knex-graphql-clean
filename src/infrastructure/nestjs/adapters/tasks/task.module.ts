import { Module } from '@nestjs/common';
import { KnexProvider } from 'src/infrastructure/nestjs/adapters/knex/knex.provider';
import { TaskCreteServiceProvider } from 'src/infrastructure/nestjs/adapters/tasks/services/task-create-service.provider';
import { TaskAllGetServiceProvider } from 'src/infrastructure/nestjs/adapters/tasks/services/task-get-all-service.provider';
import { TaskGetByIdServiceProvider } from 'src/infrastructure/nestjs/adapters/tasks/services/task-get-by-id-service.provider';
import { TaskUpdateNameServiceProvider } from 'src/infrastructure/nestjs/adapters/tasks/services/task-update-name-service.provider';

@Module({
  providers: [
    KnexProvider,
    TaskGetByIdServiceProvider,
    TaskAllGetServiceProvider,
    TaskUpdateNameServiceProvider,
    TaskCreteServiceProvider,
  ],
  exports: [
    TaskAllGetServiceProvider,
    TaskGetByIdServiceProvider,
    TaskUpdateNameServiceProvider,
    TaskCreteServiceProvider,
  ],
})
export class TaskModule {}
