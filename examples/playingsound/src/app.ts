import type { AudioChannel } from '@flighthq/oop';
import {
  Application,
  ApplicationWindow,
  AudioSource,
  DisplayContainer,
  InputManager,
  Quad,
  Shape,
  TweenManager,
} from '@flighthq/oop';

import { container, render, scale, setSize } from './render';

const manager = new TweenManager({ defaultEase: Quad.easeOut });
const root = new DisplayContainer();
root.scaleX = scale;
root.scaleY = scale;

const background = new Shape();
background.alpha = 0.1;
root.addChild(background);

const sound = await AudioSource.load([{ url: 'assets/stars.ogg' }, { url: 'assets/stars.mp3' }]);

let channel: AudioChannel | null = null;
let playing = false;
let position = 0;

function pause(fadeOut = 1200): void {
  if (!playing || channel === null) return;

  playing = false;
  const fadingChannel = channel;

  const audioTween = manager.tween(fadingChannel, fadeOut, { gain: 0 });
  audioTween.onUpdate.connect(() => fadingChannel.applyGain());
  audioTween.onComplete.connect(() => {
    position = fadingChannel.currentTime;
    fadingChannel.stop();
    if (channel === fadingChannel) channel = null;
  });

  manager.tween(background, fadeOut, { alpha: 0.1 });
}

function play(fadeIn = 3000): void {
  if (channel !== null) {
    channel.stop();
    channel = null;
  }

  const nextChannel = sound.play({ currentTime: position, gain: fadeIn <= 0 ? 1 : 0 });
  if (nextChannel === null) return;

  channel = nextChannel;
  playing = true;

  nextChannel.onComplete.connect(() => {
    playing = false;
    position = 0;
    if (channel === nextChannel) channel = null;
    background.alpha = 0.1;
  });

  if (fadeIn > 0) {
    const audioTween = manager.tween(nextChannel, fadeIn, { gain: 1 });
    audioTween.onUpdate.connect(() => nextChannel.applyGain());
  }

  manager.tween(background, fadeIn, { alpha: 1 });
}

function resize(w: number, h: number): void {
  setSize(w, h);
  background.clear();
  background.beginFill(0x24afc4);
  background.drawRect(0, 0, w, h);
}

const win = new ApplicationWindow();
win.onResize.connect(() => resize(win.width, win.height));
win.attachResize(container);
resize(window.innerWidth, window.innerHeight);

const input = new InputManager();
input.attachPointer(container);
input.onPointerDown.connect(() => {
  if (playing) {
    pause();
  } else {
    play();
  }
});

play();

const app = new Application();
app.onUpdate.connect((delta) => {
  if (channel !== null && channel.state === 'playing') {
    channel.currentTime += delta;
  }
  manager.update(delta);
});
app.onRender.connect(() => render(root));
app.start();
