import {
  getAudioChannelCurrentTime,
  pauseAudioChannel,
  resumeAudioChannel,
  setAudioChannelCurrentTime,
  setAudioChannelGain,
  setAudioChannelPlaybackRate,
  stopAudioChannel,
} from '../internal/sdkCompat.js';
import type { AudioChannel as RawAudioChannel, AudioChannelState, Entity as RawEntity } from '../internal/sdkCompat.js';
import AudioSource from '../assets/AudioSource.js';
import Entity from '../Entity.js';
import Signal from '../signals/Signal.js';

type RawAudioChannelEntity = RawEntity & RawAudioChannel;

export default class AudioChannel extends Entity<RawAudioChannelEntity> {
  protected override __create(): RawAudioChannelEntity {
    throw new Error('AudioChannel objects are created by AudioSource.play().');
  }

  static fromRaw(raw: RawAudioChannel): AudioChannel {
    return Entity.getOrCreate(raw as RawAudioChannelEntity, AudioChannel)!;
  }

  pause(): void {
    pauseAudioChannel(this.__raw);
  }

  resume(): void {
    resumeAudioChannel(this.__raw);
  }

  stop(): void {
    stopAudioChannel(this.__raw);
  }

  get currentTime(): number {
    return getAudioChannelCurrentTime(this.__raw);
  }

  set currentTime(value: number) {
    setAudioChannelCurrentTime(this.__raw, value);
  }

  get gain(): number {
    return this.__raw.gain;
  }

  set gain(value: number) {
    setAudioChannelGain(this.__raw, value);
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
    setAudioChannelPlaybackRate(this.__raw, value);
  }

  override get raw(): RawAudioChannelEntity {
    return this.__raw;
  }

  get source(): AudioSource {
    return AudioSource.fromRaw(this.__raw.source);
  }

  get state(): AudioChannelState {
    return this.__raw.state;
  }
}
