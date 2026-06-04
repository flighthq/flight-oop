import { Filter as RawFilter } from '../internal/sdkCompat.js';
import FlightObject from '../FlightObject';

export default class Filter extends FlightObject<RawFilter> {
  constructor() {
    super();
  }
}
