import { Shader as RawShader } from '../internal/sdkCompat.js';
import FlightObject from '../FlightObject';

export default class Shader extends FlightObject<RawShader> {
  constructor() {
    super();
  }
}
