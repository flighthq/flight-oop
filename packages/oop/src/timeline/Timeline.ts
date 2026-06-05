import {
  createTimeline,
  findTimelineLabel,
  gotoAndPlayTimeline,
  gotoAndStopTimeline,
  nextFrameTimeline,
  playTimeline,
  prevFrameTimeline,
  stopTimeline,
  updateTimeline,
} from '../internal/sdkCompat.js';
import type { Entity as RawEntity, Timeline as RawTimeline } from '../internal/sdkCompat.js';
import Entity from '../Entity.js';
import TimelineLabel from './TimelineLabel.js';

type RawTimelineEntity = RawEntity & RawTimeline;

export default class Timeline extends Entity<RawTimelineEntity> {
  constructor(totalFrames?: number, frameRate?: number | null) {
    super();
    if (totalFrames !== undefined) this.__raw.totalFrames = totalFrames;
    if (frameRate !== undefined) this.__raw.frameRate = frameRate;
  }

  protected override __create(): RawTimelineEntity {
    return createTimeline() as RawTimelineEntity;
  }

  static fromRaw(raw: RawTimeline): Timeline {
    return Entity.getOrCreate(raw as RawTimelineEntity, Timeline)!;
  }

  findLabel(name: string): TimelineLabel | null {
    const raw = findTimelineLabel(this.__raw, name);
    return raw ? TimelineLabel.fromRaw(raw) : null;
  }

  gotoAndPlay(frame: number | string): void {
    gotoAndPlayTimeline(this.__raw, frame);
  }

  gotoAndStop(frame: number | string): void {
    gotoAndStopTimeline(this.__raw, frame);
  }

  nextFrame(): void {
    nextFrameTimeline(this.__raw);
  }

  play(): void {
    playTimeline(this.__raw);
  }

  prevFrame(): void {
    prevFrameTimeline(this.__raw);
  }

  stop(): void {
    stopTimeline(this.__raw);
  }

  update(deltaTime: number): void {
    updateTimeline(this.__raw, deltaTime);
  }

  get constructFrame(): ((frame: number) => void) | null {
    return this.__raw.constructFrame;
  }

  set constructFrame(value: ((frame: number) => void) | null) {
    this.__raw.constructFrame = value;
  }

  get currentFrame(): number {
    return this.__raw.currentFrame;
  }

  set currentFrame(value: number) {
    this.__raw.currentFrame = value;
  }

  get frameRate(): number | null {
    return this.__raw.frameRate;
  }

  set frameRate(value: number | null) {
    this.__raw.frameRate = value;
  }

  get isPlaying(): boolean {
    return this.__raw.isPlaying;
  }

  addLabel(label: Readonly<TimelineLabel>): void {
    this.__raw.labels.push(label.raw);
  }

  getLabel(index: number): TimelineLabel | null {
    const raw = this.__raw.labels[index];
    return raw ? TimelineLabel.fromRaw(raw) : null;
  }

  get labels(): TimelineLabel[] {
    return this.__raw.labels.map((label) => TimelineLabel.fromRaw(label));
  }

  set labels(value: TimelineLabel[]) {
    this.__raw.labels = value.map((label) => label.raw);
  }

  override get raw(): RawTimelineEntity {
    return this.__raw;
  }

  get totalFrames(): number {
    return this.__raw.totalFrames;
  }

  set totalFrames(value: number) {
    this.__raw.totalFrames = value;
  }
}
