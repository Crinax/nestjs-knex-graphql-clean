import { TaskServiceMapper } from 'src/application/task/mappers';
import { IdRule } from 'src/core/rules/id.rule';
import { TextRule } from 'src/core/rules/text.rule';
import { UpdateTaskNameCommand } from 'src/core/task/ports/primary/commands/update-name.command';
import { TaskResponse } from 'src/core/task/ports/primary/responses';
import { UpdateTaskNameUseCase } from 'src/core/task/ports/primary/use-cases/update-task-name.use-case';
import { TaskLoaderByIdPort } from 'src/core/task/ports/secondary/task-loader-id.port';
import { TaskSavePort } from 'src/core/task/ports/secondary/task-save.port';
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
      .exec(async (_uow, { loader, saver }) => {
        const task = await loader.loadById(idRule.value);

        if (!task) {
          throw new Error('Task not found');
        }

        task.updateName(nameRule);

        const saved = await saver.save(task);

        return saved;
      });

    return TaskServiceMapper.toResponse(result);
  }
}
