import {
  applyTween,
  createTween,
  createTweenManager,
  pauseAllTweens,
  pauseTweens,
  resetTweens,
  resumeAllTweens,
  resumeTweens,
  stopAllTweens,
  stopTween,
  updateTweens,
} from '../internal/sdkCompat.js';
import type {
  Entity as RawEntity,
  NumericProps,
  StopTweenOptions,
  TweenManager as RawTweenManager,
  TweenManagerOptions,
  TweenOptions,
} from '../internal/sdkCompat.js';
import Entity from '../Entity.js';
import Tween from './Tween.js';

type RawTweenManagerEntity = RawEntity & RawTweenManager;

export default class TweenManager extends Entity<RawTweenManagerEntity> {
  constructor(options?: Readonly<TweenManagerOptions>) {
    super();
    if (options?.defaultEase !== undefined) this.__raw.defaultEase = options.defaultEase;
  }

  protected override __create(): RawTweenManagerEntity {
    return createTweenManager() as RawTweenManagerEntity;
  }

  apply<T extends object>(target: T, propertyMap: Readonly<NumericProps<T>>): void {
    applyTween(this.__raw, target, propertyMap);
  }

  create<T extends object>(
    target: T,
    duration: number,
    propertyMap: Readonly<NumericProps<T>>,
    options?: Readonly<TweenOptions>,
  ): Tween<T> {
    return Tween.fromRaw(createTween(this.__raw, target, duration, propertyMap, options));
  }

  static fromRaw(raw: RawTweenManager): TweenManager {
    return Entity.getOrCreate(raw as RawTweenManagerEntity, TweenManager)!;
  }

  pauseAll(): void {
    pauseAllTweens(this.__raw);
  }

  pauseTarget(target: object): void {
    pauseTweens(this.__raw, target);
  }

  reset(): void {
    resetTweens(this.__raw);
  }

  resumeAll(): void {
    resumeAllTweens(this.__raw);
  }

  resumeTarget(target: object): void {
    resumeTweens(this.__raw, target);
  }

  stopAll(): void {
    stopAllTweens(this.__raw);
  }

  stopTarget(target: object, propertyMap?: Readonly<NumericProps<any>>, options?: Readonly<StopTweenOptions>): void {
    stopTween(this.__raw, target, propertyMap, options);
  }

  update(deltaTime: number): void {
    updateTweens(this.__raw, deltaTime);
  }

  override get raw(): RawTweenManagerEntity {
    return this.__raw;
  }
}
