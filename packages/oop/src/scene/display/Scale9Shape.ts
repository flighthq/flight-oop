import { createScale9Shape } from '../../internal/sdkCompat.js';
import type { Scale9Shape as RawScale9Shape, Scale9ShapeData } from '../../internal/sdkCompat.js';

import Entity from '../../Entity.js';
import Rectangle from '../../geometry/Rectangle.js';
import Shape from './Shape.js';

export default class Scale9Shape extends Shape {
  private static nextScale9Grid: Rectangle | null = null;

  protected override __data: Scale9ShapeData;

  constructor(scale9Grid?: Readonly<Rectangle>) {
    if (scale9Grid !== undefined) {
      Scale9Shape.nextScale9Grid = scale9Grid.clone();
    }
    super();
    this.__data = this.__raw.data as Scale9ShapeData;
    Scale9Shape.nextScale9Grid = null;
  }

  protected override __create() {
    const scale9Grid = Scale9Shape.nextScale9Grid ?? new Rectangle();
    return createScale9Shape(scale9Grid.raw);
  }

  static override fromRaw(raw: RawScale9Shape): Scale9Shape {
    return Entity.getOrCreate(raw, Scale9Shape)!;
  }

  override get raw(): RawScale9Shape {
    return this.__raw as RawScale9Shape;
  }

  get scale9Grid(): Rectangle {
    const grid = this.__data.scale9Grid;
    return new Rectangle(grid.x, grid.y, grid.width, grid.height);
  }
}
