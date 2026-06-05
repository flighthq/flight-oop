# SDK Coverage Inventory

This is a working inventory for aligning `@flighthq/oop` with the local Flight SDK in `../flight`.

## Covered With OOP Wrappers

- `entity`: `Entity`
- `geometry`: `Vector2`, `Vector3`, `Vector4`, `Matrix`, `Matrix3`, `Matrix4`, `Rectangle`
- `materials`: `ColorTransform`, `Filter`, `Shader`
- `assets`: `AudioSource`, `Font`, `FontSource`, `ImageSource`, `TextureAtlas`, `TextureAtlasRegion`, `Tileset`, `VideoSource`
- `assets-loader`: `AssetLoader`
- `application`: `Application`, `ApplicationWindow`
- `media`: `AudioChannel`, `VideoChannel`
- `signals`: `Signal`
- `spritesheet`: `Spritesheet`, `SpritesheetAnimation`, `SpritesheetFrame`, `SpritesheetPlayer`
- `surface`: `Surface`
- `text-input`: `InputTextManager`, `SelectableRichTextManager`, plus editing/query methods on `InputText`
- `timeline`: `Timeline`
- `timeline-spritesheet`: `MovieClip.attachSpritesheetTimeline`
- `tween`: `Easing`, `Tween`, `TweenManager`
- `input`: `InputManager`
- `interaction`: `InteractionManager`
- `scene-display`: display object hierarchy and current display primitives
- `scene-sprite`: sprite node hierarchy, sprite, quad batch, tilemap
- `render`: `RenderState`, `RenderCommandPool`, `RenderNode`
- `render-canvas`: `CanvasRenderer`

## Partially Covered

- `assets` loading helpers are exposed as static constructors/loaders for image sources, texture atlases, tilesets, audio sources, and video sources.
- `scene` trait helpers are mostly surfaced through display/sprite wrappers rather than standalone trait wrappers.
- `render-canvas`, `render-dom`, and `render-webgl` backend internals are mostly not wrapped beyond `CanvasRenderer`; defer deeper wrapping until the adapter/render direction settles.
- `text-layout` still needs value wrappers for layout result/content/query types.

## Deliberately Not Compatibility API

- No `FlightObject`; use `Entity`.
- No `scene/graph`; use `scene`.
- No `animation/spritesheet`; use `spritesheet`.
- No old display properties such as `cacheAsBitmap`, `cacheAsBitmapMatrix`, or `opaqueBackground`.
- Use current SDK names such as `scrollRectangle`.

## SDK Types That Should Extend Entity

The OOP mirror now assumes these SDK raw types are entity-backed because they have OOP classes. If the SDK declarations do not currently say `extends Entity`, update the SDK types there.

- `Application`
- `ApplicationWindow`
- `AssetLoader`
- `AudioChannel`
- `AudioSource`
- `FontSource`
- `InputManager`
- `InputTextManager`
- `InputTextSelectionRectangle`
- `InteractionManager`
- `RichTextContent`
- `RenderCommandPool`
- `RenderNode`
- `RenderState`
- `SelectableRichTextManager`
- `Signal`
- `SpritesheetFrame`
- `SpritesheetPlayer`
- `TextFormat`
- `TextFormatRange`
- `TextLayoutGroup`
- `TextLayoutResult`
- `TextLineMetrics`
- `Timeline`
- `TimelineLabel`
- `Tween`
- `TweenManager`
- `VideoChannel`
- `VideoSource`

`Surface` already extends `ImageSource`, and `ImageSource` already extends `Entity`.

## Next Coverage Targets

1. Add text-layout value wrappers and query helpers.
2. Add API-level tests that assert the intended public exports of `@flighthq/oop`.
3. Revisit render backends once the adapter direction is clearer.
4. Wrap media/application edge APIs as Flight adds class-shaped SDK types.
