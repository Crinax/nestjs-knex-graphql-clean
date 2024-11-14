import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTaskCommand } from 'src/core/task/ports/primary/commands/create-task.command';
import { UpdateTaskNameCommand } from 'src/core/task/ports/primary/commands/update-name.command';
import { GetAllTaskQuery } from 'src/core/task/ports/primary/queries/get-all-task.query';
import { GetTaskByIdQuery } from 'src/core/task/ports/primary/queries/get-task-by-id.query';
import { CreateTaskUseCase } from 'src/core/task/ports/primary/use-cases/create-task.use-case';
import { UpdateTaskNameUseCase } from 'src/core/task/ports/primary/use-cases/update-task-name.use-case';
import {
  CreateTaskInput,
  UpdateTaskNameInput,
} from 'src/infrastructure/nestjs-graphql/models/task.input';
import { Task } from 'src/infrastructure/nestjs-graphql/models/task.model';

@Resolver(() => Task)
export class TaskResolver {
  constructor(
    private readonly getTaskQuery: GetTaskByIdQuery,
    private readonly getAllTaskQuery: GetAllTaskQuery,
    private readonly updateTaskNameUseCase: UpdateTaskNameUseCase,
    private readonly createTaskUseCase: CreateTaskUseCase,
  ) {}

  @Query(() => Task, { nullable: true })
  task(@Args('id', { type: () => Int }) id: number): Promise<Task | null> {
    return this.getTaskQuery.getById(id);
  }

  @Query(() => [Task])
  tasks(): Promise<Task[]> {
    return this.getAllTaskQuery.getAll();
  }

  @Mutation(() => Task)
  updateTaskName(
    @Args('updateInput') input: UpdateTaskNameInput,
  ): Promise<Task> {
    return this.updateTaskNameUseCase.update(
      UpdateTaskNameCommand.from(input.id, input.name),
    );
  }

  @Mutation(() => Task)
  createTask(@Args('createInput') input: CreateTaskInput): Promise<Task> {
    return this.createTaskUseCase.create(new CreateTaskCommand(input.name));
  }
}
