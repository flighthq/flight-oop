import { createEntity } from '../internal/sdkCompat.js';
import type { Entity as RawEntity, TimelineLabel as RawTimelineLabel } from '../internal/sdkCompat.js';

import Entity from '../Entity.js';

type RawTimelineLabelEntity = RawEntity & RawTimelineLabel;

export default class TimelineLabel extends Entity<RawTimelineLabelEntity> {
  constructor(name: string = '', frame: number = 1) {
    super();
    this.__raw.name = name;
    this.__raw.frame = frame;
  }

  protected override __create(): RawTimelineLabelEntity {
    return createEntity({ frame: 1, name: '' }) as RawTimelineLabelEntity;
  }

  static fromRaw(raw: RawTimelineLabel): TimelineLabel {
    return Entity.getOrCreate(raw as RawTimelineLabelEntity, TimelineLabel)!;
  }

  get frame(): number {
    return this.__raw.frame;
  }

  set frame(value: number) {
    this.__raw.frame = value;
  }

  get name(): string {
    return this.__raw.name;
  }

  set name(value: string) {
    this.__raw.name = value;
  }
}
