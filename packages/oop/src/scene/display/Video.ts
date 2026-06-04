import { createVideo, invalidateAppearance, invalidateLocalBounds } from '../../internal/sdkCompat.js';
import type { Video as RawVideo, VideoData, VideoSource } from '../../internal/sdkCompat.js';

import Entity from '../../Entity.js';
import DisplayObject from './DisplayObject.js';

export default class Video extends DisplayObject {
  protected __data: VideoData;

  constructor(source?: VideoSource | null, smoothing?: boolean) {
    super();
    this.__data = this.__raw.data as VideoData;
    if (source !== undefined) this.__data.source = source;
    if (smoothing !== undefined) this.__data.smoothing = smoothing;
  }

  protected override __create() {
    return createVideo();
  }

  static fromRaw(raw: RawVideo): Video {
    return Entity.getOrCreate(raw, Video)!;
  }

  override get raw(): RawVideo {
    return this.__raw as RawVideo;
  }

  get smoothing(): boolean {
    return this.__data.smoothing;
  }

  set smoothing(value: boolean) {
    if (value === this.__data.smoothing) return;
    this.__data.smoothing = value;
    invalidateAppearance(this.__raw);
  }

  get source(): VideoSource | null {
    return this.__data.source;
  }

  set source(value: VideoSource | null) {
    if (value === this.__data.source) return;
    this.__data.source = value;
    invalidateLocalBounds(this.__raw);
    invalidateAppearance(this.__raw);
  }
}
