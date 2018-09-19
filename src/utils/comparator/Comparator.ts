export class Comparator {
  compare: Function;
  constructor(compareFunction?) {
    this.compare = compareFunction || Comparator.defaultCompareFunction;
  }

  /**
   * 比较方法, 0表示相等，-1表示a小于b，1表示a大于b
   * @param a number
   * @param b number
   * @returns number
   */
  static defaultCompareFunction(a, b): number {
    if (a === b) {
      return 0;
    }
    return a < b ? -1 : 1;
  }

  /**
   * 是否相等  a == b
   * @param a
   * @param b
   */
  equal(a, b): boolean {
    return this.compare(a, b) === 0;
  }

  /**
   * a是否小于b  a < b
   * @param a
   * @param b
   */
  lessThan(a, b): boolean {
    return this.compare(a, b) < 0;
  }

  /**
   * a是否大于b  a > b
   * @param a
   * @param b
   */
  greaterThan(a, b): boolean {
    return this.compare(a, b) > 0;
  }

  /**
   * a是否小于等于b  a <= b
   * @param a
   * @param b
   */
  lessThanOrEqual(a, b): boolean {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  /**
   * a是否大于等于b  a >= b
   * @param a
   * @param b
   */
  greaterThanOrEqual(a, b): boolean {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  /**
   * 反转比较方法
   */
  reverse() {
    const compareOriginal = this.compare;
    this.compare = (a, b) => compareOriginal(b, a);
  }
}
