import {
  Application,
  ApplicationWindow,
  AudioSource,
  Bitmap,
  DisplayContainer,
  Font,
  ImageSource,
  InputManager,
  InteractionManager,
  TweenManager,
} from '@flighthq/oop';

import { PiratePigGame } from './game';
import { container, render, scale, setSize } from './render';

// ── Assets ─────────────────────────────────────────────────────────────────

const [bgImage, footerImage, logoImage, font, theme, ...tileImages] = await Promise.all([
  ImageSource.load('assets/images/background_tile.png'),
  ImageSource.load('assets/images/center_bottom.png'),
  ImageSource.load('assets/images/logo.png'),
  Font.load('assets/fonts/FreebooterUpdated.ttf', 'FreebooterUpdated'),
  AudioSource.load([{ url: 'assets/sounds/theme.ogg' }, { url: 'assets/sounds/theme.mp3' }]),
  ImageSource.load('assets/images/game_bear.png'),
  ImageSource.load('assets/images/game_bunny_02.png'),
  ImageSource.load('assets/images/game_carrot.png'),
  ImageSource.load('assets/images/game_lemon.png'),
  ImageSource.load('assets/images/game_panda.png'),
  ImageSource.load('assets/images/game_piratePig.png'),
]);

const sounds = [
  theme,
  new AudioSource([{ url: 'assets/sounds/sound3.ogg' }, { url: 'assets/sounds/sound3.mp3' }]),
  new AudioSource([{ url: 'assets/sounds/sound4.ogg' }, { url: 'assets/sounds/sound4.mp3' }]),
  new AudioSource([{ url: 'assets/sounds/sound5.ogg' }, { url: 'assets/sounds/sound5.mp3' }]),
];

// ── Scene ──────────────────────────────────────────────────────────────────

const manager = new TweenManager();
const root = new DisplayContainer();
root.scaleX = scale;
root.scaleY = scale;

const background = new Bitmap(bgImage, true);
root.addChild(background);

const footer = new Bitmap(footerImage, true);
root.addChild(footer);

const interactionManager = new InteractionManager(root);
interactionManager.registerHitTest();

const game = new PiratePigGame(manager, interactionManager, tileImages, logoImage, font.name, sounds, {
  coordScale: scale,
  cursorElement: container,
});

const logo = new Bitmap(logoImage, true);
game.obj.addChild(logo);

root.addChild(game.obj);

// ── Layout ─────────────────────────────────────────────────────────────────

function resize(w: number, h: number): void {
  setSize(w, h);

  background.scaleX = w / bgImage.width;
  background.scaleY = h / bgImage.height;

  game.resize(w, h);

  footer.scaleX = game.currentScale;
  footer.scaleY = game.currentScale;
  footer.x = w / 2 - (footerImage.width * footer.scaleX) / 2;
  footer.y = h - footerImage.height * footer.scaleY;
}

const win = new ApplicationWindow();
win.onResize.connect(() => resize(win.width, win.height));
win.onDeactivate.connect(() => app.stop());
win.onActivate.connect(() => app.start());
win.attachResize(container);
win.attachVisibility();
resize(window.innerWidth, window.innerHeight);

// ── Game start ─────────────────────────────────────────────────────────────

game.newGame();

// ── Input ──────────────────────────────────────────────────────────────────

const inputManager = new InputManager();
inputManager.attachPointer(container);
inputManager.connectToInteraction(interactionManager, scale);

// ── Render loop ────────────────────────────────────────────────────────────

const app = new Application();
app.onUpdate.connect((delta) => {
  manager.update(delta);
  game.onEnterFrame();
});
app.onRender.connect(() => render(root));
app.start();
