import { createSpritesheet } from '../internal/sdkCompat.js';
import type { Spritesheet as RawSpritesheet } from '../internal/sdkCompat.js';

import TextureAtlas from '../assets/TextureAtlas';
import Entity from '../Entity';
import SpritesheetAnimation from './SpritesheetAnimation';

export default class Spritesheet extends Entity<RawSpritesheet> {
  constructor(atlas?: TextureAtlas, animations?: SpritesheetAnimation[]) {
    super();
    if (atlas) this.__raw.atlas = atlas.raw;
    if (animations) this.__raw.animations = animations.map((obj) => obj.raw);
  }

  protected override __create() {
    return createSpritesheet();
  }

  addAnimation(animation: SpritesheetAnimation): void {
    this.__raw.animations.push(animation.raw);
  }

  static fromRaw(raw: RawSpritesheet): Spritesheet {
    return Entity.getOrCreate(raw, Spritesheet)!;
  }

  getAnimation(index: number): SpritesheetAnimation | null {
    if (index >= 0 && index < this.__raw.animations.length) {
      return Entity.getOrCreate(this.__raw.animations[index], SpritesheetAnimation);
    }
    return null;
  }

  // Get & Set Methods

  get atlas(): TextureAtlas | null {
    return Entity.getOrCreate(this.__raw.atlas, TextureAtlas);
  }

  set atlas(value: TextureAtlas | null) {
    this.__raw.atlas = value ? value.raw : null;
  }

  get numAnimations(): number {
    return this.__raw.animations.length;
  }
}
