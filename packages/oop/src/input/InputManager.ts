import {
  attachGamepadInput,
  attachKeyboardInput,
  attachPointerInput,
  attachRelativePointerInput,
  attachTextInput,
  attachWheelInput,
  createInputManager,
  getKeyCodeFromDOMKeyboardEvent,
  getKeyModifierFromDOMKeyboardEvent,
  getMouseWheelModeFromDOMWheelEvent,
  pollGamepadInput,
} from '../internal/sdkCompat.js';
import type {
  Entity as RawEntity,
  InputKeyboardData,
  InputManager as RawInputManager,
  InputPointerData,
  MouseWheelMode,
  TextInputData,
} from '../internal/sdkCompat.js';
import Entity from '../Entity.js';
import Signal from '../signals/Signal.js';

type RawInputManagerEntity = RawEntity & RawInputManager;

export default class InputManager extends Entity<RawInputManagerEntity> {
  protected override __create(): RawInputManagerEntity {
    return createInputManager() as RawInputManagerEntity;
  }

  attachGamepad(target: Window): () => void {
    return attachGamepadInput(this.__raw, target);
  }

  attachKeyboard(target: Window | HTMLElement): () => void {
    return attachKeyboardInput(this.__raw, target);
  }

  attachPointer(element: HTMLElement): () => void {
    return attachPointerInput(this.__raw, element);
  }

  attachRelativePointer(element: HTMLElement): () => void {
    return attachRelativePointerInput(this.__raw, element);
  }

  attachText(element: HTMLElement): () => void {
    return attachTextInput(this.__raw, element);
  }

  attachWheel(element: HTMLElement): () => void {
    return attachWheelInput(this.__raw, element);
  }

  static fromRaw(raw: RawInputManager): InputManager {
    return Entity.getOrCreate(raw as RawInputManagerEntity, InputManager)!;
  }

  static getKeyCode(event: Readonly<KeyboardEvent>): number {
    return getKeyCodeFromDOMKeyboardEvent(event);
  }

  static getKeyModifier(event: Readonly<KeyboardEvent>): number {
    return getKeyModifierFromDOMKeyboardEvent(event);
  }

  static getMouseWheelMode(event: Readonly<WheelEvent>): MouseWheelMode {
    return getMouseWheelModeFromDOMWheelEvent(event);
  }

  pollGamepad(): void {
    pollGamepadInput(this.__raw);
  }

  get onKeyDown(): Signal<(data: Readonly<InputKeyboardData>) => void> {
    return Signal.fromRaw(this.__raw.onKeyDown);
  }

  get onKeyUp(): Signal<(data: Readonly<InputKeyboardData>) => void> {
    return Signal.fromRaw(this.__raw.onKeyUp);
  }

  get onPointerCancel(): Signal<(data: Readonly<InputPointerData>) => void> {
    return Signal.fromRaw(this.__raw.onPointerCancel);
  }

  get onPointerDown(): Signal<(data: Readonly<InputPointerData>) => void> {
    return Signal.fromRaw(this.__raw.onPointerDown);
  }

  get onPointerMove(): Signal<(data: Readonly<InputPointerData>) => void> {
    return Signal.fromRaw(this.__raw.onPointerMove);
  }

  get onPointerMoveRelative(): Signal<(data: Readonly<InputPointerData>) => void> {
    return Signal.fromRaw(this.__raw.onPointerMoveRelative);
  }

  get onPointerUp(): Signal<(data: Readonly<InputPointerData>) => void> {
    return Signal.fromRaw(this.__raw.onPointerUp);
  }

  get onTextEdit(): Signal<(data: Readonly<TextInputData>) => void> {
    return Signal.fromRaw(this.__raw.onTextEdit);
  }

  get onTextInput(): Signal<(data: Readonly<TextInputData>) => void> {
    return Signal.fromRaw(this.__raw.onTextInput);
  }

  get onWheel(): Signal<(data: Readonly<InputPointerData>) => void> {
    return Signal.fromRaw(this.__raw.onWheel);
  }

  override get raw(): RawInputManagerEntity {
    return this.__raw;
  }
}
