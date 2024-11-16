import { Module } from '@nestjs/common';
import { EventBusProvider } from 'src/infrastructure/nestjs/adapters/event-bus/event-bus.provider';
import { KnexProvider } from 'src/infrastructure/nestjs/adapters/knex/knex.provider';
import { TaskHistoryServiceCreateProvider } from 'src/infrastructure/nestjs/adapters/task-history/services/task-history-create-service.provider';

@Module({
  providers: [KnexProvider, EventBusProvider, TaskHistoryServiceCreateProvider],
  exports: [TaskHistoryServiceCreateProvider],
})
export class TaskHistoryModule {}
