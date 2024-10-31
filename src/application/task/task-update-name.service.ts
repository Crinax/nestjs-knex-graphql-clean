import { TaskProps } from 'src/core/entities/task/taks.prop';
import { TaskEntity } from 'src/core/entities/task/task.entity';
import { UpdateTaskNameCommand } from 'src/core/ports/primary/commands/tasks/update-name.command';
import { TaskResponse } from 'src/core/ports/primary/use-cases/tasks/responses';
import { UpdateTaskNameUseCase } from 'src/core/ports/primary/use-cases/tasks/update-task-name.use-case';
import { TaskLoaderByIdPort } from 'src/core/ports/secondary/task/task-loader-id.port';
import { TaskSavePort } from 'src/core/ports/secondary/task/task-save.port';
import { IdRule } from 'src/core/rules/id.rule';
import { TextRule } from 'src/core/rules/text.rule';
import { IRepository } from 'src/infrastructure/knex/abstract/db.abstract';
import {
  KnexDb,
  UnitOfWork,
} from 'src/infrastructure/knex/knex.infrastructure';

export class TaskUpdateNameService implements UpdateTaskNameUseCase {
  constructor(
    private readonly loadPort: TaskLoaderByIdPort & IRepository<KnexDb>,
    private readonly savePort: TaskSavePort & IRepository<KnexDb>,
    private readonly unitOfWork: UnitOfWork,
  ) {}

  async update(command: UpdateTaskNameCommand): Promise<TaskResponse> {
    const idRule = new IdRule(command.id);
    const nameRule = new TextRule(command.name, 1);

    idRule.check();
    nameRule.check();

    const result = await this.unitOfWork
      .use('loader', this.loadPort)
      .use('saver', this.savePort)
      .exec(async (uow, { loader, saver }) => {
        uow.begin();

        const task = await loader.loadById(idRule.value);

        if (!task) {
          throw new Error('Task not found');
        }

        const newTaskProps = TaskProps.from(
          idRule.value,
          nameRule.value,
          task.createdAt,
          new Date(),
        );

        const newTask = new TaskEntity(newTaskProps);

        const saved = await saver.save(newTask);

        uow.commit();
        return saved;
      });

    return {
      id: result.id,
      name: result.name,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }
}
