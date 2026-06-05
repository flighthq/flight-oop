import {
  applySurfaceBlurFilter,
  applySurfaceColorMatrixFilter,
  applySurfaceColorTransform,
  applySurfaceConvolutionFilter,
  applySurfaceDropShadowFilter,
  applySurfaceGlowFilter,
  applySurfaceThreshold,
  cloneSurface,
  compareSurface,
  copySurfaceChannel,
  copySurfacePixels,
  createImageSourceFromSurface,
  createSurface,
  createSurfaceFromCanvas,
  createSurfaceFromImageSource,
  drawSurface,
  encodeSurface,
  fillSurfaceRectangle,
  floodFillSurface,
  getSurfaceColorBoundsRectangle,
  getSurfacePixel,
  getSurfacePixel32,
  getSurfacePixels,
  mergeSurface,
  scrollSurface,
  setSurfacePixel,
  setSurfacePixel32,
  setSurfacePixels,
} from '../internal/sdkCompat.js';
import type {
  ColorBoundsRectangle,
  ColorTransformLike,
  ImageChannel,
  ImageFormat,
  Surface as RawSurface,
  SurfaceBlurFilterOptions,
  SurfaceConvolutionFilterOptions,
  SurfaceDropShadowFilterOptions,
  SurfaceGlowFilterOptions,
  ThresholdOperation,
} from '../internal/sdkCompat.js';
import ImageSource from '../assets/ImageSource.js';

export default class Surface extends ImageSource<RawSurface> {
  constructor(width: number = 0, height: number = 0, color: number = 0) {
    super();
    if (width !== 0 || height !== 0 || color !== 0) {
      this.__raw = createSurface(width, height, color);
    }
  }

  protected override __create(): RawSurface {
    return createSurface(0, 0);
  }

  applyBlurFilter(
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dest: Surface,
    dx: number,
    dy: number,
    options?: Readonly<SurfaceBlurFilterOptions>,
  ): void {
    applySurfaceBlurFilter(this.__raw, sx, sy, sw, sh, dest.raw, dx, dy, options);
  }

  applyColorMatrixFilter(
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dest: Surface,
    dx: number,
    dy: number,
    matrix: ReadonlyArray<number>,
  ): void {
    applySurfaceColorMatrixFilter(this.__raw, sx, sy, sw, sh, dest.raw, dx, dy, matrix);
  }

  applyColorTransform(x: number, y: number, width: number, height: number, ct: Readonly<ColorTransformLike>): void {
    applySurfaceColorTransform(this.__raw, x, y, width, height, ct);
  }

  applyConvolutionFilter(
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dest: Surface,
    dx: number,
    dy: number,
    options: Readonly<SurfaceConvolutionFilterOptions>,
  ): void {
    applySurfaceConvolutionFilter(this.__raw, sx, sy, sw, sh, dest.raw, dx, dy, options);
  }

  applyDropShadowFilter(
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dest: Surface,
    dx: number,
    dy: number,
    options?: Readonly<SurfaceDropShadowFilterOptions>,
  ): void {
    applySurfaceDropShadowFilter(this.__raw, sx, sy, sw, sh, dest.raw, dx, dy, options);
  }

  applyGlowFilter(
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dest: Surface,
    dx: number,
    dy: number,
    options?: Readonly<SurfaceGlowFilterOptions>,
  ): void {
    applySurfaceGlowFilter(this.__raw, sx, sy, sw, sh, dest.raw, dx, dy, options);
  }

  applyThreshold(
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dest: Surface,
    dx: number,
    dy: number,
    operation: ThresholdOperation,
    thresholdValue: number,
    color?: number,
    mask?: number,
    copySource?: boolean,
  ): number {
    return applySurfaceThreshold(
      this.__raw,
      sx,
      sy,
      sw,
      sh,
      dest.raw,
      dx,
      dy,
      operation,
      thresholdValue,
      color,
      mask,
      copySource,
    );
  }

