import { createMovieClip } from '../../../internal/sdkCompat.js';
import type { MovieClip as RawMovieClip, MovieClipData } from '../../../internal/sdkCompat.js';

import FlightObject from '../../../FlightObject.js';
import DisplayContainer from './DisplayContainer.js';

export default class MovieClip extends DisplayContainer {
  protected __data: MovieClipData;
  constructor() {
    super();
    this.__data = this.__raw.data as MovieClipData;
  }

  protected override __create() {
    return createMovieClip();
  }

  static fromRaw(raw: RawMovieClip): MovieClip {
    return FlightObject.getOrCreate(raw, MovieClip)!;
  }

  // Get & Set Methods

  override get raw(): RawMovieClip {
    return this.__raw as RawMovieClip;
  }
}
