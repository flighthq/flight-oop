import {
  capturePointer,
  connectInputToInteraction,
  connectInteractionSignal,
  createInteractionManager,
  dispatchContextMenu,
  dispatchKeyDown,
  dispatchKeyUp,
  dispatchPointerCancel,
  dispatchPointerDown,
  dispatchPointerMove,
  dispatchPointerUp,
  dispatchWheel,
  disconnectInteractionSignal,
  getInteractionSignals,
  releasePointer,
} from '../internal/sdkCompat.js';
import type {
  Entity as RawEntity,
  InteractionManager as RawInteractionManager,
  InteractionManagerOptions,
  InteractionSignals,
  KeyboardData,
  PointerData,
  SceneNode,
  SignalConnectOptions,
} from '../internal/sdkCompat.js';
import Entity from '../Entity.js';
import InputManager from '../input/InputManager.js';
import Signal from '../signals/Signal.js';

type InteractionSignalName = keyof InteractionSignals;
type InteractionPayload<Name extends InteractionSignalName> = Name extends 'onKeyDown' | 'onKeyUp'
  ? Readonly<KeyboardData>
  : Readonly<PointerData>;
type InteractionSlot<Name extends InteractionSignalName> = (data: InteractionPayload<Name>) => void;

type RawInteractionManagerEntity = RawEntity & RawInteractionManager;

export default class InteractionManager extends Entity<RawInteractionManagerEntity> {
  constructor(root?: Readonly<Entity<SceneNode>>, options?: Readonly<InteractionManagerOptions>) {
    super();
    if (root !== undefined) this.__raw.root = root.raw;
    if (options?.enabled !== undefined) this.__raw.enabled = options.enabled;
    if (options?.trackedSubscribersOnly !== undefined) this.__raw.trackedSubscribersOnly = options.trackedSubscribersOnly;
  }

  protected override __create(): RawInteractionManagerEntity {
    return createInteractionManager({} as SceneNode) as RawInteractionManagerEntity;
  }

  capturePointer(pointerId: number, target: Readonly<Entity<SceneNode>>): void {
    capturePointer(this.__raw, pointerId, target.raw);
  }

  connectInput(input: Readonly<InputManager>, coordScale?: number): () => void {
    return connectInputToInteraction(input.raw, this.__raw, coordScale);
  }

  connectSignal<Name extends InteractionSignalName>(
    target: Readonly<Entity<SceneNode>>,
    name: Name,
    slot: InteractionSlot<Name>,
    options?: Readonly<SignalConnectOptions>,
  ): void {
    connectInteractionSignal(this.__raw, target.raw, name, slot as any, options);
  }

  disconnectSignal<Name extends InteractionSignalName>(
    target: Readonly<Entity<SceneNode>>,
    name: Name,
    slot: InteractionSlot<Name>,
  ): void {
    disconnectInteractionSignal(this.__raw, target.raw, name, slot as any);
  }

  dispatchContextMenu(x: number, y: number, button: number = 2): void {
    dispatchContextMenu(this.__raw, x, y, button);
  }

  dispatchKeyDown(key: string, keyCode: number = 0, modifiers?: Readonly<Partial<KeyboardData>>): void {
    dispatchKeyDown(this.__raw, key, keyCode, modifiers);
  }

  dispatchKeyUp(key: string, keyCode: number = 0, modifiers?: Readonly<Partial<KeyboardData>>): void {
    dispatchKeyUp(this.__raw, key, keyCode, modifiers);
  }

  dispatchPointerCancel(x: number, y: number): void {
    dispatchPointerCancel(this.__raw, x, y);
  }

  dispatchPointerDown(x: number, y: number, button: number = 0): void {
    dispatchPointerDown(this.__raw, x, y, button);
  }

  dispatchPointerMove(x: number, y: number, button: number = 0): void {
    dispatchPointerMove(this.__raw, x, y, button);
  }

  dispatchPointerUp(x: number, y: number, button: number = 0, time: number = Date.now()): void {
    dispatchPointerUp(this.__raw, x, y, button, time);
  }

  dispatchWheel(x: number, y: number, deltaX: number = 0, deltaY: number = 0): void {
    dispatchWheel(this.__raw, x, y, deltaX, deltaY);
  }

  static fromRaw(raw: RawInteractionManager): InteractionManager {
    return Entity.getOrCreate(raw as RawInteractionManagerEntity, InteractionManager)!;
  }

  getSignal<Name extends InteractionSignalName>(target: Readonly<Entity<SceneNode>>, name: Name): Signal<any> {
    return Signal.fromRaw(getInteractionSignals(target.raw)[name] as any);
  }

  releasePointer(pointerId: number): void {
    releasePointer(this.__raw, pointerId);
  }

  get doubleClickDelay(): number {
    return this.__raw.doubleClickDelay;
  }

  set doubleClickDelay(value: number) {
    this.__raw.doubleClickDelay = value;
  }

  get enabled(): boolean {
    return this.__raw.enabled;
  }

  set enabled(value: boolean) {
    this.__raw.enabled = value;
  }

  override get raw(): RawInteractionManagerEntity {
    return this.__raw;
  }
}
