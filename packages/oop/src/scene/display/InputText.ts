import { createInputText, invalidateAppearance } from '../../internal/sdkCompat.js';
import type { InputText as RawInputText, InputTextData } from '../../internal/sdkCompat.js';

import Entity from '../../Entity.js';
import RichText from './RichText.js';

export default class InputText extends RichText {
  protected override __data: InputTextData;

  constructor(text?: string, width?: number, height?: number) {
    super();
    this.__data = this.__raw.data as InputTextData;
    if (text !== undefined) this.__data.text = text;
    if (width !== undefined) this.__data.width = width;
    if (height !== undefined) this.__data.height = height;
  }

  protected override __create() {
    return createInputText();
  }

  static override fromRaw(raw: RawInputText): InputText {
    return Entity.getOrCreate(raw, InputText)!;
  }

  override get raw(): RawInputText {
    return this.__raw as RawInputText;
  }

  get alwaysShowSelection(): boolean {
    return this.__data.alwaysShowSelection;
  }

  set alwaysShowSelection(value: boolean) {
    if (value === this.__data.alwaysShowSelection) return;
    this.__data.alwaysShowSelection = value;
    invalidateAppearance(this.__raw);
  }

  get displayAsPassword(): boolean {
    return this.__data.displayAsPassword;
  }

  set displayAsPassword(value: boolean) {
    if (value === this.__data.displayAsPassword) return;
    this.__data.displayAsPassword = value;
    invalidateAppearance(this.__raw);
  }

  get passwordCharacter(): string {
    return this.__data.passwordCharacter;
  }

  set passwordCharacter(value: string) {
    if (value === this.__data.passwordCharacter) return;
    this.__data.passwordCharacter = value;
    invalidateAppearance(this.__raw);
  }

  get restrict(): string {
    return this.__data.restrict;
  }

  set restrict(value: string) {
    this.__data.restrict = value;
  }

  get selectionAlpha(): number {
    return this.__data.selectionAlpha;
  }

  set selectionAlpha(value: number) {
    if (value === this.__data.selectionAlpha) return;
    this.__data.selectionAlpha = value;
    invalidateAppearance(this.__raw);
  }

  get selectionColor(): number {
    return this.__data.selectionColor;
  }

  set selectionColor(value: number) {
    if (value === this.__data.selectionColor) return;
    this.__data.selectionColor = value;
    invalidateAppearance(this.__raw);
  }
}
