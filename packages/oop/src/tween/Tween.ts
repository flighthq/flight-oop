import { pauseTween, resumeTween } from '../internal/sdkCompat.js';
import type { Entity as RawEntity, Tween as RawTween } from '../internal/sdkCompat.js';
import Entity from '../Entity.js';
import Signal from '../signals/Signal.js';

type RawTweenEntity<T extends object> = RawEntity & RawTween<T>;

export default class Tween<T extends object> extends Entity<RawTweenEntity<T>> {
  protected override __create(): RawTweenEntity<T> {
    throw new Error('Tween objects are created by TweenManager.create().');
  }

  static fromRaw<T extends object>(raw: RawTween<T>): Tween<T> {
    return Entity.getOrCreate(raw as RawTweenEntity<T>, Tween<T>)!;
  }

  pause(): void {
    pauseTween(this.__raw);
  }

  resume(): void {
    resumeTween(this.__raw);
  }

  stop(): void {
    this.__raw.complete = true;
  }

  get complete(): boolean {
    return this.__raw.complete;
  }

  set complete(value: boolean) {
    this.__raw.complete = value;
  }

  get duration(): number {
    return this.__raw.duration;
  }

  get elapsed(): number {
    return this.__raw.elapsed;
  }

  get onComplete(): Signal<() => void> {
    return Signal.fromRaw(this.__raw.onComplete);
  }

  get onRepeat(): Signal<() => void> {
    return Signal.fromRaw(this.__raw.onRepeat);
  }

  get onUpdate(): Signal<() => void> {
    return Signal.fromRaw(this.__raw.onUpdate);
  }

  get paused(): boolean {
    return this.__raw.paused;
  }

  override get raw(): RawTweenEntity<T> {
    return this.__raw;
  }

  get target(): T {
    return this.__raw.target;
  }
}
