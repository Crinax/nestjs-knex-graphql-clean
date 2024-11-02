import { Module } from '@nestjs/common';
import {
  defineGraphQlModule,
  defineResolvers,
} from 'src/infrastructure/nestjs-graphql';
import { KnexProvider } from 'src/infrastructure/nestjs/adapters/knex/knex.provider';
import { TaskGetByIdServiceProvider } from 'src/infrastructure/nestjs/adapters/services/tasks/task-get-by-id-service.provider';
import { AppController } from 'src/infrastructure/nestjs/app.controller';
import { AppService } from 'src/infrastructure/nestjs/app.service';

@Module({
  imports: [defineGraphQlModule()],
  controllers: [AppController],
  providers: [
    AppService,
    KnexProvider,
    TaskGetByIdServiceProvider,
    ...defineResolvers(),
  ],
})
export class AppModule {}
