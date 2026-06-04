import { createText, invalidateAppearance, invalidateLocalBounds } from '../../internal/sdkCompat.js';
import type { Text as RawText, TextAutoSize, TextData, TextFormat } from '../../internal/sdkCompat.js';

import Entity from '../../Entity.js';
import DisplayObject from './DisplayObject.js';

export default class Text extends DisplayObject {
  protected __data: TextData;

  constructor(text?: string, width?: number, height?: number) {
    super();
    this.__data = this.__raw.data as TextData;
    if (text !== undefined) this.__data.text = text;
    if (width !== undefined) this.__data.width = width;
    if (height !== undefined) this.__data.height = height;
  }

  protected override __create() {
    return createText();
  }

  static fromRaw(raw: RawText): Text {
    return Entity.getOrCreate(raw, Text)!;
  }

  override get raw(): RawText {
    return this.__raw as RawText;
  }

  get autoSize(): TextAutoSize {
    return this.__data.autoSize;
  }

  set autoSize(value: TextAutoSize) {
    if (value === this.__data.autoSize) return;
    this.__data.autoSize = value;
    invalidateLocalBounds(this.__raw);
  }

  override get height(): number {
    return this.__data.height;
  }

  override set height(value: number) {
    if (value === this.__data.height) return;
    this.__data.height = value;
    invalidateLocalBounds(this.__raw);
  }

  get text(): string {
    return this.__data.text;
  }

  set text(value: string) {
    if (value === this.__data.text) return;
    this.__data.text = value;
    invalidateLocalBounds(this.__raw);
    invalidateAppearance(this.__raw);
  }

  get textFormat(): TextFormat {
    return this.__data.textFormat;
  }

  set textFormat(value: TextFormat) {
    this.__data.textFormat = value;
    invalidateLocalBounds(this.__raw);
    invalidateAppearance(this.__raw);
  }

  override get width(): number {
    return this.__data.width;
  }

  override set width(value: number) {
    if (value === this.__data.width) return;
    this.__data.width = value;
    invalidateLocalBounds(this.__raw);
  }
}
