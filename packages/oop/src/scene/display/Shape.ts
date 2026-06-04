import {
  appendShapeBeginBitmapFill,
  appendShapeBeginFill,
  appendShapeBeginGradientFill,
  appendShapeCircle,
  appendShapeCubicCurveTo,
  appendShapeCurveTo,
  appendShapeEllipse,
  appendShapeEndFill,
  appendShapeLineBitmapStyle,
  appendShapeLineGradientStyle,
  appendShapeLineStyle,
  appendShapeLineTo,
  appendShapeMoveTo,
  appendShapePath,
  appendShapeRectangle,
  appendShapeRoundRectangle,
  appendShapeRoundRectanglePath,
  clearShapeCommands,
  copyShapeCommands,
  createShape,
  invalidateAppearance,
  invalidateLocalBounds,
} from '../../internal/sdkCompat.js';
import type {
  CapsStyle,
  GradientType,
  GraphicsPathWinding,
  InterpolationMethod,
  JointStyle,
  LineScaleMode,
  Shape as RawShape,
  ShapeData,
  SpreadMethod,
} from '../../internal/sdkCompat.js';

import ImageSource from '../../assets/ImageSource.js';
import Entity from '../../Entity.js';
import type Matrix from '../../geometry/Matrix.js';
import DisplayObject from './DisplayObject.js';

export default class Shape extends DisplayObject {
  protected __data: ShapeData;

  constructor() {
    super();
    this.__data = this.__raw.data as ShapeData;
  }

  protected override __create() {
    return createShape();
  }

  beginBitmapFill(bitmap: Readonly<ImageSource>, matrix: Readonly<Matrix> | null = null, repeat = true, smooth = false): this {
    appendShapeBeginBitmapFill(this.raw, bitmap.raw, matrix?.raw ?? null, repeat, smooth);
    this.invalidateShape();
    return this;
  }

  beginFill(color = 0, alpha = 1): this {
    appendShapeBeginFill(this.raw, color, alpha);
    this.invalidateShape();
    return this;
  }

  beginGradientFill(
    gradientType: GradientType,
    colors: number[],
    alphas: number[],
    ratios: number[],
    matrix: Readonly<Matrix> | null = null,
    spreadMethod: SpreadMethod = 'pad',
    interpolationMethod: InterpolationMethod = 'rgb',
    focalPointRatio = 0,
  ): this {
    appendShapeBeginGradientFill(
      this.raw,
      gradientType,
      colors,
      alphas,
      ratios,
      matrix?.raw ?? null,
      spreadMethod,
      interpolationMethod,
      focalPointRatio,
    );
    this.invalidateShape();
    return this;
  }

  clear(): void {
    clearShapeCommands(this.__data);
    this.invalidateShape();
  }

  copyFrom(source: Readonly<Shape>): void {
    copyShapeCommands(source.raw.data, this.__data);
    this.invalidateShape();
  }

  cubicCurveTo(controlX1: number, controlY1: number, controlX2: number, controlY2: number, anchorX: number, anchorY: number): this {
    appendShapeCubicCurveTo(this.raw, controlX1, controlY1, controlX2, controlY2, anchorX, anchorY);
    this.invalidateShape();
    return this;
  }

  curveTo(controlX: number, controlY: number, anchorX: number, anchorY: number): this {
    appendShapeCurveTo(this.raw, controlX, controlY, anchorX, anchorY);
    this.invalidateShape();
    return this;
  }

  drawCircle(x: number, y: number, radius: number): this {
    appendShapeCircle(this.raw, x, y, radius);
    this.invalidateShape();
    return this;
  }

  drawEllipse(x: number, y: number, width: number, height: number): this {
    appendShapeEllipse(this.raw, x, y, width, height);
    this.invalidateShape();
    return this;
  }

  drawPath(commands: number[], pathData: number[], winding: GraphicsPathWinding = 'evenOdd'): this {
    appendShapePath(this.raw, commands, pathData, winding);
    this.invalidateShape();
    return this;
  }

  drawRectangle(x: number, y: number, width: number, height: number): this {
    appendShapeRectangle(this.raw, x, y, width, height);
    this.invalidateShape();
    return this;
  }

  drawRoundRectangle(x: number, y: number, width: number, height: number, ellipseWidth: number, ellipseHeight: number): this {
    appendShapeRoundRectangle(this.raw, x, y, width, height, ellipseWidth, ellipseHeight);
    this.invalidateShape();
    return this;
  }

  drawRoundRectanglePath(
    x: number,
    y: number,
    width: number,
    height: number,
    topLeftRadius: number,
    topRightRadius: number,
    bottomLeftRadius: number,
    bottomRightRadius: number,
  ): this {
    appendShapeRoundRectanglePath(
      this.raw,
      x,
      y,
      width,
      height,
      topLeftRadius,
      topRightRadius,
      bottomLeftRadius,
      bottomRightRadius,
    );
    this.invalidateShape();
    return this;
  }

  endFill(): this {
    appendShapeEndFill(this.raw);
    this.invalidateShape();
    return this;
  }

  static fromRaw(raw: RawShape): Shape {
    return Entity.getOrCreate(raw, Shape)!;
  }

  lineBitmapStyle(bitmap: Readonly<ImageSource>, matrix: Readonly<Matrix> | null = null, repeat = true, smooth = false): this {
    appendShapeLineBitmapStyle(this.raw, bitmap.raw, matrix?.raw ?? null, repeat, smooth);
    this.invalidateShape();
    return this;
  }

  lineGradientStyle(
    gradientType: GradientType,
    colors: number[],
    alphas: number[],
    ratios: number[],
    matrix: Readonly<Matrix> | null = null,
    spreadMethod: SpreadMethod = 'pad',
    interpolationMethod: InterpolationMethod = 'rgb',
    focalPointRatio = 0,
  ): this {
    appendShapeLineGradientStyle(
      this.raw,
      gradientType,
      colors,
      alphas,
      ratios,
      matrix?.raw ?? null,
      spreadMethod,
      interpolationMethod,
      focalPointRatio,
    );
    this.invalidateShape();
    return this;
  }

  lineStyle(
    thickness = 1,
    color = 0,
    alpha = 1,
    pixelHinting = false,
    scaleMode: LineScaleMode = 'normal',
    caps: CapsStyle = 'none',
    joints: JointStyle = 'round',
    miterLimit = 3,
  ): this {
    appendShapeLineStyle(this.raw, thickness, color, alpha, pixelHinting, scaleMode, caps, joints, miterLimit);
    this.invalidateShape();
    return this;
  }

  lineTo(x: number, y: number): this {
    appendShapeLineTo(this.raw, x, y);
    this.invalidateShape();
    return this;
  }

  moveTo(x: number, y: number): this {
    appendShapeMoveTo(this.raw, x, y);
    this.invalidateShape();
    return this;
  }

  override get raw(): RawShape {
    return this.__raw as RawShape;
  }

  get commands(): readonly unknown[] {
    return this.__data.commands;
  }

  get version(): number {
    return this.__data.version;
  }

  protected invalidateShape(): void {
    invalidateLocalBounds(this.__raw);
    invalidateAppearance(this.__raw);
  }
}
