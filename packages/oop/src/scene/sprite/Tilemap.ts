import {
  createTilemap,
  fillTilemapTiles,
  getTilemapTile,
  invalidateAppearance,
  invalidateLocalBounds,
  resizeTilemap,
  setTilemapTile,
} from '../../internal/sdkCompat.js';
import type { Tilemap as RawTilemap, TilemapData } from '../../internal/sdkCompat.js';

import { Tileset } from '../../assets';
import Entity from '../../Entity';
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
    return Entity.getOrCreate(raw, Tilemap)!;
  }

  fillTiles(id: number): void {
    fillTilemapTiles(this.__raw, id);
    invalidateAppearance(this.__raw);
  }

  getTile(column: number, row: number): number {
    return getTilemapTile(this.__raw, column, row);
  }

  resize(columns: number, rows: number): void {
    resizeTilemap(this.__raw, columns, rows);
    invalidateLocalBounds(this.__raw);
    invalidateAppearance(this.__raw);
  }

  setTile(column: number, row: number, id: number): void {
    setTilemapTile(this.__raw, column, row, id);
    invalidateAppearance(this.__raw);
  }

  // Get & Set Methods

  get columns(): number {
    return this.__data.columns;
  }

  set columns(value: number) {
    this.resize(value, this.__data.rows);
  }

  get rows(): number {
    return this.__data.rows;
  }

  set rows(value: number) {
    this.resize(this.__data.columns, value);
  }

  get tiles(): Int16Array {
    return this.__data.tiles;
  }

  set tiles(value: Int16Array) {
    this.__data.tiles = value;
    invalidateAppearance(this.__raw);
  }

  get tileset(): Tileset | null {
    return Entity.getOrCreate(this.__data.tileset, Tileset);
  }

  set tileset(value: Tileset | null) {
    if (this.__data.tileset === (value !== null ? value.raw : null)) return;
    this.__data.tileset = value !== null ? value.raw : null;
    invalidateLocalBounds(this.__raw);
    invalidateAppearance(this.__raw);
  }
}
