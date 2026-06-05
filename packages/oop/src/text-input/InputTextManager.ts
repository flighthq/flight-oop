import {
  blurInputText,
  connectInputToInputText,
  createInputTextManager,
  dispatchInputTextInput,
  dispatchInputTextKeyDown,
  dispatchInputTextPointerDown,
  dispatchInputTextPointerMove,
  dispatchInputTextWheel,
  focusInputText,
} from '../internal/sdkCompat.js';
import type { Entity as RawEntity, InputKeyboardData, InputTextManager as RawInputTextManager } from '../internal/sdkCompat.js';
import Entity from '../Entity.js';
import InputManager from '../input/InputManager.js';
import InputText from '../scene/display/InputText.js';

type RawInputTextManagerEntity = RawEntity & RawInputTextManager;

export default class InputTextManager extends Entity<RawInputTextManagerEntity> {
  protected override __create(): RawInputTextManagerEntity {
    return createInputTextManager() as RawInputTextManagerEntity;
  }

  blur(): void {
    blurInputText(this.__raw);
  }

  connectInput(input: Readonly<InputManager>): () => void {
    return connectInputToInputText(input.raw, this.__raw);
  }

  dispatchInput(text: string): boolean {
    return dispatchInputTextInput(this.__raw, text);
  }

  dispatchKeyDown(data: Readonly<InputKeyboardData>, clipboardText?: string): boolean {
    return dispatchInputTextKeyDown(this.__raw, data, clipboardText);
  }

  dispatchPointerDown(target: Readonly<InputText>, x: number, y: number, extend = false, clickCount = 1): void {
    dispatchInputTextPointerDown(this.__raw, target.raw, x, y, extend, clickCount);
  }

  dispatchPointerMove(x: number, y: number): void {
    dispatchInputTextPointerMove(this.__raw, x, y);
  }

  dispatchWheel(deltaLines: number): void {
    dispatchInputTextWheel(this.__raw, deltaLines);
  }

  focus(target: Readonly<InputText>): void {
    focusInputText(this.__raw, target.raw);
  }

  static fromRaw(raw: RawInputTextManager): InputTextManager {
    return Entity.getOrCreate(raw as RawInputTextManagerEntity, InputTextManager)!;
  }

  get enabled(): boolean {
    return this.__raw.enabled;
  }

  set enabled(value: boolean) {
    this.__raw.enabled = value;
  }

  get focused(): InputText | null {
    return this.__raw.focused ? InputText.fromRaw(this.__raw.focused) : null;
  }
}
