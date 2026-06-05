import Sprite from '../scene/sprite/Sprite.js';
import InteractionManager from './InteractionManager.js';

describe('InteractionManager', () => {
  it('wraps manager state', () => {
    const root = new Sprite();
    const manager = new InteractionManager(root);

    manager.enabled = false;
    manager.doubleClickDelay = 250;

    expect(manager.enabled).toBe(false);
    expect(manager.doubleClickDelay).toBe(250);
  });
});
