# AGENTS.md

## Project Direction

This repository contains `@flighthq/oop`, an object-oriented mirror of the Flight SDK. The goal is not to create a compatibility layer for old APIs. The goal is to make the current Flight SDK feel natural when used through classes, instances, properties, and methods.

The dependency repository is `../flight`. It is the source of truth for the SDK surface. Packages in this repository depend on local unpublished Flight packages through `file:../flight/packages/...`.

`@flighthq/oop` intentionally trades tree-shake performance for ergonomic sugar. Keep the underlying Flight SDK architecture visible and intact.

## Current Naming

- Package name: `@flighthq/oop`
- Main source package: `packages/oop`
- SDK meta package: `@flighthq/sdk`
- Core wrapper base class: `Entity`
- Raw SDK object access: `.raw`
- Scene source path: `packages/oop/src/scene`
- Sprite source path: `packages/oop/src/scene/sprite`
- Display source path: `packages/oop/src/scene/display`
- Spritesheet source path: `packages/oop/src/spritesheet`

Do not reintroduce older names such as `FlightObject`, `scene/graph`, or `animation/spritesheet`.

## Architecture Rules

All entity-backed wrappers should extend `Entity<RawType>`.

Use the existing raw binding pattern:

- `Entity.get(raw)` returns an existing wrapper if one is bound.
- `Entity.getOrCreate(raw, Class)` returns the existing wrapper or constructs one around the raw object.
- Constructors normally call `super()` and then initialize raw data.
- `protected __create()` creates the raw SDK object.
- `.raw` exposes the underlying SDK object.

Preserve this architecture. Do not replace it with proxy objects, deep clones, or separate compatibility models.

## Wrapping Rules

When deciding where SDK functionality belongs:

- If the first SDK argument is the wrapped raw object, prefer an instance method or property.
- If an SDK function creates the wrapped object, prefer a constructor or static factory.
- If an SDK function compares or converts two peer values, prefer a static method on the relevant class.
- If an SDK export represents a long-lived process or service, prefer a manager class.
- If an SDK export is renderer/backend plumbing, defer wrapping until the render adapter direction is clearer.
- Type-only SDK concepts can remain type exports or be left raw when a class would not add value.

The OOP API should feel like Flight, not like Flash compatibility. Do not add legacy aliases unless the user explicitly asks for them.

## Naming And API Style

Mirror current Flight SDK names. Examples:

- Use `scrollRectangle`, not `scrollRect`.
- Use `scale9Grid` where the SDK owns that concept, such as `Scale9Shape`.
- Do not expose removed display properties such as `cacheAsBitmap`, `cacheAsBitmapMatrix`, or `opaqueBackground`.

For object properties, mirror SDK data names unless there is a strong OOP reason not to. Prefer `Readonly<>` in parameters where the method should read from a wrapper or value object without mutating it.

## Invalidation

When wrapper setters mutate visual, bounds, transform, or layout state, call the relevant SDK invalidation helpers through `internal/sdkCompat.ts`.

Use existing local patterns:

- Appearance changes call `invalidateAppearance`.
- Bounds-affecting changes call `invalidateLocalBounds`.
- Transform changes call `invalidateLocalTransform`.
- Full node invalidation uses `invalidate`.

Avoid redundant invalidation when the new value equals the old value.

## Internal SDK Access

Use `packages/oop/src/internal/sdkCompat.ts` as the bridge to `@flighthq/sdk`.

Add exports there when a wrapper needs a current SDK function. Keep it as a thin bridge and avoid adding legacy shims unless required to keep current wrappers compiling during a rename.

Prefer importing concrete wrapper classes from their package paths instead of using broad barrel imports when that avoids cycles.

## Current Coverage

The OOP layer currently has substantial coverage for:

- `Entity`
- geometry: `Vector2`, `Vector3`, `Vector4`, `Matrix`, `Matrix3`, `Matrix4`, `Rectangle`
- materials: `ColorTransform`, `Filter`, `Shader`
- assets: `ImageSource`, `TextureAtlas`, `TextureAtlasRegion`, `Tileset`
- spritesheet: `Spritesheet`, `SpritesheetAnimation`
- scene/display: `Bitmap`, `DisplayContainer`, `DisplayObject`, `HTMLView`, `InputText`, `MovieClip`, `RichText`, `Scale9Shape`, `Shape`, `SpriteBatch`, `Stage`, `Text`, `Video`
- scene/sprite: `SpriteNode`, `Sprite`, `QuadBatch`, `Tilemap`
- render: currently a `CanvasRenderer` wrapper exists

Recent scene/sprite direction:

- `SpriteNode` exposes transform and appearance traits, including `originX` and `originY`.
- `Sprite` owns child hierarchy methods plus sprite data such as `atlas`, `id`, and `rect`.
- `QuadBatch` owns batch buffer operations, capacity, point hit testing, and bounds measurement.
- `Tilemap` owns grid operations such as `resize`, `fillTiles`, `getTile`, and `setTile`.

## Likely Next Work

Start with a formal SDK coverage inventory comparing `../flight/packages/sdk/src/index.ts` to `packages/oop/src`.

Good next implementation areas:

1. Finish entity-backed asset wrappers: `AudioSource`, `VideoSource`, `FontSource`, `Font`, and related `from*` helpers.
2. Finish spritesheet and timeline alignment: `SpritesheetFrame`, `SpritesheetPlayer`, timeline, timeline-spritesheet, and `MovieClip` integration.
3. Add OOP wrappers for managers and systems: tween, input, interaction, signals.
4. Revisit render wrappers after the adapter/render direction in Flight settles.

## Testing And Verification

Use local Flight packages through the existing workspace install. The packages are not published online yet.

Common commands:

```sh
npm run build
npm test
npm run build:examples
npm run test:size
```

For narrow wrapper changes, at minimum run:

```sh
npm run build
npm test
```

Add focused tests next to the wrapper family being changed. Tests should exercise the OOP surface, not just raw SDK internals.

## Editing Notes

- Keep changes scoped to the wrapper family being updated.
- Do not revert unrelated working tree changes.
- Do not add old compatibility aliases by default.
- Keep `.raw` access available.
- Preserve the class inheritance shape even when the SDK has intermediate traits or helper functions.
- Prefer small, direct wrappers over large abstractions unless a repeated pattern is already established.
