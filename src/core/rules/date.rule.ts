import { BuisenessRuleError } from 'src/core/rules/buiseness-rule.error';
import { BuisenessRule } from 'src/core/rules/buiseness.rule';

export class DateRule implements BuisenessRule<Date> {
  constructor(
    public readonly value: Date,
    private readonly minDate?: Date,
    private readonly maxDate?: Date,
  ) {}

  isValid(): boolean {
    if (isNaN(this.value.getTime())) {
      return false;
    }

    if (this.maxDate && this.value > this.maxDate) {
      return false;
    }

    if (this.minDate && this.value < this.minDate) {
      return false;
    }

    return true;
  }

  check(): void {
    if (!this.isValid()) {
      throw new BuisenessRuleError(
        'Date',
        'should be a valid date',
        this.maxDate ? `should be less than ${this.maxDate}` : '',
        this.minDate ? `should be greater than ${this.minDate}` : '',
      );
    }
  }
}
