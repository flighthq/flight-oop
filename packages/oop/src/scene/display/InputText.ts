import {
  appendInputText,
  createInputText,
  deleteInputTextBackward,
  deleteInputTextForward,
  getInputTextCaretIndex,
  getInputTextCaretRectangle,
  getInputTextCharacterIndexAtPoint,
  getInputTextDisplayText,
  getInputTextSelectionBeginIndex,
  getInputTextSelectionEndIndex,
  getInputTextSelectionRectangles,
  getInputTextSelectionText,
  handleInputTextKeyboard,
  insertInputText,
  invalidateAppearance,
  moveInputTextCaret,
  replaceInputText,
  replaceSelectedInputText,
  selectAllInputText,
  selectLineAtInputTextIndex,
  selectWordAtInputTextIndex,
  setInputTextSelection,
} from '../../internal/sdkCompat.js';
import type {
  HandleInputTextKeyboardOptions,
  InputKeyboardData,
  InputText as RawInputText,
  InputTextData,
  InputTextSelectionRectangle,
  ReplaceInputTextOptions,
  TextLayoutResult,
} from '../../internal/sdkCompat.js';

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

  append(text: string): void {
    appendInputText(this.raw, text);
  }

  deleteBackward(): void {
    deleteInputTextBackward(this.raw);
  }

  deleteForward(): void {
    deleteInputTextForward(this.raw);
  }

  getCaretRectangle(layout: Readonly<TextLayoutResult>): InputTextSelectionRectangle {
    const out = { height: 0, lineIndex: 0, width: 0, x: 0, y: 0 };
    getInputTextCaretRectangle(out, this.raw, layout);
    return out;
  }

  getCharacterIndexAtPoint(layout: Readonly<TextLayoutResult>, x: number, y: number): number {
    return getInputTextCharacterIndexAtPoint(this.raw, layout, x, y);
  }

  getSelectionRectangles(layout: Readonly<TextLayoutResult>): InputTextSelectionRectangle[] {
    const out: InputTextSelectionRectangle[] = [];
    getInputTextSelectionRectangles(out, this.raw, layout);
    return out;
  }

  handleKeyboard(data: Readonly<InputKeyboardData>, options?: Readonly<HandleInputTextKeyboardOptions>): boolean {
    return handleInputTextKeyboard(this.raw, data, options);
  }

  insert(text: string): void {
    insertInputText(this.raw, text);
  }

  moveCaret(index: number, extendSelection = false): void {
    moveInputTextCaret(this.raw, index, extendSelection);
  }

  replace(beginIndex: number, endIndex: number, text: string, options?: Readonly<ReplaceInputTextOptions>): void {
    replaceInputText(this.raw, beginIndex, endIndex, text, options);
  }

  replaceSelected(text: string, options?: Readonly<ReplaceInputTextOptions>): void {
    replaceSelectedInputText(this.raw, text, options);
  }

  selectAll(): void {
    selectAllInputText(this.raw);
  }

  selectLineAt(index: number): void {
    selectLineAtInputTextIndex(this.raw, index);
  }

  selectWordAt(index: number): void {
    selectWordAtInputTextIndex(this.raw, index);
  }

  setSelection(beginIndex: number, endIndex: number): void {
    setInputTextSelection(this.raw, beginIndex, endIndex);
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

  get caretIndex(): number {
    return getInputTextCaretIndex(this.raw);
  }

  get displayText(): string {
    return getInputTextDisplayText(this.raw);
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

  get selectionBeginIndex(): number {
    return getInputTextSelectionBeginIndex(this.raw);
  }

  get selectionEndIndex(): number {
    return getInputTextSelectionEndIndex(this.raw);
  }

  get selectionText(): string {
    return getInputTextSelectionText(this.raw);
  }
}
