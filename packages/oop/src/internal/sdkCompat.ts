import * as sdk from '@flighthq/sdk';

export * from '@flighthq/sdk';

const s = sdk as any;

const rawOf = <T>(value: T | { raw: T }): T => {
  if (value && typeof value === 'object' && 'raw' in value) return value.raw;
  return value as T;
};

export const attachBinding = sdk.attachEntityBinding;
export const getBinding = sdk.getEntityBinding;

export const vector2: any = {
  add: sdk.addVector2,
  copy: sdk.copyVector2,
  create: sdk.createVector2,
  distance: sdk.getVector2Distance,
  equals: sdk.equalsVector2,
  fromFloat32Array: sdk.setVector2FromFloat32Array,
  length: sdk.getVector2Length,
  lengthSquared: sdk.getVector2LengthSquared,
  lerp: sdk.lerpVector2,
  normalize: sdk.normalizeVector2,
  offset: sdk.offsetVector2,
  setPolar: sdk.setVector2FromPolar,
  setTo: sdk.setVector2,
  subtract: sdk.subtractVector2,
  writeToFloat32Array: sdk.writeVector2ToFloat32Array,
};

export const vector3: any = {
  add: s.addVector3,
  angleBetween: s.getVector3AngleBetween,
  copy: sdk.copyVector3,
  cross: s.crossVector3,
  create: sdk.createVector3,
  distance: s.getVector3Distance,
  distanceSquared: s.getVector3DistanceSquared,
  dot: s.getVector3Dot,
  equals: sdk.equalsVector3,
  length: sdk.getVector3Length,
  lengthSquared: sdk.getVector3LengthSquared,
  nearEquals: s.nearEqualsVector3,
  negate: s.negateVector3,
  normalize: s.normalizeVector3,
  scale: s.scaleVector3,
  setTo: sdk.setVector3,
  subtract: s.subtractVector3,
  X_AXIS: s.VECTOR3_X_AXIS,
  Y_AXIS: s.VECTOR3_Y_AXIS,
  Z_AXIS: s.VECTOR3_Z_AXIS,
};

export const vector4: any = {
  add: sdk.addVector4,
  angleBetween: sdk.getVector4AngleBetween,
  copy: sdk.copyVector4,
  create: sdk.createVector4,
  distance: sdk.getVector4Distance,
  distanceSquared: sdk.getVector4DistanceSquared,
  dot: sdk.getVector4Dot,
  equals: sdk.equalsVector4,
  length: sdk.getVector4Length,
  lengthSquared: sdk.getVector4LengthSquared,
  nearEquals: sdk.nearEqualsVector4,
  negate: sdk.negateVector4,
  normalize: sdk.normalizeVector4,
  project: sdk.projectVector4,
  scale: sdk.scaleVector4,
  setTo: sdk.setVector4,
  subtract: sdk.subtractVector4,
  W_UNIT: sdk.VECTOR4_W_UNIT,
  X_AXIS: sdk.VECTOR4_X_AXIS,
  Y_AXIS: sdk.VECTOR4_Y_AXIS,
  Z_AXIS: sdk.VECTOR4_Z_AXIS,
};

