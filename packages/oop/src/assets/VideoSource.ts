import {
  createVideoSource,
  createVideoSourceFromURL,
  createVideoSourceFromURLs,
  loadVideoSourceFromURL,
  loadVideoSourceFromURLs,
} from '../internal/sdkCompat.js';
import { playVideoSource } from '../internal/sdkCompat.js';
import type { Entity as RawEntity, VideoPlayOptions, VideoSource as RawVideoSource, VideoSourceURL } from '../internal/sdkCompat.js';

import Entity from '../Entity.js';
import VideoChannel from '../media/VideoChannel.js';

type RawVideoSourceEntity = RawEntity & RawVideoSource;

export default class VideoSource extends Entity<RawVideoSourceEntity> {
  constructor(element?: HTMLVideoElement) {
    super();
    if (element !== undefined) this.__raw.element = element;
  }

  protected override __create(): RawVideoSourceEntity {
    return createVideoSource() as RawVideoSourceEntity;
  }

  static fromRaw(raw: RawVideoSource): VideoSource {
    return Entity.getOrCreate(raw as RawVideoSourceEntity, VideoSource)!;
  }

  static fromURL(url: string): VideoSource {
    return VideoSource.fromRaw(createVideoSourceFromURL(url));
  }

  static fromURLs(sources: VideoSourceURL[]): VideoSource {
    return VideoSource.fromRaw(createVideoSourceFromURLs(sources));
  }

  static async loadFromURL(url: string): Promise<VideoSource> {
    return VideoSource.fromRaw(await loadVideoSourceFromURL(url));
  }

  static async loadFromURLs(sources: VideoSourceURL[]): Promise<VideoSource> {
    return VideoSource.fromRaw(await loadVideoSourceFromURLs(sources));
  }

  play(options?: Readonly<VideoPlayOptions>): VideoChannel | null {
    const channel = playVideoSource(this.__raw, options);
    return channel ? VideoChannel.fromRaw(channel) : null;
  }

  get element(): HTMLVideoElement | null {
    return this.__raw.element;
  }

  set element(value: HTMLVideoElement | null) {
    this.__raw.element = value;
  }

  override get raw(): RawVideoSourceEntity {
    return this.__raw;
  }
}
