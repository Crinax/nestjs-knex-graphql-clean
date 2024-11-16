import { Module } from '@nestjs/common';
import {
  defineGraphQlModule,
  defineResolvers,
} from 'src/infrastructure/nestjs-graphql';
import { TaskHistoryModule } from 'src/infrastructure/nestjs/adapters/task-history/task-history.module';
import { TaskModule } from 'src/infrastructure/nestjs/adapters/tasks/task.module';

@Module({
  imports: [defineGraphQlModule(), TaskHistoryModule, TaskModule],
  controllers: [],
  providers: defineResolvers(),
})
export class AppModule {}
