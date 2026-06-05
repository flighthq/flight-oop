import Timeline from './Timeline.js';

describe('Timeline', () => {
  it('wraps playback controls', () => {
    const constructed: number[] = [];
    const timeline = new Timeline(3, null);
    timeline.constructFrame = (frame) => constructed.push(frame);

    timeline.play();
    timeline.update(16);
    timeline.nextFrame();
    timeline.gotoAndStop(3);

    expect(timeline.currentFrame).toBe(3);
    expect(timeline.isPlaying).toBe(false);
    expect(constructed).toContain(3);
  });
});
