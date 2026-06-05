import { createSpritesheet, createSpritesheetFromTileset, getSpritesheetAnimation } from '../internal/sdkCompat.js';
import type { Spritesheet as RawSpritesheet } from '../internal/sdkCompat.js';

import Tileset from '../assets/Tileset';
import TextureAtlas from '../assets/TextureAtlas';
import Entity from '../Entity';
import SpritesheetAnimation from './SpritesheetAnimation';
import SpritesheetFrame from './SpritesheetFrame';

export default class Spritesheet extends Entity<RawSpritesheet> {
  constructor(atlas?: TextureAtlas, frames?: SpritesheetFrame[], animations?: Record<string, SpritesheetAnimation>) {
    super();
    if (atlas) this.__raw.atlas = atlas.raw;
    if (frames) this.__raw.frames = frames.map((obj) => obj.raw);
    if (animations) {
      this.__raw.animations = Object.fromEntries(Object.entries(animations).map(([key, obj]) => [key, obj.raw]));
    }
  }

  protected override __create() {
    return createSpritesheet();
  }

  addAnimation(name: string, animation: SpritesheetAnimation): void {
    this.__raw.animations[name] = animation.raw;
  }

  addFrame(frame: Readonly<SpritesheetFrame>): void {
    this.__raw.frames.push(frame.raw);
  }

  static fromRaw(raw: RawSpritesheet): Spritesheet {
    return Entity.getOrCreate(raw, Spritesheet)!;
  }

  static fromTileset(tileset: Tileset): Spritesheet {
    return Spritesheet.fromRaw(createSpritesheetFromTileset(tileset.raw));
  }

  getAnimation(name: string): SpritesheetAnimation | null {
    return Entity.getOrCreate(getSpritesheetAnimation(this.__raw, name), SpritesheetAnimation);
  }

  getFrame(index: number): SpritesheetFrame | null {
    const raw = this.__raw.frames[index];
    return raw ? SpritesheetFrame.fromRaw(raw) : null;
  }

  removeAnimation(name: string): void {
    delete this.__raw.animations[name];
  }

  // Get & Set Methods

  get atlas(): TextureAtlas | null {
    return Entity.getOrCreate(this.__raw.atlas, TextureAtlas);
  }

  set atlas(value: TextureAtlas | null) {
    this.__raw.atlas = value ? value.raw : null;
  }

  get numAnimations(): number {
    return Object.keys(this.__raw.animations).length;
  }

  get numFrames(): number {
    return this.__raw.frames.length;
  }
}
