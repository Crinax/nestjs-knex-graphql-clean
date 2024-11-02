import { BuisenessRuleError } from 'src/core/rules/buiseness-rule.error';
import { BuisenessRule } from 'src/core/rules/buiseness.rule';

export class IdRule implements BuisenessRule<number> {
  constructor(public readonly value: number) {}

  isValid(): boolean {
    if (this.value < 0) {
      return false;
    }

    if (this.value > Number.MAX_SAFE_INTEGER) {
      return false;
    }

    if (this.value % 1 !== 0) {
      return false;
    }

    return true;
  }

  check(): void {
    if (!this.isValid()) {
      throw new BuisenessRuleError('Id', 'should be a valid int4');
    }
  }
}
