import {
  getVideoChannelCurrentTime,
  pauseVideoChannel,
  resumeVideoChannel,
  setVideoChannelCurrentTime,
  setVideoChannelGain,
  setVideoChannelPlaybackRate,
  stopVideoChannel,
} from '../internal/sdkCompat.js';
import type { Entity as RawEntity, VideoChannel as RawVideoChannel, VideoChannelState } from '../internal/sdkCompat.js';
import Entity from '../Entity.js';
import VideoSource from '../assets/VideoSource.js';
import Signal from '../signals/Signal.js';

type RawVideoChannelEntity = RawEntity & RawVideoChannel;

export default class VideoChannel extends Entity<RawVideoChannelEntity> {
  protected override __create(): RawVideoChannelEntity {
    throw new Error('VideoChannel objects are created by VideoSource.play().');
  }

  static fromRaw(raw: RawVideoChannel): VideoChannel {
    return Entity.getOrCreate(raw as RawVideoChannelEntity, VideoChannel)!;
  }

  pause(): void {
    pauseVideoChannel(this.__raw);
  }

  resume(): void {
    resumeVideoChannel(this.__raw);
  }

  stop(): void {
    stopVideoChannel(this.__raw);
  }

  get currentTime(): number {
    return getVideoChannelCurrentTime(this.__raw);
  }

  set currentTime(value: number) {
    setVideoChannelCurrentTime(this.__raw, value);
  }

  get gain(): number {
    return this.__raw.gain;
  }

  set gain(value: number) {
    setVideoChannelGain(this.__raw, value);
  }

  get length(): number {
    return this.__raw.length;
  }

  get loops(): number {
    return this.__raw.loops;
  }

  set loops(value: number) {
    this.__raw.loops = value;
  }

  get onComplete(): Signal<() => void> {
    return Signal.fromRaw(this.__raw.onComplete);
  }

  get playbackRate(): number {
    return this.__raw.playbackRate;
  }

  set playbackRate(value: number) {
    setVideoChannelPlaybackRate(this.__raw, value);
  }

  override get raw(): RawVideoChannelEntity {
    return this.__raw;
  }

  get source(): VideoSource {
    return VideoSource.fromRaw(this.__raw.source);
  }

  get state(): VideoChannelState {
    return this.__raw.state;
  }
}
