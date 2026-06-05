import { Application, DisplayContainer, Font, Text } from '@flighthq/oop';

import { render, scale } from './render';

const font = await Font.load('assets/KatamotzIkasi.woff', 'Katamotz Ikasi');

const root = new DisplayContainer();
root.scaleX = scale;
root.scaleY = scale;

const textField = new Text();
textField.text = 'Hello World';
textField.textFormat = { font: font.name, size: 30, color: 0x7a0026 };
textField.x = 50;
textField.y = 50;
root.addChild(textField);

const app = new Application();
app.onRender.connect(() => render(root));
app.start();
