export class UpdateTaskNameCommand {
  constructor(
    public readonly id: number,
    public readonly name: string,
  ) {}
}
