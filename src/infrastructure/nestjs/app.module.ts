import { Module } from '@nestjs/common';
import {
  defineGraphQlModule,
  defineResolvers,
} from 'src/infrastructure/nestjs-graphql';
import { TaskModule } from 'src/infrastructure/nestjs/adapters/tasks/task.module';

@Module({
  imports: [defineGraphQlModule(), TaskModule],
  controllers: [],
  providers: defineResolvers(),
})
export class AppModule {}
