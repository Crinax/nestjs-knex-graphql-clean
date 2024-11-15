import { DateRule } from 'src/core/rules/date.rule';
import { IdRule } from 'src/core/rules/id.rule';
import { TextRule } from 'src/core/rules/text.rule';

export class TaskProps {
  private constructor(
    private readonly idRule: IdRule,
    private readonly nameRule: TextRule,
    private readonly createdAtRule: DateRule,
    private readonly updatedAtRule: DateRule,
  ) {}

  public get id(): number {
    return this.idRule.value;
  }

  public get name(): string {
    return this.nameRule.value;
  }

  public get createdAt(): Date {
    return this.createdAtRule.value;
  }

  public get updatedAt(): Date {
    return this.updatedAtRule.value;
  }

  static from(
    id: number,
    name: string,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ): TaskProps {
    const idRule = new IdRule(id);
    const nameRule = new TextRule(name, 1);
    const createdAtRule = new DateRule(createdAt);

    idRule.check();
    nameRule.check();
    createdAtRule.check();

    const updatedAtRule = new DateRule(updatedAt, createdAtRule.value);

    updatedAtRule.check();

    return new TaskProps(idRule, nameRule, createdAtRule, updatedAtRule);
  }
}
