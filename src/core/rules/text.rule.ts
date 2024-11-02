import { BuisenessRuleError } from 'src/core/rules/buiseness-rule.error';
import { BuisenessRule } from 'src/core/rules/buiseness.rule';

export class TextRule implements BuisenessRule<string> {
  constructor(
    public readonly value: string,
    private readonly minLength: number = 0,
    private readonly maxLength?: number,
  ) {}

  isValid(): boolean {
    if (this.maxLength && this.value.length > this.maxLength) {
      return false;
    }

    if (this.value.length < this.minLength) {
      return false;
    }

    return true;
  }

  check(): void {
    if (!this.isValid()) {
      throw new BuisenessRuleError(
        'Text',
        this.minLength > 0 ? 'should be non empty' : '',
        this.maxLength ? `should have length less than ${this.maxLength}` : '',
      );
    }
  }
}
