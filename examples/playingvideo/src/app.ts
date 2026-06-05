import type { VideoChannel } from '@flighthq/oop';
import {
  Application,
  ApplicationWindow,
  DisplayContainer,
  InputManager,
  Shape,
  Text,
  Video,
  VideoSource,
} from '@flighthq/oop';

import { container, render, scale, setSize } from './render';

const root = new DisplayContainer();
root.scaleX = scale;
root.scaleY = scale;

const videoSource = await VideoSource.load('assets/example.mp4');

const videoNode = new Video(videoSource);
root.addChild(videoNode);

const overlay = new Shape();
const prompt = new Text();
prompt.text = 'Click to play';
prompt.textFormat = { color: 0xffffffff, size: 24 };
root.addChild(overlay);
root.addChild(prompt);

let channel: VideoChannel | null = null;

function play(): void {
  overlay.visible = false;
  prompt.visible = false;
  if (channel !== null) channel.stop();
  channel = videoSource.play();
  if (channel === null) return;
  channel.onComplete.connect(() => {
    channel = null;
    overlay.visible = true;
    prompt.visible = true;
  });
}

function resize(w: number, h: number): void {
  setSize(w, h);
  const el = videoSource.element;
  if (el !== null) {
    const vw = el.videoWidth || w;
    const vh = el.videoHeight || h;
    const fit = Math.min(w / vw, h / vh);
    videoNode.x = Math.round((w - vw * fit) / 2);
    videoNode.y = Math.round((h - vh * fit) / 2);
    videoNode.scaleX = fit;
    videoNode.scaleY = fit;
  }
  overlay.clear();
  overlay.beginFill(0x000000, 0.5);
  overlay.drawRect(0, 0, w, h);
  prompt.x = Math.round(w / 2 - 60);
  prompt.y = Math.round(h / 2 - 12);
}

const win = new ApplicationWindow();
win.onResize.connect(() => resize(win.width, win.height));
win.attachResize(container);
resize(window.innerWidth, window.innerHeight);

const input = new InputManager();
input.attachPointer(container);
input.onPointerDown.connect(() => play());

const app = new Application();
app.onUpdate.connect(() => {
  if (channel !== null && channel.state === 'playing') videoNode.invalidate();
});
app.onRender.connect(() => render(root));
app.start();
