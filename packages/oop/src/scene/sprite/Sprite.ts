import {
  addChild as _addChild,
  addChildAt as _addChildAt,
  getNumChildren as _getNumChildren,
  removeChild as _removeChild,
  removeChildAt as _removeChildAt,
  removeChildren as _removeChildren,
  setChildIndex as _setChildIndex,
  swapChildren as _swapChildren,
  swapChildrenAt as _swapChildrenAt,
  createSprite,
} from '../../internal/sdkCompat.js';
import type { Sprite as RawSprite, SpriteData } from '../../internal/sdkCompat.js';

import Entity from '../../Entity';
import SpriteNode from './SpriteNode';

export default class Sprite extends SpriteNode {
  protected __data: SpriteData;

  constructor() {
    super();
    this.__data = this.__raw.data as SpriteData;
  }

  protected override __create() {
    return createSprite();
  }

  addChild(child: SpriteNode): SpriteNode {
    _addChild(this.__raw, child.raw);
    return child;
  }

  addChildAt(child: SpriteNode, index: number): SpriteNode {
    _addChildAt(this.__raw, child.raw, index);
    return child;
  }

  static fromRaw(raw: RawSprite): Sprite {
    return Entity.getOrCreate(raw, Sprite)!;
  }

  removeChild(child: SpriteNode): SpriteNode {
    _removeChild(this.__raw, child.raw);
    return child;
  }

  removeChildAt(index: number): SpriteNode | null {
    const raw = _removeChildAt(this.__raw, index);
    return Entity.get(raw);
  }

  removeChildren(beginIndex: number = 0, endIndex?: number): void {
    _removeChildren(this.__raw, beginIndex, endIndex);
  }

  setChildIndex(child: SpriteNode, index: number): void {
    _setChildIndex(this.__raw, child.raw, index);
  }

  swapChildren(child1: SpriteNode, child2: SpriteNode): void {
    _swapChildren(this.__raw, child1.raw, child2.raw);
  }

  swapChildrenAt(index1: number, index2: number): void {
    _swapChildrenAt(this.__raw, index1, index2);
  }

  // Get & Set Methods

  get id(): number {
    return this.__data.id;
  }

  set id(value: number) {
    this.__data.id = value;
  }

  get numChildren() {
    return _getNumChildren(this.__raw);
  }
}
