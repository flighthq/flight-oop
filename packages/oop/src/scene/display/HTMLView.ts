import { createHTMLView, invalidateAppearance, setHTMLViewSize } from '../../internal/sdkCompat.js';
import type { HTMLView as RawHTMLView, HTMLViewData } from '../../internal/sdkCompat.js';

import Entity from '../../Entity.js';
import DisplayObject from './DisplayObject.js';

export default class HTMLView extends DisplayObject {
  protected __data: HTMLViewData;

  constructor(element?: HTMLElement | null, width?: number, height?: number) {
    super();
    this.__data = this.__raw.data as HTMLViewData;
    if (element !== undefined) this.__data.element = element;
    if (width !== undefined || height !== undefined) {
      setHTMLViewSize(this.raw, width ?? this.__data.width, height ?? this.__data.height);
    }
  }

  protected override __create() {
    return createHTMLView();
  }

  static fromRaw(raw: RawHTMLView): HTMLView {
    return Entity.getOrCreate(raw, HTMLView)!;
  }

  override get raw(): RawHTMLView {
    return this.__raw as RawHTMLView;
  }

  get element(): HTMLElement | null {
    return this.__data.element;
  }

  set element(value: HTMLElement | null) {
    if (value === this.__data.element) return;
    this.__data.element = value;
    invalidateAppearance(this.__raw);
  }

  override get height(): number {
    return this.__data.height;
  }

  override set height(value: number) {
    setHTMLViewSize(this.raw, this.__data.width, value);
  }

  override get width(): number {
    return this.__data.width;
  }

  override set width(value: number) {
    setHTMLViewSize(this.raw, value, this.__data.height);
  }
}
