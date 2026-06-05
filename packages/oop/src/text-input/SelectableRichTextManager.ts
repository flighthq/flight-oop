import {
  blurSelectableRichText,
  createSelectableRichTextManager,
  dispatchSelectableRichTextKeyDown,
  dispatchSelectableRichTextPointerDown,
  dispatchSelectableRichTextPointerMove,
  dispatchSelectableRichTextWheel,
  focusSelectableRichText,
  getSelectableRichTextSelectionText,
} from '../internal/sdkCompat.js';
import type {
  Entity as RawEntity,
  InputKeyboardData,
  SelectableRichTextManager as RawSelectableRichTextManager,
} from '../internal/sdkCompat.js';
import Entity from '../Entity.js';
import RichText from '../scene/display/RichText.js';

type RawSelectableRichTextManagerEntity = RawEntity & RawSelectableRichTextManager;

export default class SelectableRichTextManager extends Entity<RawSelectableRichTextManagerEntity> {
  protected override __create(): RawSelectableRichTextManagerEntity {
    return createSelectableRichTextManager() as RawSelectableRichTextManagerEntity;
  }

  blur(): void {
    blurSelectableRichText(this.__raw);
  }

  dispatchKeyDown(data: Readonly<InputKeyboardData>): boolean {
    return dispatchSelectableRichTextKeyDown(this.__raw, data);
  }

  dispatchPointerDown(target: Readonly<RichText>, x: number, y: number, extend = false): void {
    dispatchSelectableRichTextPointerDown(this.__raw, target.raw, x, y, extend);
  }

  dispatchPointerMove(x: number, y: number): void {
    dispatchSelectableRichTextPointerMove(this.__raw, x, y);
  }

  dispatchWheel(deltaLines: number): void {
    dispatchSelectableRichTextWheel(this.__raw, deltaLines);
  }

  focus(target: Readonly<RichText>): void {
    focusSelectableRichText(this.__raw, target.raw);
  }

  static fromRaw(raw: RawSelectableRichTextManager): SelectableRichTextManager {
    return Entity.getOrCreate(raw as RawSelectableRichTextManagerEntity, SelectableRichTextManager)!;
  }

  get focused(): RichText | null {
    return this.__raw.focused ? RichText.fromRaw(this.__raw.focused) : null;
  }

  get selectionText(): string {
    return getSelectableRichTextSelectionText(this.__raw);
  }
}
