import { TaskHistoryMapper } from 'src/application/task-history/mappers';
import { IEventBus } from 'src/core/abstracts/event-bus.abstract';
import { TaskHistoryTypeMap } from 'src/core/entities/task-history/rules/history-type.rule';
import { TaskHistoryEntity } from 'src/core/entities/task-history/task-history.entity';
import { TaskHistoryProps } from 'src/core/entities/task-history/task-history.prop';
import { TaskEvents } from 'src/core/events/task.events';
import { TaskHistoryCreateCommand } from 'src/core/ports/task-history/primary/commands/task-history-create.command';
import { TaskHistoryCreateResult } from 'src/core/ports/task-history/primary/responses';
import { TaskHistoryCreateUseCase } from 'src/core/ports/task-history/primary/use-cases/task-history-create.use-case';
import { TaskHistorySavePort } from 'src/core/ports/task-history/secondary/task-history-save.port';

export class TaskHistoryCreateService implements TaskHistoryCreateUseCase {
  constructor(
    private readonly taskHistorySavePort: TaskHistorySavePort,
    private readonly eventBus?: IEventBus,
  ) {
    if (this.eventBus) {
      this.eventBus.subscribe(TaskEvents.TASK_CREATED, async (event) => {
        await this.create(
          TaskHistoryCreateCommand.from(
            event.data,
            '',
            TaskHistoryTypeMap.created,
          ),
        );
      });

      this.eventBus.subscribe(TaskEvents.TASK_NAME_UPDATED, async (event) => {
        await this.create(
          TaskHistoryCreateCommand.from(
            event.data.task,
            event.data.oldName,
            TaskHistoryTypeMap.name_updated,
          ),
        );
      });
    }
  }

  async create(
    command: TaskHistoryCreateCommand,
  ): Promise<TaskHistoryCreateResult> {
    const historyProps = TaskHistoryProps.from(
      0,
      command.task,
      command.historyType,
      command.oldState,
      command.currentState,
    );

    const historyEntity = new TaskHistoryEntity(historyProps);

    const saved = await this.taskHistorySavePort.save(historyEntity);

    return TaskHistoryMapper.toCreateResult(saved);
  }
}
