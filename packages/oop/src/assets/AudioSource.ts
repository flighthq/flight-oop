import {
  createAudioSource,
  createAudioSourceFromURL,
  createAudioSourceFromURLs,
  getAudioContext,
  loadAudioSourceFromURL,
  loadAudioSourceFromURLs,
} from '../internal/sdkCompat.js';
import type { AudioSource as RawAudioSource, AudioSourceURL } from '../internal/sdkCompat.js';
import { playAudioSource } from '../internal/sdkCompat.js';
import type { AudioPlayOptions, Entity as RawEntity } from '../internal/sdkCompat.js';

import Entity from '../Entity.js';
import AudioChannel from '../media/AudioChannel.js';

type RawAudioSourceEntity = RawEntity & RawAudioSource;

export default class AudioSource extends Entity<RawAudioSourceEntity> {
  constructor(buffer?: AudioBuffer) {
    super();
    if (buffer !== undefined) this.__raw.buffer = buffer;
  }

  protected override __create(): RawAudioSourceEntity {
    return createAudioSource() as RawAudioSourceEntity;
  }

  static fromRaw(raw: RawAudioSource): AudioSource {
    return Entity.getOrCreate(raw as RawAudioSourceEntity, AudioSource)!;
  }

  static fromURL(url: string): AudioSource {
    return AudioSource.fromRaw(createAudioSourceFromURL(url));
  }

  static fromURLs(sources: AudioSourceURL[]): AudioSource {
    return AudioSource.fromRaw(createAudioSourceFromURLs(sources));
  }

  static getContext(): AudioContext {
    return getAudioContext();
  }

  static async loadFromURL(url: string): Promise<AudioSource> {
    return AudioSource.fromRaw(await loadAudioSourceFromURL(url));
  }

  static async loadFromURLs(sources: AudioSourceURL[]): Promise<AudioSource> {
    return AudioSource.fromRaw(await loadAudioSourceFromURLs(sources));
  }

  play(options?: Readonly<AudioPlayOptions>): AudioChannel | null {
    const channel = playAudioSource(this.__raw, options);
    return channel ? AudioChannel.fromRaw(channel) : null;
  }

  get buffer(): AudioBuffer | null {
    return this.__raw.buffer;
  }

  set buffer(value: AudioBuffer | null) {
    this.__raw.buffer = value;
  }

  override get raw(): RawAudioSourceEntity {
    return this.__raw;
  }
}
