import Signal from './Signal.js';

describe('Signal', () => {
  it('wraps connect, emit, and disconnect', () => {
    const signal = new Signal<(value: number) => void>();
    const values: number[] = [];
    const slot = (value: number) => values.push(value);

    signal.connect(slot);
    signal.emit(1);
    signal.disconnect(slot);
    signal.emit(2);

    expect(values).toEqual([1]);
  });
});
