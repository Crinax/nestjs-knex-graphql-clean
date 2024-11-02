import { GetTaskByIdResponse } from 'src/core/task/ports/primary/queries/responses';

export abstract class GetTaskByIdQuery {
  abstract getById(id: number): Promise<GetTaskByIdResponse | null>;
}
