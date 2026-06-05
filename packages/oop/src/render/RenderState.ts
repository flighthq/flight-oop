import {
  beginFrame,
  createRenderNode,
  createRenderState,
  disableRenderFeatures,
  enableRenderFeatures,
  executeRenderCommands,
  hasRenderFeatures,
  registerRenderer,
  rgbaToHexString,
  setRenderStateBackgroundColor,
} from '../internal/sdkCompat.js';
import type {
  Entity as RawEntity,
  Renderable,
  RenderFeatures,
  Renderer,
  RenderState as RawRenderState,
} from '../internal/sdkCompat.js';

import Entity from '../Entity.js';
import RenderCommandPool from './RenderCommandPool.js';
import RenderNode from './RenderNode.js';

type RawRenderStateEntity = RawEntity & RawRenderState;

export default class RenderState extends Entity<RawRenderStateEntity> {
  protected override __create(): RawRenderStateEntity {
    return createRenderState() as RawRenderStateEntity;
  }

  beginFrame(): number {
    return beginFrame(this.__raw);
  }

  createNode(source: Readonly<Renderable>): RenderNode {
    return RenderNode.fromRaw(createRenderNode(this.__raw, source));
  }

  disableFeatures(features: RenderFeatures): void {
    disableRenderFeatures(this.__raw, features);
  }

  enableFeatures(features: RenderFeatures): void {
    enableRenderFeatures(this.__raw, features);
  }

  executeCommands(): void {
    executeRenderCommands(this.__raw);
  }

  static fromRaw(raw: RawRenderState): RenderState {
    return Entity.getOrCreate(raw as RawRenderStateEntity, RenderState)!;
  }

  hasFeatures(features: RenderFeatures): boolean {
    return hasRenderFeatures(this.__raw, features);
  }

  registerRenderer(kind: symbol, renderer: Renderer): void {
    registerRenderer(this.__raw, kind, renderer);
  }

  static rgbaToHexString(color: number): string {
    return rgbaToHexString(color);
  }

  get allowSmoothing(): boolean {
    return this.__raw.allowSmoothing;
  }

  set allowSmoothing(value: boolean) {
    this.__raw.allowSmoothing = value;
  }

  get backgroundColor(): number {
    return this.__raw.backgroundColor;
  }

  set backgroundColor(value: number) {
    setRenderStateBackgroundColor(this.__raw, value);
  }

  get commandPool(): RenderCommandPool {
    return RenderCommandPool.fromRaw(this.__raw.commandPool);
  }

  get currentFrameID(): number {
    return this.__raw.currentFrameID;
  }

  get pixelRatio(): number {
    return this.__raw.pixelRatio;
  }

  set pixelRatio(value: number) {
    this.__raw.pixelRatio = value;
  }

  get roundPixels(): boolean {
    return this.__raw.roundPixels;
  }

  set roundPixels(value: boolean) {
    this.__raw.roundPixels = value;
  }
}
