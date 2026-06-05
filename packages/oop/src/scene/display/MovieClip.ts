import {
  attachSpritesheetTimeline,
  createMovieClip,
  getMovieClipCurrentFrame,
  getMovieClipTotalFrames,
  gotoAndPlayMovieClip,
  gotoAndStopMovieClip,
  isMovieClipPlaying,
  nextFrameMovieClip,
  playMovieClip,
  prevFrameMovieClip,
  stopMovieClip,
  updateMovieClip,
} from '../../internal/sdkCompat.js';
import type { MovieClip as RawMovieClip, MovieClipData } from '../../internal/sdkCompat.js';

import Entity from '../../Entity.js';
import Spritesheet from '../../spritesheet/Spritesheet.js';
import SpritesheetAnimation from '../../spritesheet/SpritesheetAnimation.js';
import Timeline from '../../timeline/Timeline.js';
import DisplayContainer from './DisplayContainer.js';

export default class MovieClip extends DisplayContainer {
  protected __data: MovieClipData;
  constructor() {
    super();
    this.__data = this.__raw.data as MovieClipData;
  }

  protected override __create() {
    return createMovieClip();
  }

  static fromRaw(raw: RawMovieClip): MovieClip {
    return Entity.getOrCreate(raw, MovieClip)!;
  }

  attachSpritesheetTimeline(spritesheet: Readonly<Spritesheet>, animation: Readonly<SpritesheetAnimation>): void {
    attachSpritesheetTimeline(this.__raw as RawMovieClip, spritesheet.raw, animation.raw);
  }

  gotoAndPlay(frame: number | string): void {
    gotoAndPlayMovieClip(this.__raw as RawMovieClip, frame);
  }

  gotoAndStop(frame: number | string): void {
    gotoAndStopMovieClip(this.__raw as RawMovieClip, frame);
  }

  nextFrame(): void {
    nextFrameMovieClip(this.__raw as RawMovieClip);
  }

  play(): void {
    playMovieClip(this.__raw as RawMovieClip);
  }

  prevFrame(): void {
    prevFrameMovieClip(this.__raw as RawMovieClip);
  }

  stop(): void {
    stopMovieClip(this.__raw as RawMovieClip);
  }

  update(deltaTime: number): void {
    updateMovieClip(this.__raw as RawMovieClip, deltaTime);
  }

  // Get & Set Methods

  get currentFrame(): number {
    return getMovieClipCurrentFrame(this.__raw as RawMovieClip);
  }

  get isPlaying(): boolean {
    return isMovieClipPlaying(this.__raw as RawMovieClip);
  }

  override get raw(): RawMovieClip {
    return this.__raw as RawMovieClip;
  }

  get timeline(): Timeline | null {
    return this.__data.timeline ? Timeline.fromRaw(this.__data.timeline) : null;
  }

  set timeline(value: Timeline | null) {
    this.__data.timeline = value ? value.raw : null;
  }

  get totalFrames(): number {
    return getMovieClipTotalFrames(this.__raw as RawMovieClip);
  }
}
