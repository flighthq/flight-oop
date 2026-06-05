import {
  attachWindowDropFile,
  attachWindowFocus,
  attachWindowFullscreen,
  attachWindowOrientation,
  attachWindowRenderContext,
  attachWindowResize,
  attachWindowVisibility,
  createApplicationWindow,
  detachWindowDropFile,
  detachWindowFocus,
  detachWindowFullscreen,
  detachWindowOrientation,
  detachWindowRenderContext,
  detachWindowResize,
  detachWindowVisibility,
  disposeApplicationWindow,
  exitFullscreen,
  lockElement,
  requestFullscreen,
} from '../internal/sdkCompat.js';
import type { ApplicationWindow as RawApplicationWindow, Entity as RawEntity } from '../internal/sdkCompat.js';
import Entity from '../Entity.js';
import Signal from '../signals/Signal.js';

type RawApplicationWindowEntity = RawEntity & RawApplicationWindow;

export default class ApplicationWindow extends Entity<RawApplicationWindowEntity> {
  protected override __create(): RawApplicationWindowEntity {
    return createApplicationWindow() as RawApplicationWindowEntity;
  }

  attachDropFile(element: HTMLElement): void {
    attachWindowDropFile(this.__raw, element);
  }

  attachFocus(element: HTMLElement): void {
    attachWindowFocus(this.__raw, element);
  }

  attachFullscreen(): void {
    attachWindowFullscreen(this.__raw);
  }

  attachOrientation(): void {
    attachWindowOrientation(this.__raw);
  }

  attachRenderContext(canvas: HTMLCanvasElement): void {
    attachWindowRenderContext(this.__raw, canvas);
  }

  attachResize(element: HTMLElement): void {
    attachWindowResize(this.__raw, element);
  }

  attachVisibility(): void {
    attachWindowVisibility(this.__raw);
  }

  detachDropFile(): void {
    detachWindowDropFile(this.__raw);
  }

  detachFocus(): void {
    detachWindowFocus(this.__raw);
  }

  detachFullscreen(): void {
    detachWindowFullscreen(this.__raw);
  }

  detachOrientation(): void {
    detachWindowOrientation(this.__raw);
  }

  detachRenderContext(): void {
    detachWindowRenderContext(this.__raw);
  }

  detachResize(): void {
    detachWindowResize(this.__raw);
  }

  detachVisibility(): void {
    detachWindowVisibility(this.__raw);
  }

  dispose(): void {
    disposeApplicationWindow(this.__raw);
  }

  static exitFullscreen(): Promise<void> {
    return exitFullscreen();
  }

  static fromRaw(raw: RawApplicationWindow): ApplicationWindow {
    return Entity.getOrCreate(raw as RawApplicationWindowEntity, ApplicationWindow)!;
  }

  static lockElement(element: HTMLElement): void {
    lockElement(element);
  }

  static requestFullscreen(element: HTMLElement): Promise<void> {
    return requestFullscreen(element);
  }

  get devicePixelRatio(): number {
    return this.__raw.devicePixelRatio;
  }

  set devicePixelRatio(value: number) {
    this.__raw.devicePixelRatio = value;
  }

  get height(): number {
    return this.__raw.height;
  }

  set height(value: number) {
    this.__raw.height = value;
  }

  get onActivate(): Signal<() => void> {
    return Signal.fromRaw(this.__raw.onActivate);
  }

  get onClose(): Signal<() => void> {
    return Signal.fromRaw(this.__raw.onClose);
  }

  get onDeactivate(): Signal<() => void> {
    return Signal.fromRaw(this.__raw.onDeactivate);
  }

  get onDropFile(): Signal<(path: string) => void> {
    return Signal.fromRaw(this.__raw.onDropFile);
  }

  get onFocusIn(): Signal<() => void> {
    return Signal.fromRaw(this.__raw.onFocusIn);
  }

  get onFocusOut(): Signal<() => void> {
    return Signal.fromRaw(this.__raw.onFocusOut);
  }

  get onFullscreenChanged(): Signal<() => void> {
    return Signal.fromRaw(this.__raw.onFullscreenChanged);
  }

  get onResize(): Signal<() => void> {
    return Signal.fromRaw(this.__raw.onResize);
  }

  override get raw(): RawApplicationWindowEntity {
    return this.__raw;
  }

  get width(): number {
    return this.__raw.width;
  }

  set width(value: number) {
    this.__raw.width = value;
  }
}
