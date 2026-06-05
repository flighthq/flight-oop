import AudioSource from './AudioSource.js';
import Font from './Font.js';
import FontSource from './FontSource.js';
import ImageSource from './ImageSource.js';
import TextureAtlas from './TextureAtlas.js';
import Tileset from './Tileset.js';
import VideoSource from './VideoSource.js';

describe('asset primitives', () => {
  it('wraps plain source records', () => {
    const audio = new AudioSource();
    const videoElement = document.createElement('video');
    const video = new VideoSource(videoElement);
    const fontSource = new FontSource('Inter');

    expect(audio.buffer).toBeNull();
    expect(video.element).toBe(videoElement);
    expect(fontSource.family).toBe('Inter');
  });

  it('wraps Font as an entity', () => {
    const font = new Font('Inter');

    expect(font.name).toBe('Inter');
    expect(Font.fromRaw(font.raw)).toBe(font);
  });

  it('wraps image, atlas, and tileset factories', () => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 16;

    const image = ImageSource.fromCanvas(canvas);
    const atlas = TextureAtlas.fromImageSource(image);
    const tileset = Tileset.fromAtlas(atlas, 8, 8);

    expect(image.width).toBe(32);
    expect(image.height).toBe(16);
    expect(atlas.image).toBe(image);
    expect(tileset.columns).toBe(4);
    expect(tileset.rows).toBe(2);
  });
});
