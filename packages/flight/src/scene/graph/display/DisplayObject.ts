import {
  rectangle,
  hitTestObject as __hitTestObject,
  hitTestPoint as __hitTestPoint,
  calculateBoundsRect,
  getBoundsRect,
  getParent,
  globalToLocal2D,
  invalidate as __invalidate,
  invalidateAppearance,
  invalidateLocalTransform,
  localToGlobal2D,
  createDisplayObject,
  getDisplayObjectRuntime,
  StageKind,
} from '../../../internal/sdkCompat.js';
import type { BlendMode, DisplayObject as RawDisplayObject, Shader } from '../../../internal/sdkCompat.js';

import FlightObject from '../../../FlightObject.js';
import Rectangle from '../../../geometry/Rectangle.js';
import Vector2 from '../../../geometry/Vector2.js';
import type LoaderInfo from './LoaderInfo.js';
import type Stage from './Stage.js';
import Transform from './Transform.js';

export default class DisplayObject extends FlightObject<RawDisplayObject> {
  protected __loaderInfo: LoaderInfo | null = null;
  protected __root: DisplayObject | null = null;
  protected __transform: Transform | null = null;

  protected constructor() {
    super();
  }

  protected override __create() {
    return createDisplayObject();
  }

  getBounds(targetCoordinateSpace: DisplayObject | null): Rectangle {
    const out = new Rectangle();
    calculateBoundsRect(out.raw, this.__raw, targetCoordinateSpace?.raw);
    return out;
  }

  getRect(targetCoordinateSpace: DisplayObject | null | undefined): Rectangle {
    const out = new Rectangle();
    calculateBoundsRect(out.raw, this.__raw, targetCoordinateSpace?.raw);
    return out;
  }

  globalToLocal(pos: Readonly<Vector2>): Vector2 {
    const out = new Vector2();
    globalToLocal2D(out.raw, this.__raw, pos.raw);
    return out;
  }

  hitTestObject(other: DisplayObject): boolean {
    return __hitTestObject(this.__raw, other.raw);
  }

  hitTestPoint(x: number, y: number, _shapeFlag: boolean = false): boolean {
    return __hitTestPoint(this.__raw, x, y, _shapeFlag);
  }

  invalidate(): void {
    __invalidate(this.__raw);
  }

  localToGlobal(point: Readonly<Vector2>): Vector2 {
    const out = new Vector2();
    localToGlobal2D(out.raw, this.__raw, point.raw);
    return out;
  }

  // Get & Set Methods

  get alpha(): number {
    return this.__raw.alpha;
  }

  set alpha(value: number) {
    if (value > 1.0) value = 1.0;
    if (value < 0.0) value = 0.0;
    if (value === this.__raw.alpha) return;
    this.__raw.alpha = value;
    invalidateAppearance(this.__raw);
  }

  get blendMode(): BlendMode {
    return this.__raw.blendMode;
  }

  set blendMode(value: BlendMode) {
    if (value === this.__raw.blendMode) return;
    this.__raw.blendMode = value;
    invalidateAppearance(this.__raw);
  }

  get height(): number {
    return getBoundsRect(this.__raw).height;
  }

  set height(value: number) {
    const localBounds = getBoundsRect(this.__raw);
    if (localBounds.height === 0) return;
    // Invalidation (if necessary) occurs in scaleY setter
    this.scaleY = value / localBounds.height;
  }

  get loaderInfo(): LoaderInfo | null {
    // If loaderInfo was set by a Loader, return
    if (this.__loaderInfo !== null) return this.__loaderInfo;
    // Otherwise return info of root
    return (this.__root as DisplayObject)?.__loaderInfo ?? null;
  }

  get mask(): DisplayObject | null {
    if (this.__raw.mask !== null) {
      return FlightObject.get(this.__raw.mask);
    }
    return null;
  }

  set mask(value: DisplayObject | null) {
    if (value !== null) {
      if (this.__raw.mask === value.raw) return;
      this.__raw.mask = value.raw;
    } else {
      if (this.__raw.mask === null) return;
      this.__raw.mask = null;
    }
    invalidateAppearance(this.__raw);
  }

  get name(): string | null {
    return this.__raw.name;
  }

