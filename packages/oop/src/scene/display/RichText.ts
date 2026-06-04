import {
  clearRichTextFormatRanges,
  createRichText,
  dispatchRichTextWheel,
  invalidateAppearance,
  invalidateLocalBounds,
  setRichTextFormatRange,
  setRichTextScrollH,
  setRichTextScrollV,
} from '../../internal/sdkCompat.js';
import type {
  RichText as RawRichText,
  RichTextData,
  RichTextStyleSheet,
  TextFormat,
} from '../../internal/sdkCompat.js';

import Entity from '../../Entity.js';
import Text from './Text.js';

export default class RichText extends Text {
  protected override __data: RichTextData;

  constructor(text?: string, width?: number, height?: number) {
    super();
    this.__data = this.__raw.data as RichTextData;
    if (text !== undefined) this.__data.text = text;
    if (width !== undefined) this.__data.width = width;
    if (height !== undefined) this.__data.height = height;
  }

  protected override __create() {
    return createRichText();
  }

  clearFormatRanges(): void {
    clearRichTextFormatRanges(this.raw);
    invalidateAppearance(this.__raw);
  }

  dispatchWheel(deltaLines: number): void {
    dispatchRichTextWheel(this.raw, deltaLines);
  }

  static override fromRaw(raw: RawRichText): RichText {
    return Entity.getOrCreate(raw, RichText)!;
  }

  override get raw(): RawRichText {
    return this.__raw as RawRichText;
  }

  setFormatRange(format: TextFormat, start: number = 0, end: number = this.__data.text.length): void {
    setRichTextFormatRange(this.raw, format, start, end);
    invalidateAppearance(this.__raw);
  }

  get background(): boolean {
    return this.__data.background;
  }

  set background(value: boolean) {
    if (value === this.__data.background) return;
    this.__data.background = value;
    invalidateAppearance(this.__raw);
  }

  get backgroundColor(): number {
    return this.__data.backgroundColor;
  }

  set backgroundColor(value: number) {
    if (value === this.__data.backgroundColor) return;
    this.__data.backgroundColor = value;
    invalidateAppearance(this.__raw);
  }

  get border(): boolean {
    return this.__data.border;
  }

  set border(value: boolean) {
    if (value === this.__data.border) return;
    this.__data.border = value;
    invalidateAppearance(this.__raw);
  }

  get borderColor(): number {
    return this.__data.borderColor;
  }

  set borderColor(value: number) {
    if (value === this.__data.borderColor) return;
    this.__data.borderColor = value;
    invalidateAppearance(this.__raw);
  }

  get condenseWhite(): boolean {
    return this.__data.condenseWhite;
  }

  set condenseWhite(value: boolean) {
    if (value === this.__data.condenseWhite) return;
    this.__data.condenseWhite = value;
    invalidateLocalBounds(this.__raw);
  }

  get defaultTextFormat(): TextFormat {
    return this.__data.defaultTextFormat;
  }

  set defaultTextFormat(value: TextFormat) {
    this.__data.defaultTextFormat = value;
    invalidateLocalBounds(this.__raw);
    invalidateAppearance(this.__raw);
  }

  get htmlText(): string {
    return this.__data.htmlText;
  }

  set htmlText(value: string) {
    if (value === this.__data.htmlText) return;
    this.__data.htmlText = value;
    invalidateLocalBounds(this.__raw);
    invalidateAppearance(this.__raw);
  }

  get maxChars(): number {
    return this.__data.maxChars;
  }

  set maxChars(value: number) {
    this.__data.maxChars = value;
  }

  get multiline(): boolean {
    return this.__data.multiline;
  }

  set multiline(value: boolean) {
    if (value === this.__data.multiline) return;
    this.__data.multiline = value;
    invalidateLocalBounds(this.__raw);
  }

  get scrollH(): number {
    return this.__data.scrollH;
  }

  set scrollH(value: number) {
    setRichTextScrollH(this.raw, value);
  }

  get scrollV(): number {
    return this.__data.scrollV;
  }

  set scrollV(value: number) {
    setRichTextScrollV(this.raw, value);
  }

  get selectable(): boolean {
    return this.__data.selectable;
  }

  set selectable(value: boolean) {
    this.__data.selectable = value;
  }

  get styleSheet(): RichTextStyleSheet | null {
    return this.__data.styleSheet;
  }

  set styleSheet(value: RichTextStyleSheet | null) {
    this.__data.styleSheet = value;
    invalidateLocalBounds(this.__raw);
    invalidateAppearance(this.__raw);
  }

  get textColor(): number {
    return this.__data.textColor;
  }

  set textColor(value: number) {
    if (value === this.__data.textColor) return;
    this.__data.textColor = value;
    invalidateAppearance(this.__raw);
  }

  get wordWrap(): boolean {
    return this.__data.wordWrap;
  }

  set wordWrap(value: boolean) {
    if (value === this.__data.wordWrap) return;
    this.__data.wordWrap = value;
    invalidateLocalBounds(this.__raw);
  }
}
