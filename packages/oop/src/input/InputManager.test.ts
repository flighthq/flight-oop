import InputManager from './InputManager.js';

describe('InputManager', () => {
  it('wraps input signals', () => {
    const manager = new InputManager();
    const keys: string[] = [];

    manager.onKeyDown.connect((data) => keys.push(data.key));
    manager.onKeyDown.emit({
      altKey: false,
      capsLock: false,
      code: 'KeyA',
      ctrlKey: false,
      key: 'a',
      keyCode: 65,
      location: 0,
      metaKey: false,
      modifier: 0,
      numLock: false,
      repeat: false,
      shiftKey: false,
    });

    expect(keys).toEqual(['a']);
  });
});
