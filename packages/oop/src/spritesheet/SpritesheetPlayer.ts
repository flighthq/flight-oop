import {
  createSpritesheetPlayer,
  getSpritesheetPlayerFrame,
  playSpritesheetAnimation,
  queueSpritesheetAnimation,
  updateSpritesheetPlayer,
} from '../internal/sdkCompat.js';
import type { Entity as RawEntity, SpritesheetPlayer as RawSpritesheetPlayer } from '../internal/sdkCompat.js';

import Entity from '../Entity';
import Signal from '../signals/Signal';
import Spritesheet from './Spritesheet';
import SpritesheetAnimation from './SpritesheetAnimation';
import SpritesheetFrame from './SpritesheetFrame';

type RawSpritesheetPlayerEntity = RawEntity & RawSpritesheetPlayer;

export default class SpritesheetPlayer extends Entity<RawSpritesheetPlayerEntity> {
  protected override __create(): RawSpritesheetPlayerEntity {
    return createSpritesheetPlayer() as RawSpritesheetPlayerEntity;
  }

  static fromRaw(raw: RawSpritesheetPlayer): SpritesheetPlayer {
    return Entity.getOrCreate(raw as RawSpritesheetPlayerEntity, SpritesheetPlayer)!;
  }

  getFrame(spritesheet: Readonly<Spritesheet>): SpritesheetFrame | null {
    const raw = getSpritesheetPlayerFrame(this.__raw, spritesheet.raw);
    return raw ? SpritesheetFrame.fromRaw(raw) : null;
  }

  play(animation: Readonly<SpritesheetAnimation> | null, restart: boolean = true): void {
    playSpritesheetAnimation(this.__raw, animation ? animation.raw : null, restart);
  }

  queue(animation: Readonly<SpritesheetAnimation>): void {
    queueSpritesheetAnimation(this.__raw, animation.raw);
  }

  update(deltaTime: number): boolean {
    return updateSpritesheetPlayer(this.__raw, deltaTime);
  }

  get animation(): SpritesheetAnimation | null {
    return this.__raw.animation ? SpritesheetAnimation.fromRaw(this.__raw.animation) : null;
  }

  get complete(): boolean {
    return this.__raw.complete;
  }

  set complete(value: boolean) {
    this.__raw.complete = value;
  }

  get elapsed(): number {
    return this.__raw.elapsed;
  }

  set elapsed(value: number) {
    this.__raw.elapsed = value;
  }

  get frameIndex(): number {
    return this.__raw.frameIndex;
  }

  set frameIndex(value: number) {
    this.__raw.frameIndex = value;
  }

  get onComplete(): Signal<() => void> {
    return Signal.fromRaw(this.__raw.onComplete);
  }

  get onLoop(): Signal<() => void> {
    return Signal.fromRaw(this.__raw.onLoop);
  }

  override get raw(): RawSpritesheetPlayerEntity {
    return this.__raw;
  }
}
