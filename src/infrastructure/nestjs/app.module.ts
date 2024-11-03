import { Module } from '@nestjs/common';
import {
  defineGraphQlModule,
  defineResolvers,
} from 'src/infrastructure/nestjs-graphql';
import { KnexProvider } from 'src/infrastructure/nestjs/adapters/knex/knex.provider';
import { TaskGetByIdServiceProvider } from 'src/infrastructure/nestjs/adapters/services/tasks/task-get-by-id-service.provider';

@Module({
  imports: [defineGraphQlModule()],
  controllers: [],
  providers: [KnexProvider, TaskGetByIdServiceProvider, ...defineResolvers()],
})
export class AppModule {}
