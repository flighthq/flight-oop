import { Application, DisplayContainer, Shape } from '@flighthq/oop';

import { render, scale } from './render';

const main = new DisplayContainer();
main.scaleX = scale;
main.scaleY = scale;

function drawPolygon(g: Shape, x: number, y: number, radius: number, sides: number): void {
  const step = (Math.PI * 2) / sides;
  const start = 0.5 * Math.PI;
  g.moveTo(Math.cos(start) * radius + x, -Math.sin(start) * radius + y);
  for (let i = 0; i < sides; i++) {
    g.lineTo(Math.cos(start + step * i) * radius + x, -Math.sin(start + step * i) * radius + y);
  }
}

// ── Row 1: primitives ──────────────────────────────────────────────────────

const square = new Shape();
square.beginFill(0x24afc4);
square.drawRect(0, 0, 100, 100);
square.x = 20;
square.y = 20;
main.addChild(square);

const rectangle = new Shape();
rectangle.beginFill(0x24afc4);
rectangle.drawRect(0, 0, 120, 100);
rectangle.x = 140;
rectangle.y = 20;
main.addChild(rectangle);

const circle = new Shape();
circle.beginFill(0x24afc4);
circle.drawCircle(50, 50, 50);
circle.x = 280;
circle.y = 20;
main.addChild(circle);

const ellipse = new Shape();
ellipse.beginFill(0x24afc4);
ellipse.drawEllipse(0, 0, 120, 100);
ellipse.x = 400;
ellipse.y = 20;
main.addChild(ellipse);

const roundSquare = new Shape();
roundSquare.beginFill(0x24afc4);
roundSquare.drawRoundRect(0, 0, 100, 100, 40, 40);
roundSquare.x = 540;
roundSquare.y = 20;
main.addChild(roundSquare);

const roundRectangle = new Shape();
roundRectangle.beginFill(0x24afc4);
roundRectangle.drawRoundRect(0, 0, 120, 100, 40, 40);
roundRectangle.x = 660;
roundRectangle.y = 20;
main.addChild(roundRectangle);

// ── Row 2: polygons ────────────────────────────────────────────────────────

const triangle = new Shape();
triangle.beginFill(0x24afc4);
triangle.moveTo(0, 100);
triangle.lineTo(50, 0);
triangle.lineTo(100, 100);
triangle.lineTo(0, 100);
triangle.x = 20;
triangle.y = 150;
main.addChild(triangle);

const pentagon = new Shape();
pentagon.beginFill(0x24afc4);
drawPolygon(pentagon, 50, 50, 50, 5);
pentagon.x = 145;
pentagon.y = 150;
main.addChild(pentagon);

const hexagon = new Shape();
hexagon.beginFill(0x24afc4);
drawPolygon(hexagon, 50, 50, 50, 6);
hexagon.x = 270;
hexagon.y = 150;
main.addChild(hexagon);

const heptagon = new Shape();
heptagon.beginFill(0x24afc4);
drawPolygon(heptagon, 50, 50, 50, 7);
heptagon.x = 395;
heptagon.y = 150;
main.addChild(heptagon);

const octagon = new Shape();
octagon.beginFill(0x24afc4);
drawPolygon(octagon, 50, 50, 50, 8);
octagon.x = 520;
octagon.y = 150;
main.addChild(octagon);

const decagon = new Shape();
decagon.beginFill(0x24afc4);
drawPolygon(decagon, 50, 50, 50, 10);
decagon.x = 650;
decagon.y = 150;
main.addChild(decagon);

// ── Row 3: lines and curves ───────────────────────────────────────────────

const line = new Shape();
line.lineStyle(10, 0x24afc4);
line.lineTo(755, 0);
line.x = 20;
line.y = 280;
main.addChild(line);

const curve = new Shape();
curve.lineStyle(10, 0x24afc4);
curve.curveTo(327.5, -50, 755, 0);
curve.x = 20;
curve.y = 340;
main.addChild(curve);

// ── Render loop ───────────────────────────────────────────────────────────

const app = new Application();
app.onRender.connect(() => render(main));
app.start();
