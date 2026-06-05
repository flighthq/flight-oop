import {
  attachApplicationExit,
  connectSignalThrottled,
  createApplication,
  detachApplicationExit,
  disposeApplication,
  startApplicationLoop,
  stopApplicationLoop,
} from '../internal/sdkCompat.js';
import type { Application as RawApplication, Entity as RawEntity } from '../internal/sdkCompat.js';
import Entity from '../Entity.js';
import Signal from '../signals/Signal.js';

type RawApplicationEntity = RawEntity & RawApplication;

export default class Application extends Entity<RawApplicationEntity> {
  protected override __create(): RawApplicationEntity {
    return createApplication() as RawApplicationEntity;
  }

  attachExit(): void {
    attachApplicationExit(this.__raw);
  }

  connectUpdateThrottled(fps: number, slot: (deltaTime: number) => void): () => void {
    return connectSignalThrottled(this.__raw.onUpdate, fps, slot);
  }

  detachExit(): void {
    detachApplicationExit(this.__raw);
  }

  dispose(): void {
    disposeApplication(this.__raw);
  }

  static fromRaw(raw: RawApplication): Application {
    return Entity.getOrCreate(raw as RawApplicationEntity, Application)!;
  }

  startLoop(): void {
    startApplicationLoop(this.__raw);
  }

  stopLoop(): void {
    stopApplicationLoop(this.__raw);
  }

  get onExit(): Signal<() => void> {
    return Signal.fromRaw(this.__raw.onExit);
  }

  get onRender(): Signal<() => void> {
    return Signal.fromRaw(this.__raw.onRender);
  }

  get onUpdate(): Signal<(deltaTime: number) => void> {
    return Signal.fromRaw(this.__raw.onUpdate);
  }

  override get raw(): RawApplicationEntity {
    return this.__raw;
  }
}
