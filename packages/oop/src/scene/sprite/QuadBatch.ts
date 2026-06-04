import {
  getQuadBatchCapacity,
  hitTestQuadBatchPoint,
  hitTestQuadBatchPointXY,
  invalidateAppearance,
  createQuadBatch,
  measureQuadBatchBoundsRectangle,
  reserveQuadBatch,
  resizeQuadBatch,
} from '../../internal/sdkCompat.js';
import type { QuadBatch as RawQuadBatch, QuadBatchData, QuadTransformType } from '../../internal/sdkCompat.js';

import TextureAtlas from '../../assets/TextureAtlas';
import Entity from '../../Entity';
import Matrix from '../../geometry/Matrix';
import Rectangle from '../../geometry/Rectangle';
import Vector2 from '../../geometry/Vector2';
import SpriteNode from './SpriteNode';

export default class QuadBatch extends SpriteNode {
  protected __data: QuadBatchData;
  declare protected __raw: RawQuadBatch;

  constructor() {
    super();
    this.__data = this.__raw.data as QuadBatchData;
  }

  protected override __create() {
    return createQuadBatch();
  }

  static fromRaw(raw: RawQuadBatch): QuadBatch {
    return Entity.getOrCreate(raw, QuadBatch)!;
  }

  readID(index: number): number {
    return this.__data.ids[index];
  }

  readMatrix(index: number): Matrix {
    return Matrix.fromFloat32Array(this.__data.transforms, index * 6);
  }

  readVector2(index: number): Vector2 {
    return Vector2.fromFloat32Array(this.__data.transforms, index * 2);
  }

  hitTestPoint(point: Readonly<Vector2>): number {
    return hitTestQuadBatchPoint(this.__raw, point);
  }

  hitTestPointXY(x: number, y: number): number {
    return hitTestQuadBatchPointXY(this.__raw, x, y);
  }

  measureBoundsRectangle(out: Rectangle = new Rectangle()): Rectangle {
    measureQuadBatchBoundsRectangle(out.raw, this.__raw);
    return out;
  }

  reserve(capacity: number): void {
    reserveQuadBatch(this.__raw, capacity);
  }

  resize(instanceCount: number): void {
    resizeQuadBatch(this.__raw, instanceCount);
  }

  writeID(index: number, id: number): void {
    this.__data.ids[index] = id;
    invalidateAppearance(this.__raw);
  }

  writeIDs(startIndex: number, values: Uint16Array): void {
    this.__data.ids.set(values, startIndex);
    invalidateAppearance(this.__raw);
  }

  writeMatrices(startIndex: number, values: Float32Array): void {
    this.__data.transforms.set(values, startIndex * 6);
    invalidateAppearance(this.__raw);
  }

  writeMatrix(index: number, matrix: Readonly<Matrix>): void {
    matrix.writeToFloat32Array(this.__data.transforms, index * 6);
    invalidateAppearance(this.__raw);
  }

  writeVector(index: number, vector: Readonly<Vector2>): void {
    vector.writeToFloat32Array(this.__data.transforms, index * 2);
    invalidateAppearance(this.__raw);
  }

  writeVectors(startIndex: number, values: Float32Array): void {
    this.__data.transforms.set(values, startIndex * 2);
    invalidateAppearance(this.__raw);
  }

  // Get & Set Methods

  get atlas(): TextureAtlas | null {
    if (this.__data.atlas === null) return null;
    return Entity.getOrCreate(this.__data.atlas, TextureAtlas);
  }

  set atlas(value: TextureAtlas | null) {
    if (this.__data.atlas === (value !== null ? value.raw : null)) return;
    this.__data.atlas = value !== null ? value.raw : null;
    invalidateAppearance(this.__raw);
  }

  get capacity(): number {
    return getQuadBatchCapacity(this.__raw);
  }

  get ids(): Uint16Array {
    return this.__data.ids;
  }

  set ids(value: Uint16Array) {
    this.__data.ids = value;
    invalidateAppearance(this.__raw);
  }

  get instanceCount(): number {
    return this.__data.instanceCount;
  }

  set instanceCount(value: number) {
    this.resize(value);
  }

  override get raw(): RawQuadBatch {
    return this.__raw;
  }

  get transforms(): Float32Array {
    return this.__data.transforms;
  }

  set transforms(value: Float32Array) {
    this.__data.transforms = value;
    invalidateAppearance(this.__raw);
  }

  get transformType(): QuadTransformType {
    return this.__data.transformType;
  }

  set transformType(value: QuadTransformType) {
    if (value === this.__data.transformType) return;
    this.__data.transformType = value;
    reserveQuadBatch(this.__raw, this.__data.instanceCount);
    invalidateAppearance(this.__raw);
  }
}

export { QuadTransformType };