export const rectangle: any = {
  bottom: sdk.getRectangleBottom,
  bottomRight: sdk.getRectangleBottomRight,
  clone: sdk.cloneRectangle,
  contains: sdk.containsRectanglePointXY,
  containsPoint: sdk.containsRectanglePoint,
  containsPointXY: sdk.containsRectanglePointXY,
  containsRect: sdk.enclosesRectangle,
  copy: (out: sdk.RectangleLike, source: Readonly<sdk.RectangleLike> | { raw: sdk.RectangleLike }) =>
    sdk.copyRectangle(out, rawOf(source)),
  create: sdk.createRectangle,
  encloses: sdk.enclosesRectangle,
  equals: sdk.equalsRectangle,
  expandToPoint: sdk.expandRectangleToPoint,
  inflate: sdk.inflateRectangle,
  inflatePoint: sdk.expandRectangleToPoint,
  intersection: sdk.intersectionRectangle,
  intersects: sdk.intersectsRectangle,
  isEmpty: sdk.isEmptyRectangle,
  isFlippedX: sdk.isFlippedXRectangle,
  isFlippedY: sdk.isFlippedYRectangle,
  left: sdk.getRectangleLeft,
  maxX: sdk.getRectangleMaxX,
  maxY: sdk.getRectangleMaxY,
  minX: sdk.getRectangleMinX,
  minY: sdk.getRectangleMinY,
  normalize: sdk.normalizeRectangle,
  offset: sdk.offsetRectangle,
  offsetByPoint: sdk.offsetRectangleByPoint,
  offsetPoint: sdk.offsetRectangleByPoint,
  right: sdk.getRectangleRight,
  setBottom: sdk.setRectangleBottom,
  setBottomRight: sdk.setRectangleBottomRight,
  setEmpty: sdk.setEmptyRectangle,
  setLeft: sdk.setRectangleLeft,
  setRight: sdk.setRectangleRight,
  setSize: sdk.setRectangleSize,
  setTop: sdk.setRectangleTop,
  setTopLeft: sdk.setRectangleTopLeft,
  setTo: sdk.setRectangle,
  size: sdk.getRectangleSize,
  top: sdk.getRectangleTop,
  topLeft: sdk.getRectangleTopLeft,
  union: sdk.unionRectangle,
};

export const matrix3x2: any = {
  clone: sdk.cloneMatrix,
  concat: sdk.multiplyMatrix,
  copy: (out: sdk.MatrixLike, source: Readonly<sdk.MatrixLike> | { raw: Readonly<sdk.MatrixLike> }) =>
    sdk.copyMatrix(out, rawOf(source)),
  copyColumnFrom: (out: sdk.MatrixLike, column: number, source: Readonly<sdk.Vector3Like> | { raw: sdk.Vector3Like }) =>
    sdk.copyMatrixColumnFromVector3(out, column, rawOf(source)),
  copyColumnTo: (out: sdk.Vector3Like | { raw: sdk.Vector3Like }, column: number, source: Readonly<sdk.MatrixLike>) =>
    sdk.copyMatrixColumnToVector3(rawOf(out), column, source),
  copyRowFrom: (out: sdk.MatrixLike, row: number, source: Readonly<sdk.Vector3Like> | { raw: sdk.Vector3Like }) =>
    sdk.copyMatrixRowFromVector3(out, row, rawOf(source)),
  copyRowTo: (out: sdk.Vector3Like | { raw: sdk.Vector3Like }, row: number, source: Readonly<sdk.MatrixLike>) =>
    sdk.copyMatrixRowToVector3(rawOf(out), row, source),
  create: sdk.createMatrix,
  equals: (a: Readonly<sdk.MatrixLike>, b: Readonly<sdk.MatrixLike> | { raw: sdk.MatrixLike } | null | undefined, compareTranslation?: boolean) =>
    sdk.equalsMatrix(a, b ? rawOf(b) : b, compareTranslation),
  fromFloat32Array: sdk.setMatrixFromFloat32Array,
  fromMatrix3x3: sdk.setMatrixFromMatrix3,
  fromMatrix4x4: sdk.setMatrixFromMatrix4,
  identity: sdk.identityMatrix,
  inverse: sdk.inverseMatrix,
  inverseTransformPoint: sdk.inverseMatrixTransformPoint,
  inverseTransformPointXY: sdk.inverseMatrixTransformPointXY,
  inverseTransformVector: sdk.inverseMatrixTransformVector,
  inverseTransformVectorXY: sdk.inverseMatrixTransformVectorXY,
  multiply: sdk.multiplyMatrix,
  rotate: sdk.rotateMatrix,
  scale: sdk.scaleMatrix,
  setGradientTransform: sdk.setGradientTransformMatrix,
  setTo: sdk.setMatrix,
  setTransform: sdk.setTransformMatrix,
  transformPoint: sdk.matrixTransformPoint,
  transformPointXY: sdk.matrixTransformPointXY,
  transformRect: sdk.matrixTransformRectangle,
  transformRectVec2: sdk.matrixTransformAABBVector2,
  transformRectXY: sdk.matrixTransformAABB,
  transformVector: sdk.matrixTransformVector,
  transformVectorXY: sdk.matrixTransformVectorXY,
  translate: sdk.translateMatrix,
  writeToFloat32Array: sdk.writeMatrixToFloat32Array,
};

