import { getLocalTransformID } from '../../internal/sdkCompat.js';

import TextureAtlas from '../../assets/TextureAtlas.js';
import TextureAtlasRegion from '../../assets/TextureAtlasRegion.js';
import Tileset from '../../assets/Tileset.js';
import Matrix from '../../geometry/Matrix.js';
import Rectangle from '../../geometry/Rectangle.js';
import Vector2 from '../../geometry/Vector2.js';
import QuadBatch from './QuadBatch.js';
import Sprite from './Sprite.js';
import Tilemap from './Tilemap.js';

describe('sprite primitives', () => {
  it('wraps Sprite hierarchy and data', () => {
    const parent = new Sprite();
    const child = new Sprite();
    const atlas = new TextureAtlas();
    const rect = new Rectangle(1, 2, 16, 8);

    parent.addChild(child);
    child.atlas = atlas;
    child.id = 7;
    child.rect = rect;

    expect(parent.numChildren).toBe(1);
    expect(child.parent).toBe(parent);
    expect(child.atlas).toBe(atlas);
    expect(child.id).toBe(7);
    expect(child.rect).toBe(rect);
    expect(Sprite.fromRaw(child.raw)).toBe(child);
  });

  it('wraps SpriteNode origin properties', () => {
    const sprite = new Sprite();

    sprite.originX = 0.5;
    sprite.originY = 0.25;

    expect(sprite.originX).toBe(0.5);
    expect(sprite.originY).toBe(0.25);
    expect(getLocalTransformID(sprite.raw)).toBe(2);
  });

  it('wraps QuadBatch buffers, bounds, and hit testing', () => {
    const atlas = new TextureAtlas();
    atlas.addRegion(new TextureAtlasRegion(0, 0, 16, 8));

    const batch = new QuadBatch();
    batch.atlas = atlas;
    batch.resize(1);
    batch.writeID(0, 0);
    batch.writeVector(0, new Vector2(4, 5));

    expect(batch.capacity).toBeGreaterThanOrEqual(1);
    expect(batch.readID(0)).toBe(0);
    expect(batch.readVector2(0).equals(new Vector2(4, 5))).toBe(true);
    expect(batch.measureBoundsRectangle().equals(new Rectangle(4, 5, 16, 8))).toBe(true);
    expect(batch.hitTestPoint(new Vector2(8, 6))).toBe(0);
    expect(batch.hitTestPointXY(100, 100)).toBe(-1);

    batch.transformType = 'matrix3x2';
    batch.resize(1);
    batch.writeMatrix(0, new Matrix(1, 0, 0, 1, 9, 10));

    expect(batch.readMatrix(0).equals(new Matrix(1, 0, 0, 1, 9, 10))).toBe(true);
  });

  it('wraps Tilemap grid operations', () => {
    const tilemap = new Tilemap();
    const tileset = new Tileset(undefined, 0, 0, 8, 4);

    tilemap.tileset = tileset;
    tilemap.resize(3, 2);
    tilemap.fillTiles(1);
    tilemap.setTile(2, 1, 5);

    expect(tilemap.columns).toBe(3);
    expect(tilemap.rows).toBe(2);
    expect(tilemap.tiles.length).toBe(6);
    expect(tilemap.tileset).toBe(tileset);
    expect(tilemap.getTile(0, 0)).toBe(1);
    expect(tilemap.getTile(2, 1)).toBe(5);
    expect(tilemap.getTile(3, 1)).toBe(-1);

    tilemap.columns = 2;

    expect(tilemap.columns).toBe(2);
    expect(tilemap.rows).toBe(2);
    expect(tilemap.getTile(1, 1)).toBe(1);
  });
});
