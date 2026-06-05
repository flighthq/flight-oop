import {
  cancelSignal,
  connectSignal,
  createSignal,
  disconnectAllSignals,
  disconnectSignal,
  emitSignal,
  isSlotConnected,
} from '../internal/sdkCompat.js';
import type { Entity as RawEntity, Signal as RawSignal, SignalConnectOptions } from '../internal/sdkCompat.js';

import Entity from '../Entity.js';

type RawSignalEntity<T extends (...args: any[]) => void> = RawEntity & RawSignal<T>;

export default class Signal<T extends (...args: any[]) => void> extends Entity<RawSignalEntity<T>> {
  protected override __create(): RawSignalEntity<T> {
    return createSignal<T>() as RawSignalEntity<T>;
  }

  cancel(): void {
    cancelSignal(this.__raw);
  }

  connect(slot: T, options?: Readonly<SignalConnectOptions>): void {
    connectSignal(this.__raw, slot, options);
  }

  disconnect(slot: T): void {
    disconnectSignal(this.__raw, slot);
  }

  disconnectAll(): void {
    disconnectAllSignals(this.__raw);
  }

  emit(...args: Parameters<T>): void {
    emitSignal(this.__raw, ...args);
  }

  static fromRaw<T extends (...args: any[]) => void>(raw: RawSignal<T>): Signal<T> {
    return Entity.getOrCreate(raw as RawSignalEntity<T>, Signal<T>)!;
  }

  isConnected(slot: T): boolean {
    return isSlotConnected(this.__raw, slot);
  }

  override get raw(): RawSignalEntity<T> {
    return this.__raw;
  }
}