export const matrix3x3: any = {
  clone: sdk.cloneMatrix3,
  copy: sdk.copyMatrix3,
  copyColumnFrom: sdk.copyMatrix3ColumnFromVector3,
  copyColumnTo: sdk.copyMatrix3ColumnToVector3,
  copyRowFrom: sdk.copyMatrix3RowFromVector3,
  copyRowTo: sdk.copyMatrix3RowToVector3,
  create: sdk.createMatrix3,
  equals: sdk.equalsMatrix3,
  fromMatrix3x2: sdk.setMatrix3FromMatrix,
  fromMatrix4x4: sdk.setMatrix3FromMatrix4,
  get: sdk.getMatrix3Element,
  identity: sdk.identityMatrix3,
  inverse: sdk.inverseMatrix3,
  isAffine: sdk.isAffineMatrix3,
  multiply: sdk.multiplyMatrix3,
  rotate: sdk.rotateMatrix3,
  scale: sdk.scaleMatrix3,
  set: sdk.setMatrix3Element,
  setTo: sdk.setMatrix3,
  translate: sdk.translateMatrix3,
};

export const matrix4x4: any = {
  append: sdk.appendMatrix4,
  appendRotation: sdk.appendRotationMatrix4,
  appendScale: sdk.appendScaleMatrix4,
  appendTranslation: sdk.appendTranslationMatrix4,
  clone: sdk.cloneMatrix4,
  copy: sdk.copyMatrix4,
  copyColumnFrom: sdk.copyMatrix4ColumnFromVector4,
  copyColumnTo: sdk.copyMatrix4ColumnToVector4,
  copyRowFrom: sdk.copyMatrix4RowFromVector4,
  copyRowTo: sdk.copyMatrix4RowToVector4,
  create: sdk.createMatrix4,
  determinant: sdk.getMatrix4Determinant,
  equals: sdk.equalsMatrix4,
  fromMatrix3x2: sdk.setMatrix4FromMatrix,
  fromMatrix3x3: sdk.setMatrix4FromMatrix3,
  get: sdk.getMatrix4Element,
  identity: sdk.identityMatrix4,
  interpolate: sdk.interpolateMatrix4,
  inverse: sdk.inverseMatrix4,
  isAffine: sdk.isAffineMatrix4,
  multiply: sdk.multiplyMatrix4,
  position: sdk.getMatrix4Position,
  prepend: sdk.prependMatrix4,
  prependRotation: sdk.prependRotationMatrix4,
  prependScale: sdk.prependScaleMatrix4,
  prependTranslation: sdk.prependTranslationMatrix4,
  rotate: sdk.rotateMatrix4,
  scale: sdk.scaleMatrix4,
  set: sdk.setMatrix4Element,
  set2D: sdk.setMatrix4From2D,
  setOrtho: sdk.setOrthographicMatrix4,
  setPerspective: sdk.setPerspectiveMatrix4,
  setPosition: sdk.setMatrix4Position,
  setTo: sdk.setMatrix4,
  transformPoint: sdk.matrix4TransformPoint,
  transformVector: sdk.matrix4TransformVector,
  transformVectors: sdk.matrix4TransformVectors,
  translate: sdk.translateMatrix4,
  transpose: sdk.transposeMatrix4,
};

export const colorTransform: any = {
  clone: sdk.cloneColorTransform,
  concat: sdk.concatColorTransform,
  copy: sdk.copyColorTransform,
  create: sdk.createColorTransform,
  equals: sdk.equalsColorTransform,
  getOffsetRGB: sdk.getColorTransformOffsetRGB,
  getOffsetRGBA: sdk.getColorTransformOffsetRGBA,
  identity: sdk.identityColorTransform,
  invert: sdk.invertColorTransform,
  isIdentity: sdk.isIdentityColorTransform,
  multiplierEquals: sdk.equalsColorTransformMultipliers,
  offsetEquals: sdk.equalsColorTransformOffsets,
  setOffsetRGB: sdk.setColorTransformOffsetRGB,
  setOffsetRGBA: sdk.setColorTransformOffsetRGBA,
  setTo: sdk.setColorTransform,
  toArrays: sdk.copyColorTransformToArrays,
};