  set name(value: string | null) {
    this.__raw.name = value;
  }

  get parent(): DisplayObject | null {
    return FlightObject.get(getParent(this.__raw)) as DisplayObject | null;
  }

  get root(): DisplayObject | null {
    return this.__root;
  }

  private set root(value: DisplayObject | null) {
    this.__root = value;
  }

  get rotation(): number {
    return this.__raw.rotation;
  }

  set rotation(value: number) {
    if (value === this.__raw.rotation) return;
    // Normalize from -180 to 180
    value = value % 360.0;
    if (value > 180.0) {
      value -= 360.0;
    } else if (value < -180.0) {
      value += 360.0;
    }
    this.__raw.rotation = value;
    invalidateLocalTransform(this.__raw);
  }

  get scaleX(): number {
    return this.__raw.scaleX;
  }

  set scaleX(value: number) {
    if (value === this.__raw.scaleX) return;
    this.__raw.scaleX = value;
    invalidateLocalTransform(this.__raw);
  }

  get scaleY(): number {
    return this.__raw.scaleY;
  }

  set scaleY(value: number) {
    if (value === this.__raw.scaleY) return;
    this.__raw.scaleY = value;
    invalidateLocalTransform(this.__raw);
  }

  get scrollRectangle(): Rectangle | null {
    if (this.__raw.scrollRectangle === null) {
      return null;
    }
    return Rectangle.fromRaw(this.__raw.scrollRectangle);
  }

  set scrollRectangle(value: Rectangle | null) {
    const data = this.__raw;
    if (value === null && data.scrollRectangle === null) return;
    if (value !== null && data.scrollRectangle !== null && rectangle.equals(data.scrollRectangle, value)) return;

    if (value !== null) {
      if (data.scrollRectangle === null) data.scrollRectangle = rectangle.create();
      rectangle.copy(data.scrollRectangle, value);
    } else {
      data.scrollRectangle = null;
    }

    invalidateAppearance(this.__raw);
  }

  get shader(): Shader | null {
    return this.__raw.shader;
  }

  set shader(value: Shader | null) {
    if (value === this.__raw.shader) return;
    this.__raw.shader = value;
    invalidateAppearance(this.__raw);
  }

  get stage(): Stage | null {
    let current = getDisplayObjectRuntime(this.__raw).parent;
    while (current !== null) {
      if (current.kind === StageKind) return FlightObject.get(current) as Stage | null;
      current = getDisplayObjectRuntime(current as RawDisplayObject).parent;
    }
    return null;
  }

  get transform(): Transform {
    if (this.__transform === null) {
      this.__transform = new Transform(this);
    }
    return this.__transform;
  }

  set transform(value: Transform) {
    if (value === null) {
      throw new TypeError('Parameter transform must be non-null.');
    }

    if (this.__transform === null) {
      this.__transform = new Transform(this);
    }

    // if (value.__hasMatrix3x2)
    // {
    //     var other = value.__displayObject.__transform;
    //     __objectTransform.__setTransform(other.a, other.b, other.c, other.d, other.tx, other.ty);
    // }
    // else
    // {
    //     __objectTransform.__hasMatrix3x2 = false;
    // }

  }

  get visible(): boolean {
    return this.__raw.visible;
  }

  set visible(value: boolean) {
    if (value === this.__raw.visible) return;
    this.__raw.visible = value;
    invalidateAppearance(this.__raw);
  }

  get width(): number {
    return getBoundsRect(this.__raw).width;
  }

  set width(value: number) {
    const localBounds = getBoundsRect(this.__raw);
    if (localBounds.width === 0) return;
    // Invalidation (if necessary) occurs in scaleX setter
    this.scaleX = value / localBounds.width;
  }

  get x(): number {
    return this.__raw.x;
  }

  set x(value: number) {
    if (value !== value) value = 0; // convert NaN to 0
    if (value === this.__raw.x) return;
    this.__raw.x = value;
    invalidateLocalTransform(this.__raw);
  }

  get y(): number {
    return this.__raw.y;
  }

  set y(value: number) {
    if (value !== value) value = 0; // convert NaN to 0
    if (value === this.__raw.y) return;
    this.__raw.y = value;
    invalidateLocalTransform(this.__raw);
  }
}
