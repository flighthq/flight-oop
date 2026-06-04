import { createStage } from '../../internal/sdkCompat.js';
import type { Stage as RawStage, StageData } from '../../internal/sdkCompat.js';

import Entity from '../../Entity.js';
import DisplayContainer from './DisplayContainer.js';

export default class Stage extends DisplayContainer {
  protected __data: StageData;
  constructor() {
    super();
    this.__data = this.__raw.data as StageData;
  }

  protected override __create() {
    return createStage();
  }

  static fromRaw(raw: RawStage): Stage {
    return Entity.getOrCreate(raw, Stage)!;
  }

  // Get & Set Methods

  override get raw(): RawStage {
    return this.__raw as RawStage;
  }
}