export const addChild = sdk.addSceneChild;
export const addChildAt = sdk.addSceneChildAt;
export const getNumChildren = sdk.getSceneNumChildren;
export const removeChild = sdk.removeSceneChild;
export const removeChildAt = sdk.removeSceneChildAt;
export const removeChildren = sdk.removeSceneChildren;
export const setChildIndex = sdk.setSceneChildIndex;
export const swapChildren = sdk.swapSceneChildren;
export const swapChildrenAt = sdk.swapSceneChildrenAt;

export const calculateBoundsRect = sdk.computeBoundsRectangle;
export const getBoundsRect = sdk.getLocalBoundsRectangle;
export const getLocalBoundsRect = sdk.getLocalBoundsRectangle;
export const getWorldBoundsRect = sdk.getWorldBoundsRectangle;
export const getParent = sdk.getSceneParent;
export const globalToLocal2D = sdk.sceneGlobalToLocalVector2;
export const invalidate = sdk.invalidateSceneNode;
export const localToGlobal2D = sdk.sceneLocalToGlobalVector2;
export const getAppearanceID = sdk.getAppearanceRevision;
export const getLocalBoundsID = sdk.getLocalBoundsRevision;
export const getLocalTransformID = sdk.getLocalTransformRevision;
export const getLocalTransform2D = sdk.getLocalTransformMatrix;

export const renderBackground = sdk.renderCanvasBackground;

export function renderDisplayObject(state: sdk.CanvasRenderState, _source?: sdk.DisplayObject): void {
  sdk.renderCanvas(state);
}

export function renderSprite(state: sdk.CanvasRenderState, _source?: sdk.SpriteNode): void {
  sdk.renderCanvas(state);
}

export function updateDisplayObjectBeforeRender(state: sdk.CanvasRenderState, source: sdk.DisplayObject): boolean {
  sdk.prepareCanvasDisplayObjectRender(state, source);
  return true;
}

export function updateSpriteBeforeRender(state: sdk.CanvasRenderState, source: sdk.SpriteNode): boolean {
  sdk.prepareCanvasSpriteRender(state, source);
  return true;
}

export function hitTestObject(a: sdk.DisplayObject, b: sdk.DisplayObject): boolean {
  if (sdk.getSceneParent(a) === null || sdk.getSceneParent(b) === null) return false;
  return sdk.intersectsRectangle(sdk.getWorldBoundsRectangle(a), sdk.getWorldBoundsRectangle(b));
}

export function hitTestPoint(source: sdk.DisplayObject, x: number, y: number, _shapeFlag: boolean = false): boolean {
  if (!source.visible) return false;
  return sdk.containsRectanglePointXY(sdk.getWorldBoundsRectangle(source), x, y);
}

export type Entity = sdk.Entity;
export type Matrix3x2 = any;
export type Matrix3x3 = any;
export type Matrix4x4 = any;
export type ImageSource = any;
export type TextureAtlas = any;
export type TextureAtlasRegion = any;
export type Tileset = any;
export type Spritesheet = any;
export type SpritesheetAnimation = any;
export type ColorTransform = any;
export type Filter = sdk.Entity;
export type Shader = sdk.Entity;
export type DisplayObject = any;
export type Bitmap = any;
export type BitmapData = any;
export type MovieClip = any;
export type MovieClipData = any;
export type Stage = any;
export type StageData = any;
export type SpriteNode = any;
export type Sprite = any;
export type SpriteData = any;
export type QuadBatch = any;
export type QuadBatchData = any;
export type Tilemap = any;
export type TilemapData = any;
export type CanvasRenderOptions = any;
export type CanvasRenderState = any;
