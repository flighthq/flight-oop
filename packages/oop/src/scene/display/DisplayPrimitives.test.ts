import Rectangle from '../../geometry/Rectangle.js';
import Sprite from '../sprite/Sprite.js';
import HTMLView from './HTMLView.js';
import InputText from './InputText.js';
import RichText from './RichText.js';
import Scale9Shape from './Scale9Shape.js';
import Shape from './Shape.js';
import SpriteBatch from './SpriteBatch.js';
import Text from './Text.js';
import Video from './Video.js';

describe('display primitives', () => {
  it('wraps HTMLView data', () => {
    const element = document.createElement('div');
    const view = new HTMLView(element, 320, 180);

    expect(view.element).toBe(element);
    expect(view.width).toBe(320);
    expect(view.height).toBe(180);
    expect(HTMLView.fromRaw(view.raw)).toBe(view);
  });

  it('wraps text primitives', () => {
    const text = new Text('hello', 120, 32);
    const richText = new RichText('hello <b>there</b>', 160, 48);
    const inputText = new InputText('name', 200, 24);

    richText.wordWrap = true;
    inputText.displayAsPassword = true;

    expect(text.text).toBe('hello');
    expect(richText.wordWrap).toBe(true);
    expect(inputText.displayAsPassword).toBe(true);
  });

  it('wraps Shape and Scale9Shape commands', () => {
    const shape = new Shape();

    shape.beginFill(0xff0000).drawRectangle(0, 0, 20, 10).endFill();

    expect(shape.commands.length).toBeGreaterThan(0);
    expect(shape.version).toBeGreaterThan(0);

    const scale9Shape = new Scale9Shape(new Rectangle(4, 4, 12, 12));
    expect(scale9Shape.scale9Grid.width).toBe(12);
  });

  it('wraps SpriteBatch and Video data', () => {
    const sprite = new Sprite();
    const batch = new SpriteBatch(sprite, false);
    const video = new Video({ element: document.createElement('video') }, false);

    expect(batch.graph).toBe(sprite);
    expect(batch.smoothing).toBe(false);
    expect(video.source?.element).toBeInstanceOf(HTMLVideoElement);
    expect(video.smoothing).toBe(false);
  });
});
