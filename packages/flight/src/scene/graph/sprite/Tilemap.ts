import { createTilemap } from '../../../internal/sdkCompat.js';
import type { Tilemap as RawTilemap, TilemapData } from '../../../internal/sdkCompat.js';

import { Tileset } from '../../../assets';
import FlightObject from '../../../FlightObject';
import SpriteNode from './SpriteNode';

export default class Tilemap extends SpriteNode {
  protected __data: TilemapData;

  constructor() {
    super();
    this.__data = this.__raw.data as TilemapData;
  }

  protected override __create() {
    return createTilemap();
  }

  static fromRaw(raw: RawTilemap): Tilemap {
    return FlightObject.getOrCreate(raw, Tilemap)!;
  }

  get tileset(): Tileset | null {
    return FlightObject.getOrCreate(this.__data.tileset, Tileset);
  }

  set tileset(value: Tileset | null) {
    this.__data.tileset = value !== null ? value.raw : null;
  }
}
