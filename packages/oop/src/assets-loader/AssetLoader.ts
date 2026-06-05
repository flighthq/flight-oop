import { createAssetLoader, queueAssetLoad, startAssetLoad } from '../internal/sdkCompat.js';
import type { AssetLoader as RawAssetLoader, Entity as RawEntity } from '../internal/sdkCompat.js';
import Entity from '../Entity.js';
import Signal from '../signals/Signal.js';

type RawAssetLoaderEntity = RawEntity & RawAssetLoader;

export default class AssetLoader extends Entity<RawAssetLoaderEntity> {
  protected override __create(): RawAssetLoaderEntity {
    return createAssetLoader() as RawAssetLoaderEntity;
  }

  static fromRaw(raw: RawAssetLoader): AssetLoader {
    return Entity.getOrCreate(raw as RawAssetLoaderEntity, AssetLoader)!;
  }

  queue<T>(factory: () => Promise<T>): Promise<T> {
    return queueAssetLoad(this.__raw, factory);
  }

  start(): void {
    startAssetLoad(this.__raw);
  }

  get onComplete(): Signal<() => void> {
    return Signal.fromRaw(this.__raw.onComplete);
  }

  get onError(): Signal<(error: unknown) => void> {
    return Signal.fromRaw(this.__raw.onError);
  }

  get onProgress(): Signal<(loaded: number, total: number) => void> {
    return Signal.fromRaw(this.__raw.onProgress);
  }
}
