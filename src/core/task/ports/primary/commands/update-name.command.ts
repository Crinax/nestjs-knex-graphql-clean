import { IdRule } from 'src/core/rules/id.rule';
import { TextRule } from 'src/core/rules/text.rule';

export class UpdateTaskNameCommand {
  private constructor(
    private readonly idRule: IdRule,
    private readonly nameRule: TextRule,
  ) {}

  public static from(id: number, name: string): UpdateTaskNameCommand {
    const idRule = new IdRule(id);
    const nameRule = new TextRule(name, 1);

    idRule.check();
    nameRule.check();

    return new UpdateTaskNameCommand(idRule, nameRule);
  }

  public get id(): IdRule {
    return this.idRule;
  }

  public get name(): TextRule {
    return this.nameRule;
  }
}
