import TextureAtlas from '../assets/TextureAtlas.js';
import TextureAtlasRegion from '../assets/TextureAtlasRegion.js';
import Spritesheet from './Spritesheet.js';
import SpritesheetAnimation from './SpritesheetAnimation.js';
import SpritesheetFrame from './SpritesheetFrame.js';
import SpritesheetPlayer from './SpritesheetPlayer.js';

describe('spritesheet primitives', () => {
  it('wraps frames and named animations', () => {
    const atlas = new TextureAtlas();
    atlas.addRegion(new TextureAtlasRegion(0, 0, 16, 16));

    const frame = new SpritesheetFrame(0, 2, 3);
    const animation = new SpritesheetAnimation([0], 100, false, 4, 5);
    const sheet = new Spritesheet(atlas, [frame], { idle: animation });

    expect(sheet.atlas).toBe(atlas);
    expect(sheet.getFrame(0)?.offsetX).toBe(2);
    expect(sheet.getAnimation('idle')).toBe(animation);
    expect(sheet.numAnimations).toBe(1);
    expect(sheet.numFrames).toBe(1);
  });

  it('wraps player operations', () => {
    const atlas = new TextureAtlas();
    atlas.addRegion(new TextureAtlasRegion(0, 0, 16, 16));

    const sheet = new Spritesheet(atlas, [new SpritesheetFrame(0)]);
    const animation = new SpritesheetAnimation([0], 100, false);
    const player = new SpritesheetPlayer();

    player.play(animation);
    player.update(100);

    expect(player.complete).toBe(true);
    expect(player.getFrame(sheet)?.id).toBe(0);
  });
});
