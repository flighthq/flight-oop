import TweenManager from './TweenManager.js';

describe('tween primitives', () => {
  it('wraps manager and tween controls', () => {
    const manager = new TweenManager();
    const target = { x: 0 };
    const tween = manager.create(target, 100, { x: 10 });

    manager.update(50);
    expect(target.x).toBeGreaterThan(0);

    tween.pause();
    expect(tween.paused).toBe(true);

    tween.resume();
    manager.update(100);

    expect(target.x).toBe(10);
    expect(tween.complete).toBe(true);
  });
});
