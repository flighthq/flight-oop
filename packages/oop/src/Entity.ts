import { attachBinding, createEntity, getBinding } from './internal/sdkCompat.js';
import type { Entity as RawEntity } from './internal/sdkCompat.js';

export default class Entity<RawType extends RawEntity> {
  private static nextRaw: object | null = null;

  protected __raw: RawType;

  constructor() {
    let raw: RawType;
    if (Entity.nextRaw) {
      raw = Entity.nextRaw as RawType;
      Entity.nextRaw = null;
    } else {
      raw = this.__create();
    }
    this.__raw = raw;
    attachBinding(raw, this);
  }

  protected __create(): RawType {
    return createEntity();
  }

  static get<RawType extends RawEntity, Type extends Entity<RawType>>(
    raw: Readonly<RawType> | null | undefined,
  ): Type | null {
    if (!raw) return null;
    return getBinding(raw) as Type | null;
  }

  static getOrCreate<RawType extends RawEntity, Type extends Entity<RawEntity>>(
    raw: Readonly<RawType> | null | undefined,
    classType: new () => Type,
  ): Type | null {
    if (!raw) return null;
    let api = getBinding(raw);
    if (api === null) {
      this.nextRaw = raw;
      api = new classType();
    }
    return api as Type;
  }

  // Get & Set Methods

  get raw(): RawType {
    return this.__raw;
  }
}
