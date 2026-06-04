import { Filter as RawFilter } from '../internal/sdkCompat.js';
import Entity from '../Entity';

export default class Filter extends Entity<RawFilter> {
  constructor() {
    super();
  }
}
