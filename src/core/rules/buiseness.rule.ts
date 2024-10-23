export abstract class BuisenessRule<T> {
  abstract get value(): T;
  abstract isValid(): boolean;
  abstract check(): void;
}
