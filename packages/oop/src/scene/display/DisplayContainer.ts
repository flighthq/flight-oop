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
} from '../../internal/sdkCompat.js';

import Entity from '../../Entity.js';
import DisplayObject from './DisplayObject.js';

export default class DisplayContainer extends DisplayObject {
  protected constructor() {
    super();
  }

  addChild(child: DisplayObject): DisplayObject {
    _addChild(this.__raw, child.raw);
    return child;
  }

  addChildAt(child: DisplayObject, index: number): DisplayObject {
    _addChildAt(this.__raw, child.raw, index);
    return child;
  }

  removeChild(child: DisplayObject): DisplayObject {
    _removeChild(this.__raw, child.raw);
    return child;
  }

  removeChildAt(index: number): DisplayObject | null {
    const raw = _removeChildAt(this.__raw, index);
    return Entity.get(raw) as DisplayObject | null;
  }

  removeChildren(beginIndex: number = 0, endIndex?: number): void {
    _removeChildren(this.__raw, beginIndex, endIndex);
  }

  setChildIndex(child: DisplayObject, index: number): void {
    _setChildIndex(this.__raw, child.raw, index);
  }

  swapChildren(child1: DisplayObject, child2: DisplayObject): void {
    _swapChildren(this.__raw, child1.raw, child2.raw);
  }

  swapChildrenAt(index1: number, index2: number): void {
    _swapChildrenAt(this.__raw, index1, index2);
  }

  // Get & Set Methods

  get numChildren() {
    return _getNumChildren(this.__raw);
  }
}