  clone(): Surface {
    return Surface.fromRaw(cloneSurface(this.__raw));
  }

  compare(other: Surface | null): Surface | 0 | -1 | -2 | -3 {
    const result = compareSurface(this.__raw, other ? other.raw : null);
    return typeof result === 'number' ? result : Surface.fromRaw(result);
  }

  copyChannel(
    sourceChannel: ImageChannel,
    dest: Surface,
    destChannel: ImageChannel,
    sx?: number,
    sy?: number,
    sw?: number,
    sh?: number,
    dx?: number,
    dy?: number,
  ): void {
    copySurfaceChannel(this.__raw, sourceChannel, dest.raw, destChannel, sx, sy, sw, sh, dx, dy);
  }

  copyPixels(
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dest: Surface,
    dx: number,
    dy: number,
    mergeAlpha?: boolean,
  ): void {
    copySurfacePixels(this.__raw, sx, sy, sw, sh, dest.raw, dx, dy, mergeAlpha);
  }

  drawTo(canvas: HTMLCanvasElement, x: number = 0, y: number = 0): void {
    drawSurface(canvas, this.__raw, x, y);
  }

  encode(format?: ImageFormat, quality?: number): Uint8Array {
    return encodeSurface(this.__raw, format, quality);
  }

  fillRectangle(x: number, y: number, width: number, height: number, color: number): void {
    fillSurfaceRectangle(this.__raw, x, y, width, height, color);
  }

  floodFill(x: number, y: number, color: number): void {
    floodFillSurface(this.__raw, x, y, color);
  }

  static override fromCanvas(canvas: HTMLCanvasElement, x?: number, y?: number, width?: number, height?: number): Surface {
    return Surface.fromRaw(createSurfaceFromCanvas(canvas, x, y, width, height));
  }

  static fromImageSource(source: ImageSource): Surface {
    return Surface.fromRaw(createSurfaceFromImageSource(source.raw));
  }

  static override fromRaw(raw: RawSurface): Surface {
    return ImageSource.getOrCreate(raw, Surface)!;
  }

  getColorBoundsRectangle(mask: number, color: number, findColor?: boolean): ColorBoundsRectangle | null {
    return getSurfaceColorBoundsRectangle(this.__raw, mask, color, findColor);
  }

  getPixel(x: number, y: number): number {
    return getSurfacePixel(this.__raw, x, y);
  }

  getPixel32(x: number, y: number): number {
    return getSurfacePixel32(this.__raw, x, y);
  }

  getPixels(x: number, y: number, width: number, height: number): Uint8ClampedArray {
    const out = new Uint8ClampedArray(width * height * 4);
    getSurfacePixels(out, this.__raw, x, y, width, height);
    return out;
  }

  merge(
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dest: Surface,
    dx: number,
    dy: number,
    redMultiplier: number,
    greenMultiplier: number,
    blueMultiplier: number,
    alphaMultiplier: number,
  ): void {
    mergeSurface(this.__raw, sx, sy, sw, sh, dest.raw, dx, dy, redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier);
  }

  scroll(dx: number, dy: number): void {
    scrollSurface(this.__raw, dx, dy);
  }

  setPixel(x: number, y: number, color: number): void {
    setSurfacePixel(this.__raw, x, y, color);
  }

  setPixel32(x: number, y: number, color: number): void {
    setSurfacePixel32(this.__raw, x, y, color);
  }

  setPixels(x: number, y: number, width: number, height: number, data: Uint8ClampedArray): void {
    setSurfacePixels(this.__raw, x, y, width, height, data);
  }

  toImageSource(): ImageSource {
    return ImageSource.fromRaw(createImageSourceFromSurface(this.__raw));
  }

  get colorSpace(): 'srgb' | 'display-p3' {
    return this.__raw.colorSpace;
  }

  get data(): Uint8ClampedArray<ArrayBuffer> {
    return this.__raw.data;
  }

  override get raw(): RawSurface {
    return this.__raw;
  }
}
