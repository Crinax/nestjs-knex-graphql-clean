import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { GetTaskByIdQuery } from 'src/core/task/ports/primary/queries/get-task-by-id.query';
import { Task } from 'src/infrastructure/nestjs-graphql/models/task.model';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly getTaskQuery: GetTaskByIdQuery) {}

  @Query(() => Task, { nullable: true })
  task(@Args('id', { type: () => Int }) id: number) {
    return this.getTaskQuery.getById(id);
  }
}
