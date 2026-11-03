/* @ts-self-types="./hana.d.ts" */
import { disposeVideo, loadImageFromBytes, loadImageFromUrl, loadVideoFromBytes, loadVideoFromUrl, videoFrameToken } from './snippets/hana-82e9eb82a79dead4/js-imports.js';


export class DeviceLostPromise {
    static __wrap(ptr) {
        const obj = Object.create(DeviceLostPromise.prototype);
        obj.__wbg_ptr = ptr;
        DeviceLostPromiseFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DeviceLostPromiseFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_devicelostpromise_free(ptr, 0);
    }
    /**
     * @returns {Promise<string>}
     */
    wait() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.devicelostpromise_wait(ptr);
        return takeObject(ret);
    }
}
if (Symbol.dispose) DeviceLostPromise.prototype[Symbol.dispose] = DeviceLostPromise.prototype.free;

export class Engine {
    static __wrap(ptr) {
        const obj = Object.create(Engine.prototype);
        obj.__wbg_ptr = ptr;
        EngineFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        EngineFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_engine_free(ptr, 0);
    }
    /**
     * @param {HTMLCanvasElement} canvas
     * @param {DocumentData} document_data
     * @param {boolean} force_webgl
     * @returns {Promise<Engine>}
     */
    static create(canvas, document_data, force_webgl) {
        const ret = wasm.engine_create(addHeapObject(canvas), addHeapObject(document_data), force_webgl);
        return takeObject(ret);
    }
    /**
     * @returns {DeviceLostPromise | undefined}
     */
    getDeviceLostPromise() {
        const ret = wasm.engine_getDeviceLostPromise(this.__wbg_ptr);
        return ret === 0 ? undefined : DeviceLostPromise.__wrap(ret);
    }
    /**
     * @returns {number | undefined}
     */
    getGpuFrameTimeMs() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.engine_getGpuFrameTimeMs(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r2 = getDataViewMemory0().getFloat64(retptr + 8 * 1, true);
            return r0 === 0 ? undefined : r2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @returns {boolean}
     */
    isWebgpu() {
        const ret = wasm.engine_isWebgpu(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {number | null} [dt]
     */
    onFrame(dt) {
        wasm.engine_onFrame(this.__wbg_ptr, !isLikeNone(dt), isLikeNone(dt) ? 0 : dt);
    }
    /**
     * @param {ID} id
     */
    removeTexture(id) {
        wasm.engine_removeTexture(this.__wbg_ptr, addHeapObject(id));
    }
    /**
     * @param {Float2} world_min
     * @param {Float2} world_max
     * @param {number} long_side_px
     * @returns {PixelReadPromise}
     */
    renderRegion(world_min, world_max, long_side_px) {
        const ret = wasm.engine_renderRegion(this.__wbg_ptr, addHeapObject(world_min), addHeapObject(world_max), long_side_px);
        return PixelReadPromise.__wrap(ret);
    }
    /**
     * @param {DocumentData} document_data
     */
    reset(document_data) {
        wasm.engine_reset(this.__wbg_ptr, addHeapObject(document_data));
    }
    /**
     * @param {UInt2} logical_size
     * @param {number} scale_factor
     */
    resize(logical_size, scale_factor) {
        wasm.engine_resize(this.__wbg_ptr, addHeapObject(logical_size), scale_factor);
    }
    /**
     * @param {Float2} size
     * @param {Float2} pos
     * @returns {PixelReadPromise}
     */
    samplePixels(size, pos) {
        const ret = wasm.engine_samplePixels(this.__wbg_ptr, addHeapObject(size), addHeapObject(pos));
        return PixelReadPromise.__wrap(ret);
    }
}
if (Symbol.dispose) Engine.prototype[Symbol.dispose] = Engine.prototype.free;

export class PixelReadPromise {
    static __wrap(ptr) {
        const obj = Object.create(PixelReadPromise.prototype);
        obj.__wbg_ptr = ptr;
        PixelReadPromiseFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PixelReadPromiseFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_pixelreadpromise_free(ptr, 0);
    }
    /**
     * @returns {Promise<Uint8Array>}
     */
    wait() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.pixelreadpromise_wait(ptr);
        return takeObject(ret);
    }
}
if (Symbol.dispose) PixelReadPromise.prototype[Symbol.dispose] = PixelReadPromise.prototype.free;

export class SceneController {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SceneControllerFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_scenecontroller_free(ptr, 0);
    }
    /**
     * @returns {boolean}
     */
    get is_play_mode() {
        const ret = wasm.__wbg_get_scenecontroller_is_play_mode(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get needs_video_update() {
        const ret = wasm.__wbg_get_scenecontroller_needs_video_update(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    get show_pixel_grid() {
        const ret = wasm.__wbg_get_scenecontroller_show_pixel_grid(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Register multicolor art for an inline emoji, keyed by its Twemoji codepoint
     * (e.g. `"1f44b"` or the flag `"1f1fa-1f1f8"`). `art` is the svg-to-hana subtree
     * for the emoji — a frame whose children are its per-color vec-net shapes. The
     * text layout reserves an inline box for any grapheme whose codepoint is
     * registered here, and the scene graph draws this art at that box. Runtime-only:
     * the art is warmed in per session, never written back to the document.
     * @param {string} codepoint
     * @param {any} art
     */
    addEmojiArt(codepoint, art) {
        const ptr0 = passStringToWasm0(codepoint, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        wasm.scenecontroller_addEmojiArt(this.__wbg_ptr, ptr0, len0, addHeapObject(art));
    }
    /**
     * @param {ID} id
     * @param {UrlOrPlatformUInt8Array} image
     */
    addImage(id, image) {
        wasm.scenecontroller_addImage(this.__wbg_ptr, addHeapObject(id), addHeapObject(image));
    }
    /**
     * The optional args name a face inside a font collection (`.ttc` — common for
     * macOS system fonts): the matching face is parsed instead of face 0. Omitting
     * them (existing 2-arg callers) keeps the old behavior.
     *
     * Returns whether the asset now holds a parsed font — false when the bytes
     * aren't parseable by the engine (or on a no-text build). Hosts use it to
     * decide whether an overlay `TextSimple` may reference the asset via
     * `font_id`: an id whose font never parses would silently render with the
     * built-in fallback and sit in the overlay's pending-font set forever.
     * @param {ID} id
     * @param {Uint8Array} data
     * @param {string | null} [postscript_name]
     * @param {string | null} [family]
     * @param {string | null} [style]
     * @returns {boolean}
     */
    addLocalFont(id, data, postscript_name, family, style) {
        var ptr0 = isLikeNone(postscript_name) ? 0 : passStringToWasm0(postscript_name, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(family) ? 0 : passStringToWasm0(family, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(style) ? 0 : passStringToWasm0(style, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        var len2 = WASM_VECTOR_LEN;
        const ret = wasm.scenecontroller_addLocalFont(this.__wbg_ptr, addHeapObject(id), addHeapObject(data), ptr0, len0, ptr1, len1, ptr2, len2);
        return ret !== 0;
    }
    /**
     * @param {ID} id
     * @param {Model3DGeometryData} data
     */
    addModel3DGeometry(id, data) {
        wasm.scenecontroller_addModel3DGeometry(this.__wbg_ptr, addHeapObject(id), addHeapObject(data));
    }
    /**
     * @param {ID} id
     * @param {UrlOrPlatformUInt8Array} video
     */
    addVideo(id, video) {
        wasm.scenecontroller_addVideo(this.__wbg_ptr, addHeapObject(id), addHeapObject(video));
    }
    /**
     * Returns a Promise that resolves once the web font has been fetched and parsed.
     * Callers that need to react to font-load completion (e.g. to re-anchor auto-sized
     * text shapes whose natural size depends on glyph metrics) should await this.
     * @param {ID} id
     * @param {string} url
     * @returns {Promise<any>}
     */
    addWebFont(id, url) {
        const ptr0 = passStringToWasm0(url, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.scenecontroller_addWebFont(this.__wbg_ptr, addHeapObject(id), ptr0, len0);
        return takeObject(ret);
    }
    /**
     * @param {Uint8Array} data
     * @param {Uint32Array} selected_verts
     * @param {Float2} delta
     * @returns {Uint8Array | undefined}
     */
    applyDeltaToVectorVertexPositionSelection(data, selected_verts, delta) {
        const ret = wasm.scenecontroller_applyDeltaToVectorVertexPositionSelection(this.__wbg_ptr, addHeapObject(data), addHeapObject(selected_verts), addHeapObject(delta));
        return takeObject(ret);
    }
    /**
     * @param {ID} id
     * @returns {BoundingBox | undefined}
     */
    axisAlignedBoundingBox(id) {
        const ret = wasm.scenecontroller_axisAlignedBoundingBox(this.__wbg_ptr, addHeapObject(id));
        return takeObject(ret);
    }
    /**
     * @returns {BoundingBox | undefined}
     */
    boundingBox() {
        const ret = wasm.scenecontroller_boundingBox(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @param {Float2} start
     * @param {Float2} end
     * @param {boolean} isolate
     * @param {boolean} fully
     * @param {ID | null} [root]
     * @returns {ID[]}
     */
    boxIntersectsObjects(start, end, isolate, fully, root) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.scenecontroller_boxIntersectsObjects(retptr, this.__wbg_ptr, addHeapObject(start), addHeapObject(end), isolate, fully, isLikeNone(root) ? 0 : addHeapObject(root));
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_export4(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {ID} id
     * @param {number | null} [width]
     * @returns {Float2 | undefined}
     */
    calcTextAutoSize(id, width) {
        const ret = wasm.scenecontroller_calcTextAutoSize(this.__wbg_ptr, addHeapObject(id), isLikeNone(width) ? Number.MAX_SAFE_INTEGER : Math.fround(width));
        return takeObject(ret);
    }
    /**
     * @param {ID} id
     * @returns {Float2}
     */
    centerPencilData(id) {
        const ret = wasm.scenecontroller_centerPencilData(this.__wbg_ptr, addHeapObject(id));
        return takeObject(ret);
    }
    /**
     * @returns {Float2}
     */
    centerVectorData() {
        const ret = wasm.scenecontroller_centerVectorData(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * Drop the export-time frame override for one video asset (see
     * `setVideoExportFrame`): the renderer resumes sampling its `<video>`
     * element and `seekVideos` drives it again. The export loop's per-video
     * fallback for a WebCodecs source that stopped delivering mid-export.
     * @param {ID} id
     */
    clearVideoExportFrame(id) {
        wasm.scenecontroller_clearVideoExportFrame(this.__wbg_ptr, addHeapObject(id));
    }
    /**
     * Drop every export-time video frame override (see `setVideoExportFrame`).
     */
    clearVideoExportFrames() {
        wasm.scenecontroller_clearVideoExportFrames(this.__wbg_ptr);
    }
    /**
     * @param {any} network
     * @param {Float2} size
     * @returns {VecNetShapeData | undefined}
     */
    figmaVectorToVecNet(network, size) {
        const ret = wasm.scenecontroller_figmaVectorToVecNet(this.__wbg_ptr, addHeapObject(network), addHeapObject(size));
        return takeObject(ret);
    }
    /**
     * @param {ID} shape
     * @returns {ParseSvgPathResult | undefined}
     */
    flattenShape(shape) {
        const ret = wasm.scenecontroller_flattenShape(this.__wbg_ptr, addHeapObject(shape));
        return takeObject(ret);
    }
    /**
     * Re-solve layout + constraints for the subtree affected by an edit to `id`, returning the
     * objects whose geometry changed for the editor to persist via `dispatchNoUndo`. The caller
     * does NOT choose directions: this walks up to the highest affected ancestor (the layout root)
     * and runs the full measure/arrange solve down through every frame. Because the solve is a pure,
     * idempotent function of geometry, this maximal pass is correct for every trigger (resize,
     * reorder, reparent, layout-prop change, scale, visibility) — an unaffected node re-solves to
     * its current geometry and simply isn't reported. Structural-edit path — does not consume
     * `needs_layout_resolve` dirty marks.
     * @param {ID} id
     * @returns {LayoutResult[]}
     */
    flushLayout(id) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.scenecontroller_flushLayout(retptr, this.__wbg_ptr, addHeapObject(id));
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_export4(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @returns {number | undefined}
     */
    getCurrentFrameIndex() {
        const ret = wasm.scenecontroller_getCurrentFrameIndex(this.__wbg_ptr);
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * @returns {number}
     */
    getTotalFramesAmount() {
        const ret = wasm.scenecontroller_getTotalFramesAmount(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {VecNetShapeData | undefined}
     */
    getUpdatedPencilData() {
        const ret = wasm.scenecontroller_getUpdatedPencilData(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {VecNetShapeData | undefined}
     */
    getUpdatedVecNetData() {
        const ret = wasm.scenecontroller_getUpdatedVecNetData(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * Get the oriented bounding box of selected vertices in local coordinates.
     * `box_orientation_radians` is the orientation angle of the box.
     * Returns [half_w, half_h, m00, m01, m10, m11, tx, ty] or null if no selection.
     * The first two values are the half-size. The remaining six are the local matrix
     * (2x2 rotation columns + translation) mapping from box space to parent space.
     * @param {number} box_orientation_radians
     * @returns {Float32Array | undefined}
     */
    getVectorBoxSelectionBoundsAndLocalMatrix(box_orientation_radians) {
        const ret = wasm.scenecontroller_getVectorBoxSelectionBoundsAndLocalMatrix(this.__wbg_ptr, box_orientation_radians);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    getVectorCursor() {
        const ret = wasm.scenecontroller_getVectorCursor(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {any}
     */
    getVectorEditMode() {
        const ret = wasm.scenecontroller_getVectorEditMode(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {PlatformUInt8Array | undefined}
     */
    getVectorEditingState() {
        const ret = wasm.scenecontroller_getVectorEditingState(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * @returns {Uint32Array}
     */
    getVectorSelectedVerts() {
        const ret = wasm.scenecontroller_getVectorSelectedVerts(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
     * Get the count of selected vertices (including vertices from selected segments)
     * @returns {number}
     */
    getVectorSelectionCount() {
        const ret = wasm.scenecontroller_getVectorSelectionCount(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {boolean}
     */
    hasFontAssetsChanges() {
        const ret = wasm.scenecontroller_hasFontAssetsChanges(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Check if any segments are selected (as opposed to individual vertices)
     * @returns {boolean}
     */
    hasSingleVectorSelectedSegment() {
        const ret = wasm.scenecontroller_hasSingleVectorSelectedSegment(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * The instance-root collab id that a (possibly virtual / realized) object id
     * belongs to, or `null` if it is not inside a virtual instance. The editor
     * uses this to redirect an edit on an instance's inner node into an override
     * on the instance root, instead of a no-op edit against the un-persisted node.
     * @param {any} id
     * @returns {any}
     */
    instanceRootOf(id) {
        const ret = wasm.scenecontroller_instanceRootOf(this.__wbg_ptr, addHeapObject(id));
        return takeObject(ret);
    }
    /**
     * Single object intersection that does not consider parent, visibility or clipping
     * @param {Float2} pos
     * @param {ID} object
     * @param {number | null} [stroke_margin]
     * @param {boolean | null} [is_selected]
     * @returns {boolean}
     */
    intersectsObject(pos, object, stroke_margin, is_selected) {
        const ret = wasm.scenecontroller_intersectsObject(this.__wbg_ptr, addHeapObject(pos), addHeapObject(object), isLikeNone(stroke_margin) ? Number.MAX_SAFE_INTEGER : Math.fround(stroke_margin), isLikeNone(is_selected) ? 0xFFFFFF : is_selected ? 1 : 0);
        return ret !== 0;
    }
    /**
     * @param {Float2} pos
     * @param {boolean | null} [include_locked]
     * @param {number | null} [stroke_margin]
     * @returns {ID[]}
     */
    intersectsObjects(pos, include_locked, stroke_margin) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.scenecontroller_intersectsObjects(retptr, this.__wbg_ptr, addHeapObject(pos), isLikeNone(include_locked) ? 0xFFFFFF : include_locked ? 1 : 0, isLikeNone(stroke_margin) ? Number.MAX_SAFE_INTEGER : Math.fround(stroke_margin));
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_export4(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @returns {boolean}
     */
    isEditedVectorEmpty() {
        const ret = wasm.scenecontroller_isEditedVectorEmpty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {ID} id
     * @returns {boolean}
     */
    isObjectInViewport(id) {
        const ret = wasm.scenecontroller_isObjectInViewport(this.__wbg_ptr, addHeapObject(id));
        return ret !== 0;
    }
    /**
     * Whether the built-in editor/UI font (the font the immediate-mode
     * `updateUiShapes` overlay renders text with when a shape names no
     * `font_id`, and the fallback while a named font asset is still
     * loading) has been fetched and parsed.
     * The load kicks off asynchronously at controller creation
     * (`Assets::load_ui_font`), so overlay text pushed before it lands
     * tessellates to nothing until the next frame after the load completes.
     * Hosts that rasterize on demand (the spline editor / runtime UI-frame
     * canvases) poll this to know when to re-render — without it a canvas
     * rasterized once at boot shows every shape except its texts.
     * @returns {boolean}
     */
    isUiFontLoaded() {
        const ret = wasm.scenecontroller_isUiFontLoaded(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    isVectorBoxSelectAllowed() {
        const ret = wasm.scenecontroller_isVectorBoxSelectAllowed(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns true if a vector point (vert or visible control point) is under the given
     * world position. Used to give point interactions priority over the resize box.
     * @param {Float2} pos
     * @returns {boolean}
     */
    isVectorPointUnderCursor(pos) {
        const ret = wasm.scenecontroller_isVectorPointUnderCursor(this.__wbg_ptr, addHeapObject(pos));
        return ret !== 0;
    }
    layout() {
        wasm.scenecontroller_layout(this.__wbg_ptr);
    }
    /**
     * Drain pending `needs_layout_resolve` dirty marks (set via `markNeedsLayoutResolve`) through
     * the constraint + autolayout re-solve and return the objects whose geometry changed. Capturing
     * counterpart of `layout()`, for the size-change write-back path.
     * @returns {LayoutResult[]}
     */
    layoutFromResize() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.scenecontroller_layoutFromResize(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_export4(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Mark an object's subtree for a layout + constraint re-solve on the next `update_cached`
     * (drained by `compute_layout_and_constraints_from_resize`). The editor calls this after a
     * non-base-state resize, where layout results must be applied purely in the runtime rather than
     * written to the data layer.
     * @param {ID} id
     */
    markNeedsLayoutResolve(id) {
        wasm.scenecontroller_markNeedsLayoutResolve(this.__wbg_ptr, addHeapObject(id));
    }
    /**
     * Measures the natural size for a text shape given its data. Used by the editor
     * before dispatching auto-size mutations so it can shift `position` to keep the
     * alignment-anchored corner in place. Returns `data.size` unchanged if the font is
     * not loaded yet or `autoSize` is None.
     * @param {TextShapeData} data
     * @returns {Float2}
     */
    measureTextNaturalSize(data) {
        const ret = wasm.scenecontroller_measureTextNaturalSize(this.__wbg_ptr, addHeapObject(data));
        return takeObject(ret);
    }
    /**
     * Returns the currently selected clip index for the shape, or null if no clip
     * is bound.
     * @param {ID} id
     * @returns {number | undefined}
     */
    model3DAnimationClipIndex(id) {
        const ret = wasm.scenecontroller_model3DAnimationClipIndex(this.__wbg_ptr, addHeapObject(id));
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Returns whether the shape's animation is currently playing.
     * @param {ID} id
     * @returns {boolean}
     */
    model3DAnimationIsPlaying(id) {
        const ret = wasm.scenecontroller_model3DAnimationIsPlaying(this.__wbg_ptr, addHeapObject(id));
        return ret !== 0;
    }
    /**
     * Current playhead in seconds for the shape's bound clip, or null when no
     * clip is selected.
     * @param {ID} id
     * @returns {number | undefined}
     */
    model3DAnimationLocalTime(id) {
        const ret = wasm.scenecontroller_model3DAnimationLocalTime(this.__wbg_ptr, addHeapObject(id));
        return ret === Number.MAX_SAFE_INTEGER ? undefined : ret;
    }
    /**
     * Move selected vertices by a delta
     * @param {Float2} delta
     */
    moveVectorSelectionByDelta(delta) {
        wasm.scenecontroller_moveVectorSelectionByDelta(this.__wbg_ptr, addHeapObject(delta));
    }
    /**
     * @param {ID} id
     * @returns {BoundingBox | undefined}
     */
    objectAlignedBoundingBox(id) {
        const ret = wasm.scenecontroller_objectAlignedBoundingBox(this.__wbg_ptr, addHeapObject(id));
        return takeObject(ret);
    }
    /**
     * The current data of an object by collab id, read from the runtime slotmap.
     * Works for *virtual* instance descendants (which exist only in the slotmap,
     * realized from the component registry, not in the collab tree), so the editor
     * can read a realized node's properties — e.g. to populate the inspector for a
     * node selected inside an instance. Returns `null` if the id is unknown.
     * @param {any} id
     * @returns {any}
     */
    objectData(id) {
        const ret = wasm.scenecontroller_objectData(this.__wbg_ptr, addHeapObject(id));
        return takeObject(ret);
    }
    /**
     * @param {ID} id
     * @returns {Affine2 | undefined}
     */
    objectLocalMatrix(id) {
        const ret = wasm.scenecontroller_objectLocalMatrix(this.__wbg_ptr, addHeapObject(id));
        return takeObject(ret);
    }
    /**
     * @param {ID} id
     * @returns {Affine2 | undefined}
     */
    objectWorldMatrix(id) {
        const ret = wasm.scenecontroller_objectWorldMatrix(this.__wbg_ptr, addHeapObject(id));
        return takeObject(ret);
    }
    /**
     * @param {ID} id
     * @returns {Affine2 | undefined}
     */
    objectWorldMatrixWithChildrenOffset(id) {
        const ret = wasm.scenecontroller_objectWorldMatrixWithChildrenOffset(this.__wbg_ptr, addHeapObject(id));
        return takeObject(ret);
    }
    /**
     * @param {string} key
     */
    onKeyDown(key) {
        const ptr0 = passStringToWasm0(key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        wasm.scenecontroller_onKeyDown(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} key
     */
    onKeyUp(key) {
        const ptr0 = passStringToWasm0(key, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        wasm.scenecontroller_onKeyUp(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {Float2} pos
     * @param {boolean} is_touch
     * @param {number} button
     */
    onPointerDown(pos, is_touch, button) {
        wasm.scenecontroller_onPointerDown(this.__wbg_ptr, addHeapObject(pos), is_touch, button);
    }
    onPointerEnter() {
        wasm.scenecontroller_onPointerEnter(this.__wbg_ptr);
    }
    onPointerLeave() {
        wasm.scenecontroller_onPointerLeave(this.__wbg_ptr);
    }
    /**
     * @param {Float2} pos
     * @param {boolean} is_touch
     * @param {number} button
     */
    onPointerMove(pos, is_touch, button) {
        wasm.scenecontroller_onPointerMove(this.__wbg_ptr, addHeapObject(pos), is_touch, button);
    }
    /**
     * @param {Float2} pos
     * @param {boolean} is_touch
     * @param {number} button
     */
    onPointerUp(pos, is_touch, button) {
        wasm.scenecontroller_onPointerUp(this.__wbg_ptr, addHeapObject(pos), is_touch, button);
    }
    /**
     * The *outermost* (top-level, collab-addressable) instance root that a possibly
     * virtual / nested realized object id belongs to, or `null` if it is not inside
     * any instance. Unlike [`instanceRootOf`](Self::instance_root_of) (nearest), this
     * walks past nested instance hosts. The editor folds an edit on a node inside a
     * (possibly nested) instance into *this* instance's overrides; for a node inside a
     * nested instance the override is a composite path that composes across the
     * boundary.
     * @param {any} id
     * @returns {any}
     */
    outermostInstanceRootOf(id) {
        const ret = wasm.scenecontroller_outermostInstanceRootOf(this.__wbg_ptr, addHeapObject(id));
        return takeObject(ret);
    }
    /**
     * @param {ID} child_id
     * @param {ID} parent_id
     * @returns {BoundingBox | undefined}
     */
    parentAlignedBoundingBox(child_id, parent_id) {
        const ret = wasm.scenecontroller_parentAlignedBoundingBox(this.__wbg_ptr, addHeapObject(child_id), addHeapObject(parent_id));
        return takeObject(ret);
    }
    /**
     * @param {string} path
     * @param {number} fill_rule
     * @returns {ParseSvgPathResult | undefined}
     */
    parseSvgPath(path, fill_rule) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_export, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.scenecontroller_parseSvgPath(this.__wbg_ptr, ptr0, len0, fill_rule);
        return takeObject(ret);
    }
    pencilShiftDown() {
        wasm.scenecontroller_pencilShiftDown(this.__wbg_ptr);
    }
    pencilShiftUp() {
        wasm.scenecontroller_pencilShiftUp(this.__wbg_ptr);
    }
    /**
     * How many async document-asset loads (images, videos, web fonts) are
     * still in flight. Editor-only: the video export preview polls this on
     * its standalone engine to start recording only once the freshly-created
     * scene is fully loaded (the `has*AssetsChanges` flags can only say
     * "something landed this frame", never "nothing is still loading").
     * @returns {number}
     */
    pendingAssetLoads() {
        const ret = wasm.scenecontroller_pendingAssetLoads(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {ID} frame_id
     */
    playInEditorFrame(frame_id) {
        wasm.scenecontroller_playInEditorFrame(this.__wbg_ptr, addHeapObject(frame_id));
    }
    /**
     * @param {ID | null} [start_frame]
     * @param {boolean | null} [autoplay_videos]
     */
    present(start_frame, autoplay_videos) {
        wasm.scenecontroller_present(this.__wbg_ptr, isLikeNone(start_frame) ? 0 : addHeapObject(start_frame), isLikeNone(autoplay_videos) ? 0xFFFFFF : autoplay_videos ? 1 : 0);
    }
    /**
     * Editor-only: live-preview a single transition tween on `object_id`, animating
     * from the object's current look to `to_state` (null = base state) using the
     * easing/duration/params in `tween_data` (a `TweenData`). Plays once; forward-only.
     * Snap the object to the desired start state via `resetAllStates` before calling,
     * and `stopPreviewTransition` + `resetAllStates` to revert.
     * @param {ID} object_id
     * @param {ID | null | undefined} to_state
     * @param {any} tween_data
     */
    previewTransition(object_id, to_state, tween_data) {
        wasm.scenecontroller_previewTransition(this.__wbg_ptr, addHeapObject(object_id), isLikeNone(to_state) ? 0 : addHeapObject(to_state), addHeapObject(tween_data));
    }
    /**
     * @param {ID} id
     * @returns {BoundingBox | undefined}
     */
    projectionEffectBoundingBox(id) {
        const ret = wasm.scenecontroller_projectionEffectBoundingBox(this.__wbg_ptr, addHeapObject(id));
        return takeObject(ret);
    }
    /**
     * @param {Uint8Array} data
     * @param {Uint32Array} selected_verts
     * @returns {Float64Array}
     */
    readVectorCornerRadiiForSelection(data, selected_verts) {
        const ret = wasm.scenecontroller_readVectorCornerRadiiForSelection(this.__wbg_ptr, addHeapObject(data), addHeapObject(selected_verts));
        return takeObject(ret);
    }
    /**
     * @param {Uint8Array} data
     * @returns {number}
     */
    readVectorCornerSmoothing(data) {
        const ret = wasm.scenecontroller_readVectorCornerSmoothing(this.__wbg_ptr, addHeapObject(data));
        return ret;
    }
    /**
     * @param {Uint8Array} data
     * @param {Uint32Array} selected_verts
     * @returns {Float64Array}
     */
    readVectorVertexPositionsForSelection(data, selected_verts) {
        const ret = wasm.scenecontroller_readVectorVertexPositionsForSelection(this.__wbg_ptr, addHeapObject(data), addHeapObject(selected_verts));
        return takeObject(ret);
    }
    /**
     * Derive the pure-resolution constraint anchor for `child` within `parent` from their current
     * Re-derive a constrained child's runtime-only inset anchor from its current base geometry and
     * stored [`crate::data::AnchorMode`]s. The editor calls this after a *direct* geometry edit of
     * the child (drag/resize/paste/reparent) — NOT on a parent-resize-induced move — so subsequent
     * parent resizes resolve the child purely and drift-free. The insets are never persisted (a pure
     * function of geometry, derived at scene load); this only refreshes the runtime cache.
     * @param {ID} id
     */
    reanchorObject(id) {
        wasm.scenecontroller_reanchorObject(this.__wbg_ptr, addHeapObject(id));
    }
    /**
     * @param {ID | null | undefined} frame
     * @param {ObjectStateSelection[]} overrides
     */
    resetAllStates(frame, overrides) {
        const ptr0 = passArrayJsValueToWasm0(overrides, wasm.__wbindgen_export);
        const len0 = WASM_VECTOR_LEN;
        wasm.scenecontroller_resetAllStates(this.__wbg_ptr, isLikeNone(frame) ? 0 : addHeapObject(frame), ptr0, len0);
    }
    /**
     * Resize a group to `(width, height)` by scaling its contents (geometry only), returning the
     * descendants whose geometry changed for the editor to persist. Group self-resize entry point
     * — a group has no size, so free-resizing it scales its children.
     * @param {ID} id
     * @param {number} width
     * @param {number} height
     * @returns {LayoutResult[]}
     */
    resizeGroup(id, width, height) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.scenecontroller_resizeGroup(retptr, this.__wbg_ptr, addHeapObject(id), width, height);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_export4(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Save the initial positions of selected vertices and control points
     * Must be called before transform_vector_selection for transforms to work correctly
     */
    saveVectorSelectionInitialPositions() {
        wasm.scenecontroller_saveVectorSelectionInitialPositions(this.__wbg_ptr);
    }
    /**
     * @param {Float2} pos
     * @returns {Float2}
     */
    screenToWorld(pos) {
        const ret = wasm.scenecontroller_screenToWorld(this.__wbg_ptr, addHeapObject(pos));
        return takeObject(ret);
    }
    /**
     * Resolves to whether any video seeked backward (wrapped across its
     * loop point) — the export loop renders throwaway frames after a wrap
     * to keep cold-path video→RGB conversion transients off captured frames.
     * @param {number} dt
     * @returns {Promise<boolean>}
     */
    seekVideos(dt) {
        const ret = wasm.scenecontroller_seekVideos(this.__wbg_ptr, dt);
        return takeObject(ret);
    }
    /**
     * @param {Uint8Array} data
     * @param {Uint32Array} selected_verts
     * @param {number} radius
     * @returns {Uint8Array | undefined}
     */
    setBytesForVectorCornerRadiusSelection(data, selected_verts, radius) {
        const ret = wasm.scenecontroller_setBytesForVectorCornerRadiusSelection(this.__wbg_ptr, addHeapObject(data), addHeapObject(selected_verts), radius);
        return takeObject(ret);
    }
    /**
     * @param {Uint8Array} data
     * @param {number} corner_smoothing
     * @returns {Uint8Array | undefined}
     */
    setBytesForVectorCornerSmoothing(data, corner_smoothing) {
        const ret = wasm.scenecontroller_setBytesForVectorCornerSmoothing(this.__wbg_ptr, addHeapObject(data), corner_smoothing);
        return takeObject(ret);
    }
    /**
     * @param {Uint8Array} data
     * @param {Uint32Array} selected_verts
     * @param {number} x
     * @param {number} y
     * @returns {Uint8Array | undefined}
     */
    setBytesForVectorVertexPositionSelection(data, selected_verts, x, y) {
        const ret = wasm.scenecontroller_setBytesForVectorVertexPositionSelection(this.__wbg_ptr, addHeapObject(data), addHeapObject(selected_verts), x, y);
        return takeObject(ret);
    }
    /**
     * Drive playback of an imported glTF animation on a Model3D shape.
     * `clipIndex` indexes into the shape's Model3DData.animations array; pass null
     * (or a value paired with `isPlaying = false`) to pause.
     * @param {ID} id
     * @param {number | null | undefined} clip_index
     * @param {boolean} is_playing
     */
    setModel3DAnimation(id, clip_index, is_playing) {
        wasm.scenecontroller_setModel3DAnimation(this.__wbg_ptr, addHeapObject(id), isLikeNone(clip_index) ? Number.MAX_SAFE_INTEGER : (clip_index) >>> 0, is_playing);
    }
    /**
     * Scrub the shape's clip to the given local time in seconds. The renderer
     * picks the new pose up on the next frame.
     * @param {ID} id
     * @param {number} time
     */
    setModel3DAnimationLocalTime(id, time) {
        wasm.scenecontroller_setModel3DAnimationLocalTime(this.__wbg_ptr, addHeapObject(id), time);
    }
    /**
     * @param {Float4} padding
     */
    setPresentationPadding(padding) {
        wasm.scenecontroller_setPresentationPadding(this.__wbg_ptr, addHeapObject(padding));
    }
    /**
     * @param {boolean} show
     */
    setShowPixelGrid(show) {
        wasm.scenecontroller_setShowPixelGrid(this.__wbg_ptr, show);
    }
    /**
     * @param {Uint8Array} state
     */
    setVectorEditingState(state) {
        try {
            wasm.scenecontroller_setVectorEditingState(this.__wbg_ptr, addBorrowedObject(state));
        } finally {
            heap[stack_pointer++] = undefined;
        }
    }
    /**
     * @param {any} tool
     */
    setVectorTool(tool) {
        wasm.scenecontroller_setVectorTool(this.__wbg_ptr, addHeapObject(tool));
    }
    /**
     * Register an export-time frame override for a video asset: the renderer
     * uploads this WebCodecs frame instead of sampling the `<video>` element,
     * and `seekVideos` leaves the element alone. The caller keeps ownership
     * of the frame — it must stay unclosed until the override is replaced or
     * cleared, and `clearVideoExportFrames` must run before anything renders
     * outside the export loop. WebGPU backend only (`isWebgpu`); the WebGL
     * path still samples the element.
     * @param {ID} id
     * @param {VideoFrame} frame
     */
    setVideoExportFrame(id, frame) {
        wasm.scenecontroller_setVideoExportFrame(this.__wbg_ptr, addHeapObject(id), addHeapObject(frame));
    }
    /**
     * Snap a world-space resize handle position against other (non-selected) vertices.
     * `snap_x`/`snap_y` indicate which axes may snap. Returns the snapped world position.
     * @param {Float2} pos
     * @param {boolean} snap_x
     * @param {boolean} snap_y
     * @returns {Float2}
     */
    snapVectorResizeHandle(pos, snap_x, snap_y) {
        const ret = wasm.scenecontroller_snapVectorResizeHandle(this.__wbg_ptr, addHeapObject(pos), snap_x, snap_y);
        return takeObject(ret);
    }
    start() {
        wasm.scenecontroller_start(this.__wbg_ptr);
    }
    /**
     * @param {ID} id
     * @param {number} stroke_width
     * @param {Float4} color
     */
    startPencil(id, stroke_width, color) {
        wasm.scenecontroller_startPencil(this.__wbg_ptr, addHeapObject(id), stroke_width, addHeapObject(color));
    }
    /**
     * @param {ID} id
     * @param {boolean} creation
     */
    startVectorEditing(id, creation) {
        wasm.scenecontroller_startVectorEditing(this.__wbg_ptr, addHeapObject(id), creation);
    }
    stopInEditorFrame() {
        wasm.scenecontroller_stopInEditorFrame(this.__wbg_ptr);
    }
    stopPencil() {
        wasm.scenecontroller_stopPencil(this.__wbg_ptr);
    }
    stopPresenting() {
        wasm.scenecontroller_stopPresenting(this.__wbg_ptr);
    }
    /**
     * Editor-only: stop the transition-curve hover preview. Pair with
     * `resetAllStates` to restore the object to its current state.
     */
    stopPreviewTransition() {
        wasm.scenecontroller_stopPreviewTransition(this.__wbg_ptr);
    }
    stopVectorEditing() {
        wasm.scenecontroller_stopVectorEditing(this.__wbg_ptr);
    }
    /**
     * @param {ID} shape
     * @returns {ParseSvgPathResult | undefined}
     */
    strokeShape(shape) {
        const ret = wasm.scenecontroller_strokeShape(this.__wbg_ptr, addHeapObject(shape));
        return takeObject(ret);
    }
    /**
     * @param {SceneData} scene_data
     */
    switchScene(scene_data) {
        wasm.scenecontroller_switchScene(this.__wbg_ptr, addHeapObject(scene_data));
    }
    /**
     * @param {Float2} min
     * @param {Float2} max
     * @param {Affine2} world_matrix
     * @param {ID} align_id
     * @returns {BoundingBox | undefined}
     */
    transformBoundingBoxByAlignObject(min, max, world_matrix, align_id) {
        const ret = wasm.scenecontroller_transformBoundingBoxByAlignObject(this.__wbg_ptr, addHeapObject(min), addHeapObject(max), addHeapObject(world_matrix), addHeapObject(align_id));
        return takeObject(ret);
    }
    /**
     * Transform selected vertices and control points around a center point
     * center: [x, y] in local coordinates
     * scale: [scale_x, scale_y] scale factors
     * rotation_radians: additional rotation in radians
     * box_rotation_radians: orientation of the resize box (for scaling in rotated space)
     * @param {Float2} center
     * @param {Float2} scale
     * @param {number} rotation_radians
     * @param {number} box_rotation_radians
     * @returns {boolean}
     */
    transformVectorSelection(center, scale, rotation_radians, box_rotation_radians) {
        const ret = wasm.scenecontroller_transformVectorSelection(this.__wbg_ptr, addHeapObject(center), addHeapObject(scale), rotation_radians, box_rotation_radians);
        return ret !== 0;
    }
    /**
     * @param {ID[]} ids
     */
    triggerEventForObjectIds(ids) {
        const ptr0 = passArrayJsValueToWasm0(ids, wasm.__wbindgen_export);
        const len0 = WASM_VECTOR_LEN;
        wasm.scenecontroller_triggerEventForObjectIds(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {DocumentUpdate} message
     */
    updateByOp(message) {
        wasm.scenecontroller_updateByOp(this.__wbg_ptr, addHeapObject(message));
    }
    updateCached() {
        wasm.scenecontroller_updateCached(this.__wbg_ptr);
    }
    /**
     * @param {CameraDiff} diff
     */
    updateCamera(diff) {
        wasm.scenecontroller_updateCamera(this.__wbg_ptr, addHeapObject(diff));
    }
    /**
     * Mirror the document's component-definitions registry into the runtime and
     * re-expand every virtual instance. The editor calls this after a scene
     * (re)build (e.g. after `switchScene`) and whenever `DocumentData.components`
     * or a main component changes. Instance content is realized into the slotmap
     * from this registry, never stored in the synced document, so there is no
     * per-instance propagation op and nothing to drift.
     * @param {any} components
     */
    updateComponents(components) {
        wasm.scenecontroller_updateComponents(this.__wbg_ptr, addHeapObject(components));
    }
    /**
     * @param {PublishDiff} diff
     */
    updatePublish(diff) {
        wasm.scenecontroller_updatePublish(this.__wbg_ptr, addHeapObject(diff));
    }
    /**
     * @param {UpdateScene} op
     */
    updateSceneOp(op) {
        wasm.scenecontroller_updateSceneOp(this.__wbg_ptr, addHeapObject(op));
    }
    /**
     * @param {any} ui_shapes
     */
    updateUiShapes(ui_shapes) {
        wasm.scenecontroller_updateUiShapes(this.__wbg_ptr, addHeapObject(ui_shapes));
    }
    /**
     * @param {boolean} allowed
     */
    vectorAllowMultiSelect(allowed) {
        wasm.scenecontroller_vectorAllowMultiSelect(this.__wbg_ptr, allowed);
    }
    /**
     * @param {Float2} start
     * @param {Float2} end
     */
    vectorBoxSelect(start, end) {
        wasm.scenecontroller_vectorBoxSelect(this.__wbg_ptr, addHeapObject(start), addHeapObject(end));
    }
    /**
     * Clear any active snap lines/dots (call when a box-driven drag-move ends)
     */
    vectorClearSnapping() {
        wasm.scenecontroller_vectorClearSnapping(this.__wbg_ptr);
    }
    /**
     * @param {boolean} connect
     */
    vectorDeleteSelection(connect) {
        wasm.scenecontroller_vectorDeleteSelection(this.__wbg_ptr, connect);
    }
    /**
     * @param {ID} id
     * @param {Float2} size_delta
     * @returns {VecNetShapeData | undefined}
     */
    vectorResize(id, size_delta) {
        const ret = wasm.scenecontroller_vectorResize(this.__wbg_ptr, addHeapObject(id), addHeapObject(size_delta));
        return takeObject(ret);
    }
    /**
     * @param {Uint8Array} data
     * @param {Float2} size_delta
     * @param {number} applied_scale
     * @returns {VecNetShapeData | undefined}
     */
    vectorResizeWithCornerRadii(data, size_delta, applied_scale) {
        const ret = wasm.scenecontroller_vectorResizeWithCornerRadii(this.__wbg_ptr, addHeapObject(data), addHeapObject(size_delta), applied_scale);
        return takeObject(ret);
    }
    /**
     * @param {boolean} value
     */
    vectorSetIsAltPressed(value) {
        wasm.scenecontroller_vectorSetIsAltPressed(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    vectorSetIsSnapping(value) {
        wasm.scenecontroller_vectorSetIsSnapping(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    vectorSetIsSnappingControlAngles(value) {
        wasm.scenecontroller_vectorSetIsSnappingControlAngles(this.__wbg_ptr, value);
    }
    vectorStopContinueSubpath() {
        wasm.scenecontroller_vectorStopContinueSubpath(this.__wbg_ptr);
    }
    /**
     * The video fills the export loop should decode with WebCodecs, as
     * `{ id, src }` objects (`src` is the loaded `<video>` element's source:
     * the asset's own URL for streamed loads, a `blob:` URL for byte-loaded
     * ones — either way the same URL the element itself fetched). Enumerated from the start events' video actions — the exact set
     * `seekVideos` drives — so the WebCodecs path animates precisely the
     * fills the element path would: a fill without a play action stays a
     * static frame on both paths and both backends. Scoped to actions
     * targeting `frame_id`'s subtree on purpose: enumerating the whole
     * document put a live decoder behind every video in the file (74 in one
     * real doc), turning a 5s export into 74 decode streams. Videos still
     * loading are omitted, and videos outside the subtree stay on the
     * seek-driven element path — both remain correct, just less
     * stable/deterministic.
     * @param {ID} frame_id
     * @returns {Array<any>}
     */
    videoFillSources(frame_id) {
        const ret = wasm.scenecontroller_videoFillSources(this.__wbg_ptr, addHeapObject(frame_id));
        return takeObject(ret);
    }
    /**
     * @param {Float2} pos
     * @returns {Float2}
     */
    worldToScreen(pos) {
        const ret = wasm.scenecontroller_worldToScreen(this.__wbg_ptr, addHeapObject(pos));
        return takeObject(ret);
    }
    /**
     * @param {boolean} arg0
     */
    set is_play_mode(arg0) {
        wasm.__wbg_set_scenecontroller_is_play_mode(this.__wbg_ptr, arg0);
    }
    /**
     * @param {boolean} arg0
     */
    set needs_video_update(arg0) {
        wasm.__wbg_set_scenecontroller_needs_video_update(this.__wbg_ptr, arg0);
    }
    /**
     * @param {boolean} arg0
     */
    set show_pixel_grid(arg0) {
        wasm.__wbg_set_scenecontroller_show_pixel_grid(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) SceneController.prototype[Symbol.dispose] = SceneController.prototype.free;

/**
 * Add an instance-only child under a realized node inside a virtual instance,
 * returning the updated thin link. Adding a node *inside* an instance is recorded
 * as an `extraChildren` override (the parent isn't a real synced object), so it
 * survives main edits and re-expansion. Returns `null` if the instance/component
 * is unknown or `parentRealizedId` is not part of the instance.
 * @param {any} components
 * @param {any} instance_id
 * @param {any} link
 * @param {any} parent_realized_id
 * @param {any} child
 * @returns {any}
 */
export function addRealizedChild(components, instance_id, link, parent_realized_id, child) {
    const ret = wasm.addRealizedChild(addHeapObject(components), addHeapObject(instance_id), addHeapObject(link), addHeapObject(parent_realized_id), addHeapObject(child));
    return takeObject(ret);
}

/**
 * Compute the ops that bring an instance's `current` materialized subtree back in
 * sync with its main component (e.g. after the main was edited). Returns a
 * `DocumentUpdate[]`: one `UpdateObject` per changed node, plus add/delete for
 * structural changes. Applying them keeps node identity (realized ids are
 * stable), so undo/redo and collab behave like any other edit.
 * @param {any} components
 * @param {any} scene
 * @param {any} instance_id
 * @param {any} link
 * @param {any} current
 * @returns {any}
 */
export function componentInstanceRefreshOps(components, scene, instance_id, link, current) {
    const ret = wasm.componentInstanceRefreshOps(addHeapObject(components), addHeapObject(scene), addHeapObject(instance_id), addHeapObject(link), addHeapObject(current));
    return takeObject(ret);
}

/**
 * Capture the overrides implied by a *materialized* instance subtree (the legacy
 * on-disk form: the root carries `link` and every realized descendant is stored
 * as a real child) into the thin `ComponentInstanceData`. The editor writes the
 * returned link back onto the instance root and drops the stored descendants,
 * completing the materialized -> virtual migration for that instance. Returns
 * `null` if the component referenced by `link` is unknown.
 * @param {any} components
 * @param {any} instance_id
 * @param {any} link
 * @param {any} materialized
 * @returns {any}
 */
export function dematerializeInstance(components, instance_id, link, materialized) {
    const ret = wasm.dematerializeInstance(addHeapObject(components), addHeapObject(instance_id), addHeapObject(link), addHeapObject(materialized));
    return takeObject(ret);
}

/**
 * Realize a duplicate of an existing instance: a new instance (root id
 * `newInstanceId`) that copies `sourceLink`'s overrides, re-keyed for the new
 * root. Returns the materialized `TreeItem<ObjectData>`, or `null` if the source
 * component is unknown.
 * @param {any} components
 * @param {any} source_instance_id
 * @param {any} source_link
 * @param {any} new_instance_id
 * @returns {any}
 */
export function duplicateComponentInstance(components, source_instance_id, source_link, new_instance_id) {
    const ret = wasm.duplicateComponentInstance(addHeapObject(components), addHeapObject(source_instance_id), addHeapObject(source_link), addHeapObject(new_instance_id));
    return takeObject(ret);
}

/**
 * Fold an edit on a *realized* node (a node inside a virtual instance, as
 * returned by hit-testing / shown in the layer tree) into the instance's
 * overrides, returning the updated thin link to write back onto the instance
 * root. `newData` is the node's full data after the edit (the editor runs its
 * command on the realized node, then passes the result here); the delta against
 * the node's current realized data becomes the override. This is how an
 * in-instance edit is persisted without materializing. The root's canvas
 * placement is instance-local and must be applied to the root object directly,
 * not routed here. Returns `null` if the instance/component is unknown or
 * `realizedId` is not part of the instance.
 * @param {any} components
 * @param {any} instance_id
 * @param {any} link
 * @param {any} realized_id
 * @param {any} new_data
 * @returns {any}
 */
export function overrideForRealizedEdit(components, instance_id, link, realized_id, new_data) {
    const ret = wasm.overrideForRealizedEdit(addHeapObject(components), addHeapObject(instance_id), addHeapObject(link), addHeapObject(realized_id), addHeapObject(new_data));
    return takeObject(ret);
}

/**
 * Realize an instance into its materialized subtree, with the component link
 * stamped onto the root. Returns the `TreeItem<ObjectData>`, or `null` if the
 * component referenced by `link` is unknown.
 *
 * Pass a freshly generated `instanceId` to place a new instance (e.g. when
 * duplicating a component); the realized descendants get deterministic ids
 * derived from it.
 * @param {any} components
 * @param {any} instance_id
 * @param {any} link
 * @returns {any}
 */
export function realizeComponentInstance(components, instance_id, link) {
    const ret = wasm.realizeComponentInstance(addHeapObject(components), addHeapObject(instance_id), addHeapObject(link));
    return takeObject(ret);
}

/**
 * Mark a realized node inside a virtual instance as structurally removed and
 * return the updated thin link. Deleting a node inside an instance is expressed
 * as a `removed` override (the node is not a real synced object), mirroring
 * Spline's "delete-in-instance becomes an override".
 * @param {any} components
 * @param {any} instance_id
 * @param {any} link
 * @param {any} realized_id
 * @returns {any}
 */
export function removeRealizedNode(components, instance_id, link, realized_id) {
    const ret = wasm.removeRealizedNode(addHeapObject(components), addHeapObject(instance_id), addHeapObject(link), addHeapObject(realized_id));
    return takeObject(ret);
}

export function web_init() {
    wasm.web_init();
}
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg_Error_ef53bc310eb298a0: function(arg0, arg1) {
            const ret = Error(getStringFromWasm0(arg0, arg1));
            return addHeapObject(ret);
        },
        __wbg_Number_6b506e6536831eaa: function(arg0) {
            const ret = Number(getObject(arg0));
            return ret;
        },
        __wbg_Window_afcc911b2f9c92e2: function(arg0) {
            const ret = getObject(arg0).Window;
            return addHeapObject(ret);
        },
        __wbg_WorkerGlobalScope_5d19ebc889ff397e: function(arg0) {
            const ret = getObject(arg0).WorkerGlobalScope;
            return addHeapObject(ret);
        },
        __wbg___wbindgen_bigint_get_as_i64_38130e98eecd467d: function(arg0, arg1) {
            const v = getObject(arg1);
            const ret = typeof(v) === 'bigint' ? v : undefined;
            getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_boolean_get_1a45e2c38d4d41b9: function(arg0) {
            const v = getObject(arg0);
            const ret = typeof(v) === 'boolean' ? v : undefined;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg___wbindgen_debug_string_0accd80f45e5faa2: function(arg0, arg1) {
            const ret = debugString(getObject(arg1));
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_in_70a403a56e771704: function(arg0, arg1) {
            const ret = getObject(arg0) in getObject(arg1);
            return ret;
        },
        __wbg___wbindgen_is_bigint_6ffd6468a9bc44b9: function(arg0) {
            const ret = typeof(getObject(arg0)) === 'bigint';
            return ret;
        },
        __wbg___wbindgen_is_function_754e9f305ff6029e: function(arg0) {
            const ret = typeof(getObject(arg0)) === 'function';
            return ret;
        },
        __wbg___wbindgen_is_null_87c3bfe968c6a5ad: function(arg0) {
            const ret = getObject(arg0) === null;
            return ret;
        },
        __wbg___wbindgen_is_null_or_undefined_cf617b836541fad3: function(arg0) {
            const ret = getObject(arg0) == null;
            return ret;
        },
        __wbg___wbindgen_is_object_56732c2bc353f41d: function(arg0) {
            const val = getObject(arg0);
            const ret = typeof(val) === 'object' && val !== null;
            return ret;
        },
        __wbg___wbindgen_is_string_c236cabd84a4d769: function(arg0) {
            const ret = typeof(getObject(arg0)) === 'string';
            return ret;
        },
        __wbg___wbindgen_is_undefined_67b456be8673d3d7: function(arg0) {
            const ret = getObject(arg0) === undefined;
            return ret;
        },
        __wbg___wbindgen_jsval_eq_1068e624fa87f6ab: function(arg0, arg1) {
            const ret = getObject(arg0) === getObject(arg1);
            return ret;
        },
        __wbg___wbindgen_jsval_loose_eq_2c56564c75129511: function(arg0, arg1) {
            const ret = getObject(arg0) == getObject(arg1);
            return ret;
        },
        __wbg___wbindgen_number_get_9bb1761122181af2: function(arg0, arg1) {
            const obj = getObject(arg1);
            const ret = typeof(obj) === 'number' ? obj : undefined;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_string_get_72bdf95d3ae505b1: function(arg0, arg1) {
            const obj = getObject(arg1);
            const ret = typeof(obj) === 'string' ? obj : undefined;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_throw_1506f2235d1bdba0: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg__wbg_cb_unref_61db23ac97f16c31: function(arg0) {
            getObject(arg0)._wbg_cb_unref();
        },
        __wbg_activeTexture_7a0d6fe7120979ce: function(arg0, arg1) {
            getObject(arg0).activeTexture(arg1 >>> 0);
        },
        __wbg_activeTexture_dd15c31d50b73529: function(arg0, arg1) {
            getObject(arg0).activeTexture(arg1 >>> 0);
        },
        __wbg_addEventListener_5593b0efd622abd6: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).addEventListener(getStringFromWasm0(arg1, arg2), getObject(arg3), getObject(arg4));
        }, arguments); },
        __wbg_arrayBuffer_05927079aabe6d46: function() { return handleError(function (arg0) {
            const ret = getObject(arg0).arrayBuffer();
            return addHeapObject(ret);
        }, arguments); },
        __wbg_assign_551ec2d000f70c24: function() { return handleError(function (arg0, arg1, arg2) {
            getObject(arg0).assign(getStringFromWasm0(arg1, arg2));
        }, arguments); },
        __wbg_attachShader_5c6a46e7c0fc637a: function(arg0, arg1, arg2) {
            getObject(arg0).attachShader(getObject(arg1), getObject(arg2));
        },
        __wbg_attachShader_c2b12b36afa45936: function(arg0, arg1, arg2) {
            getObject(arg0).attachShader(getObject(arg1), getObject(arg2));
        },
        __wbg_beginComputePass_431a159006c13c7c: function(arg0, arg1) {
            const ret = getObject(arg0).beginComputePass(getObject(arg1));
            return addHeapObject(ret);
        },
        __wbg_beginRenderPass_aa22c432e793359a: function() { return handleError(function (arg0, arg1) {
            const ret = getObject(arg0).beginRenderPass(getObject(arg1));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_bindBuffer_3841df88ccee4ed0: function(arg0, arg1, arg2) {
            getObject(arg0).bindBuffer(arg1 >>> 0, getObject(arg2));
        },
        __wbg_bindBuffer_aa5dc7dc1c8ad1c8: function(arg0, arg1, arg2) {
            getObject(arg0).bindBuffer(arg1 >>> 0, getObject(arg2));
        },
        __wbg_bindFramebuffer_10bbdf7040d89a17: function(arg0, arg1, arg2) {
            getObject(arg0).bindFramebuffer(arg1 >>> 0, getObject(arg2));
        },
        __wbg_bindFramebuffer_ee8e42543c29c602: function(arg0, arg1, arg2) {
            getObject(arg0).bindFramebuffer(arg1 >>> 0, getObject(arg2));
        },
        __wbg_bindRenderbuffer_7808d8eabbe18554: function(arg0, arg1, arg2) {
            getObject(arg0).bindRenderbuffer(arg1 >>> 0, getObject(arg2));
        },
        __wbg_bindRenderbuffer_c0360bfb79c193c2: function(arg0, arg1, arg2) {
            getObject(arg0).bindRenderbuffer(arg1 >>> 0, getObject(arg2));
        },
        __wbg_bindTexture_28d1d695d4801955: function(arg0, arg1, arg2) {
            getObject(arg0).bindTexture(arg1 >>> 0, getObject(arg2));
        },
        __wbg_bindTexture_a1a012a31e1419d5: function(arg0, arg1, arg2) {
            getObject(arg0).bindTexture(arg1 >>> 0, getObject(arg2));
        },
        __wbg_bindVertexArrayOES_15e48910a5d208b1: function(arg0, arg1) {
            getObject(arg0).bindVertexArrayOES(getObject(arg1));
        },
        __wbg_bindVertexArray_4f2f0a7892280041: function(arg0, arg1) {
            getObject(arg0).bindVertexArray(getObject(arg1));
        },
        __wbg_blendEquation_1ced323efc9ce0f8: function(arg0, arg1) {
            getObject(arg0).blendEquation(arg1 >>> 0);
        },
        __wbg_blendEquation_a12f5acd9d14fb9b: function(arg0, arg1) {
            getObject(arg0).blendEquation(arg1 >>> 0);
        },
        __wbg_blendFunc_d5202c7fe94c67ee: function(arg0, arg1, arg2) {
            getObject(arg0).blendFunc(arg1 >>> 0, arg2 >>> 0);
        },
        __wbg_blendFunc_fbff85cd0fce280e: function(arg0, arg1, arg2) {
            getObject(arg0).blendFunc(arg1 >>> 0, arg2 >>> 0);
        },
        __wbg_blitFramebuffer_acb954bfb30ed714: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
            getObject(arg0).blitFramebuffer(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0);
        },
        __wbg_bufferData_043a7e5da22f40d9: function(arg0, arg1, arg2, arg3) {
            getObject(arg0).bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
        },
        __wbg_bufferData_7b6881381d415425: function(arg0, arg1, arg2, arg3) {
            getObject(arg0).bufferData(arg1 >>> 0, getObject(arg2), arg3 >>> 0);
        },
        __wbg_bufferData_9fddca30299e6114: function(arg0, arg1, arg2, arg3) {
            getObject(arg0).bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
        },
        __wbg_bufferData_f0837cec09725cc0: function(arg0, arg1, arg2, arg3) {
            getObject(arg0).bufferData(arg1 >>> 0, getObject(arg2), arg3 >>> 0);
        },
        __wbg_bufferSubData_885e4f8d5833cf11: function(arg0, arg1, arg2, arg3) {
            getObject(arg0).bufferSubData(arg1 >>> 0, arg2, getObject(arg3));
        },
        __wbg_bufferSubData_8fc824b6a9503f12: function(arg0, arg1, arg2, arg3) {
            getObject(arg0).bufferSubData(arg1 >>> 0, arg2, getObject(arg3));
        },
        __wbg_call_8a89609d89f6608a: function() { return handleError(function (arg0, arg1) {
            const ret = getObject(arg0).call(getObject(arg1));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_call_9c758de292015997: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_clearBufferfv_2e2858bd8bcf1715: function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).clearBufferfv(arg1 >>> 0, arg2, getArrayF32FromWasm0(arg3, arg4));
        },
        __wbg_clearBufferiv_e356514eb1d165fe: function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).clearBufferiv(arg1 >>> 0, arg2, getArrayI32FromWasm0(arg3, arg4));
        },
        __wbg_compileShader_8810a4868b23621b: function(arg0, arg1) {
            getObject(arg0).compileShader(getObject(arg1));
        },
        __wbg_compileShader_ec8d5eb7f2b70a48: function(arg0, arg1) {
            getObject(arg0).compileShader(getObject(arg1));
        },
        __wbg_configure_0e4789c0f6b35c8e: function() { return handleError(function (arg0, arg1) {
            getObject(arg0).configure(getObject(arg1));
        }, arguments); },
        __wbg_copyBufferSubData_9936fdf5e53e1832: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            getObject(arg0).copyBufferSubData(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
        },
        __wbg_copyBufferToBuffer_5e2cd8f10ae78183: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).copyBufferToBuffer(getObject(arg1), arg2, getObject(arg3), arg4);
        }, arguments); },
        __wbg_copyBufferToBuffer_ca30deb8de65f5d5: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            getObject(arg0).copyBufferToBuffer(getObject(arg1), arg2, getObject(arg3), arg4, arg5);
        }, arguments); },
        __wbg_copyExternalImageToTexture_4df105bb39517948: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            getObject(arg0).copyExternalImageToTexture(getObject(arg1), getObject(arg2), getObject(arg3));
        }, arguments); },
        __wbg_copyTextureToBuffer_ed6e67a77ecb768d: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            getObject(arg0).copyTextureToBuffer(getObject(arg1), getObject(arg2), getObject(arg3));
        }, arguments); },
        __wbg_createBindGroupLayout_49a7e2b3d076afcf: function() { return handleError(function (arg0, arg1) {
            const ret = getObject(arg0).createBindGroupLayout(getObject(arg1));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_createBindGroup_655c6e6c0258530e: function(arg0, arg1) {
            const ret = getObject(arg0).createBindGroup(getObject(arg1));
            return addHeapObject(ret);
        },
        __wbg_createBuffer_0726dd2ab09ea1d2: function() { return handleError(function (arg0, arg1) {
            const ret = getObject(arg0).createBuffer(getObject(arg1));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_createBuffer_333d6aae40284594: function(arg0) {
            const ret = getObject(arg0).createBuffer();
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_createBuffer_3ae54605e5676c83: function(arg0) {
            const ret = getObject(arg0).createBuffer();
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_createCommandEncoder_ec1f40f0cb4d09df: function(arg0, arg1) {
            const ret = getObject(arg0).createCommandEncoder(getObject(arg1));
            return addHeapObject(ret);
        },
        __wbg_createComputePipelineAsync_afe7021ac5a02993: function(arg0, arg1) {
            const ret = getObject(arg0).createComputePipelineAsync(getObject(arg1));
            return addHeapObject(ret);
        },
        __wbg_createFramebuffer_6f42ff976bb98152: function(arg0) {
            const ret = getObject(arg0).createFramebuffer();
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_createFramebuffer_ef1247e8b2e9b09f: function(arg0) {
            const ret = getObject(arg0).createFramebuffer();
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_createPipelineLayout_2c8cd4528b06c108: function(arg0, arg1) {
            const ret = getObject(arg0).createPipelineLayout(getObject(arg1));
            return addHeapObject(ret);
        },
        __wbg_createProgram_b48c3323af547213: function(arg0) {
            const ret = getObject(arg0).createProgram();
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_createProgram_f6a8df4491031d57: function(arg0) {
            const ret = getObject(arg0).createProgram();
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_createQuerySet_cb7b21d1d405b890: function() { return handleError(function (arg0, arg1) {
            const ret = getObject(arg0).createQuerySet(getObject(arg1));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_createRenderPipelineAsync_eecad1e54ef27acf: function(arg0, arg1) {
            const ret = getObject(arg0).createRenderPipelineAsync(getObject(arg1));
            return addHeapObject(ret);
        },
        __wbg_createRenderPipeline_cf98d4d699bfb03c: function() { return handleError(function (arg0, arg1) {
            const ret = getObject(arg0).createRenderPipeline(getObject(arg1));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_createRenderbuffer_a2f947c7fa8c8bf0: function(arg0) {
            const ret = getObject(arg0).createRenderbuffer();
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_createRenderbuffer_c09d5809ac95924e: function(arg0) {
            const ret = getObject(arg0).createRenderbuffer();
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_createSampler_c8ffb3c8d565f704: function(arg0, arg1) {
            const ret = getObject(arg0).createSampler(getObject(arg1));
            return addHeapObject(ret);
        },
        __wbg_createShaderModule_2e44fc7677c6288b: function(arg0, arg1) {
            const ret = getObject(arg0).createShaderModule(getObject(arg1));
            return addHeapObject(ret);
        },
        __wbg_createShader_0e3f814b69e9e184: function(arg0, arg1) {
            const ret = getObject(arg0).createShader(arg1 >>> 0);
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_createShader_383b3295276271d2: function(arg0, arg1) {
            const ret = getObject(arg0).createShader(arg1 >>> 0);
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_createTexture_1bac74c999b8a48e: function() { return handleError(function (arg0, arg1) {
            const ret = getObject(arg0).createTexture(getObject(arg1));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_createTexture_461a3048c40e7175: function(arg0) {
            const ret = getObject(arg0).createTexture();
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_createTexture_d6e2c1f04a554a15: function(arg0) {
            const ret = getObject(arg0).createTexture();
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_createVertexArrayOES_2f67d3679ba9a29c: function(arg0) {
            const ret = getObject(arg0).createVertexArrayOES();
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_createVertexArray_febd1d11636d15ad: function(arg0) {
            const ret = getObject(arg0).createVertexArray();
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_createView_ceaf2f5881adbd34: function() { return handleError(function (arg0, arg1) {
            const ret = getObject(arg0).createView(getObject(arg1));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_cullFace_a4ee8b8c3c126388: function(arg0, arg1) {
            getObject(arg0).cullFace(arg1 >>> 0);
        },
        __wbg_cullFace_c6b39a55ccade015: function(arg0, arg1) {
            getObject(arg0).cullFace(arg1 >>> 0);
        },
        __wbg_currentTime_0b40b60bc76843cb: function(arg0) {
            const ret = getObject(arg0).currentTime;
            return ret;
        },
        __wbg_debug_78b457f1effb3792: function(arg0) {
            console.debug(getObject(arg0));
        },
        __wbg_deleteBuffer_520156dc8a1f81af: function(arg0, arg1) {
            getObject(arg0).deleteBuffer(getObject(arg1));
        },
        __wbg_deleteBuffer_a925fdd1b590fbbc: function(arg0, arg1) {
            getObject(arg0).deleteBuffer(getObject(arg1));
        },
        __wbg_deleteFramebuffer_aa4bf9f184123318: function(arg0, arg1) {
            getObject(arg0).deleteFramebuffer(getObject(arg1));
        },
        __wbg_deleteFramebuffer_cc043e5a8cb9a556: function(arg0, arg1) {
            getObject(arg0).deleteFramebuffer(getObject(arg1));
        },
        __wbg_deleteProgram_0c859ebcab2b7b5a: function(arg0, arg1) {
            getObject(arg0).deleteProgram(getObject(arg1));
        },
        __wbg_deleteProgram_df6a6609c7d91a6e: function(arg0, arg1) {
            getObject(arg0).deleteProgram(getObject(arg1));
        },
        __wbg_deleteRenderbuffer_37c079dbc257fcf9: function(arg0, arg1) {
            getObject(arg0).deleteRenderbuffer(getObject(arg1));
        },
        __wbg_deleteRenderbuffer_4b7a888363766554: function(arg0, arg1) {
            getObject(arg0).deleteRenderbuffer(getObject(arg1));
        },
        __wbg_deleteShader_170dea06bd074d01: function(arg0, arg1) {
            getObject(arg0).deleteShader(getObject(arg1));
        },
        __wbg_deleteShader_944accd60733a9cb: function(arg0, arg1) {
            getObject(arg0).deleteShader(getObject(arg1));
        },
        __wbg_deleteTexture_54dee8e15570751e: function(arg0, arg1) {
            getObject(arg0).deleteTexture(getObject(arg1));
        },
        __wbg_deleteTexture_be3eaabebb89a85e: function(arg0, arg1) {
            getObject(arg0).deleteTexture(getObject(arg1));
        },
        __wbg_deleteVertexArrayOES_4262d2d0e9fb77c5: function(arg0, arg1) {
            getObject(arg0).deleteVertexArrayOES(getObject(arg1));
        },
        __wbg_deleteVertexArray_8f0fb3b3d54c7483: function(arg0, arg1) {
            getObject(arg0).deleteVertexArray(getObject(arg1));
        },
        __wbg_depthMask_95332b64c5ef8b45: function(arg0, arg1) {
            getObject(arg0).depthMask(arg1 !== 0);
        },
        __wbg_depthMask_f55bea4b6c3b9531: function(arg0, arg1) {
            getObject(arg0).depthMask(arg1 !== 0);
        },
        __wbg_description_02485704e69b1e7f: function(arg0, arg1) {
            const ret = getObject(arg1).description;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_disable_2cf98ccb81612ef9: function(arg0, arg1) {
            getObject(arg0).disable(arg1 >>> 0);
        },
        __wbg_disable_6b825656c54f5646: function(arg0, arg1) {
            getObject(arg0).disable(arg1 >>> 0);
        },
        __wbg_dispatchWorkgroups_afb2344298c62227: function(arg0, arg1, arg2, arg3) {
            getObject(arg0).dispatchWorkgroups(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0);
        },
        __wbg_displayHeight_465673c1823a1db3: function(arg0) {
            const ret = getObject(arg0).displayHeight;
            return ret;
        },
        __wbg_displayWidth_73729fd8eb965076: function(arg0) {
            const ret = getObject(arg0).displayWidth;
            return ret;
        },
        __wbg_disposeVideo_c94c1ccd57a63f68: function(arg0) {
            disposeVideo(getObject(arg0));
        },
        __wbg_document_aceb08cd6489baf5: function(arg0) {
            const ret = getObject(arg0).document;
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_done_60cf307fcc680536: function(arg0) {
            const ret = getObject(arg0).done;
            return ret;
        },
        __wbg_drawArrays_6eb87620c1dcbfb4: function(arg0, arg1, arg2, arg3) {
            getObject(arg0).drawArrays(arg1 >>> 0, arg2, arg3);
        },
        __wbg_drawArrays_f332b526550a641e: function(arg0, arg1, arg2, arg3) {
            getObject(arg0).drawArrays(arg1 >>> 0, arg2, arg3);
        },
        __wbg_drawBuffersWEBGL_10cdfe87c17cd93f: function(arg0, arg1) {
            getObject(arg0).drawBuffersWEBGL(getObject(arg1));
        },
        __wbg_drawBuffers_c5a9ee312b2d6fa8: function(arg0, arg1) {
            getObject(arg0).drawBuffers(getObject(arg1));
        },
        __wbg_drawElements_23ec4847dad548e0: function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).drawElements(arg1 >>> 0, arg2, arg3 >>> 0, arg4);
        },
        __wbg_drawElements_fe4671e9c358058d: function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).drawElements(arg1 >>> 0, arg2, arg3 >>> 0, arg4);
        },
        __wbg_drawIndexed_d31913e79d58fbac: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            getObject(arg0).drawIndexed(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5 >>> 0);
        },
        __wbg_draw_6877f98847e1e36c: function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).draw(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
        },
        __wbg_duration_d6a6a568a0baf72d: function(arg0) {
            const ret = getObject(arg0).duration;
            return ret;
        },
        __wbg_enableVertexAttribArray_cc09a0312b6adee5: function(arg0, arg1) {
            getObject(arg0).enableVertexAttribArray(arg1 >>> 0);
        },
        __wbg_enableVertexAttribArray_f88d3d499ab40ea6: function(arg0, arg1) {
            getObject(arg0).enableVertexAttribArray(arg1 >>> 0);
        },
        __wbg_enable_1928c361308989d5: function(arg0, arg1) {
            getObject(arg0).enable(arg1 >>> 0);
        },
        __wbg_enable_2cc4ff32a0fd985f: function(arg0, arg1) {
            getObject(arg0).enable(arg1 >>> 0);
        },
        __wbg_end_c36889de8ddef882: function(arg0) {
            getObject(arg0).end();
        },
        __wbg_end_f99ebed53d4e198a: function(arg0) {
            getObject(arg0).end();
        },
        __wbg_engine_new: function(arg0) {
            const ret = Engine.__wrap(arg0);
            return addHeapObject(ret);
        },
        __wbg_entries_04b37a02507f1713: function(arg0) {
            const ret = Object.entries(getObject(arg0));
            return addHeapObject(ret);
        },
        __wbg_error_78ff5b3a29b770e0: function(arg0) {
            console.error(getObject(arg0));
        },
        __wbg_error_a6fa202b58aa1cd3: function(arg0, arg1) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                console.error(getStringFromWasm0(arg0, arg1));
            } finally {
                wasm.__wbindgen_export4(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_features_2b07a28fe18ad0ce: function(arg0) {
            const ret = getObject(arg0).features;
            return addHeapObject(ret);
        },
        __wbg_features_d4d2020319592cbe: function(arg0) {
            const ret = getObject(arg0).features;
            return addHeapObject(ret);
        },
        __wbg_fetch_ce1af4d1b59a60be: function(arg0, arg1) {
            const ret = getObject(arg0).fetch(getObject(arg1));
            return addHeapObject(ret);
        },
        __wbg_finish_4d91de5e927dd13f: function(arg0, arg1) {
            const ret = getObject(arg0).finish(getObject(arg1));
            return addHeapObject(ret);
        },
        __wbg_finish_6e06b68ab68cd9f6: function(arg0) {
            const ret = getObject(arg0).finish();
            return addHeapObject(ret);
        },
        __wbg_flush_2088ebca1fd13068: function(arg0) {
            getObject(arg0).flush();
        },
        __wbg_flush_3be48fce9f195fa5: function(arg0) {
            getObject(arg0).flush();
        },
        __wbg_framebufferRenderbuffer_0c9d0e5587497683: function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).framebufferRenderbuffer(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, getObject(arg4));
        },
        __wbg_framebufferRenderbuffer_599e58ad30dcfeb3: function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).framebufferRenderbuffer(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, getObject(arg4));
        },
        __wbg_framebufferTexture2D_44caed1725e57636: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            getObject(arg0).framebufferTexture2D(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, getObject(arg4), arg5);
        },
        __wbg_framebufferTexture2D_fbba21b750c2316a: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            getObject(arg0).framebufferTexture2D(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, getObject(arg4), arg5);
        },
        __wbg_from_d300fe49deab18f5: function(arg0) {
            const ret = Array.from(getObject(arg0));
            return addHeapObject(ret);
        },
        __wbg_generateMipmap_1403959fc241438f: function(arg0, arg1) {
            getObject(arg0).generateMipmap(arg1 >>> 0);
        },
        __wbg_generateMipmap_b261c040d5707fe5: function(arg0, arg1) {
            getObject(arg0).generateMipmap(arg1 >>> 0);
        },
        __wbg_getActiveUniform_3a275fd8fdf7a327: function(arg0, arg1, arg2) {
            const ret = getObject(arg0).getActiveUniform(getObject(arg1), arg2 >>> 0);
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_getActiveUniform_86f7a30e1a52aca4: function(arg0, arg1, arg2) {
            const ret = getObject(arg0).getActiveUniform(getObject(arg1), arg2 >>> 0);
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_getContext_469d34698d869fc1: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = getObject(arg0).getContext(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        }, arguments); },
        __wbg_getContext_5b39fff76491fded: function() { return handleError(function (arg0, arg1, arg2, arg3) {
            const ret = getObject(arg0).getContext(getStringFromWasm0(arg1, arg2), getObject(arg3));
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        }, arguments); },
        __wbg_getContext_7d3a8f461c828713: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = getObject(arg0).getContext(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        }, arguments); },
        __wbg_getCurrentTexture_20714d1bd9051cab: function() { return handleError(function (arg0) {
            const ret = getObject(arg0).getCurrentTexture();
            return addHeapObject(ret);
        }, arguments); },
        __wbg_getExtension_454cdc5ffd07bf03: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = getObject(arg0).getExtension(getStringFromWasm0(arg1, arg2));
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        }, arguments); },
        __wbg_getMappedRange_d0bf3141224111b6: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = getObject(arg0).getMappedRange(arg1, arg2);
            return addHeapObject(ret);
        }, arguments); },
        __wbg_getParameter_015942a7ad566b20: function() { return handleError(function (arg0, arg1) {
            const ret = getObject(arg0).getParameter(arg1 >>> 0);
            return addHeapObject(ret);
        }, arguments); },
        __wbg_getParameter_1e77e23f5ccf0300: function() { return handleError(function (arg0, arg1) {
            const ret = getObject(arg0).getParameter(arg1 >>> 0);
            return addHeapObject(ret);
        }, arguments); },
        __wbg_getPreferredCanvasFormat_8b57039d1801a506: function(arg0) {
            const ret = getObject(arg0).getPreferredCanvasFormat();
            return (__wbindgen_enum_GpuTextureFormat.indexOf(ret) + 1 || 102) - 1;
        },
        __wbg_getProgramInfoLog_2f9cfcecc4f772e1: function(arg0, arg1, arg2) {
            const ret = getObject(arg1).getProgramInfoLog(getObject(arg2));
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_getProgramInfoLog_f0d48f606547aed7: function(arg0, arg1, arg2) {
            const ret = getObject(arg1).getProgramInfoLog(getObject(arg2));
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_getProgramParameter_08beabb2736d5769: function(arg0, arg1, arg2) {
            const ret = getObject(arg0).getProgramParameter(getObject(arg1), arg2 >>> 0);
            return addHeapObject(ret);
        },
        __wbg_getProgramParameter_aee848e1db52b7cd: function(arg0, arg1, arg2) {
            const ret = getObject(arg0).getProgramParameter(getObject(arg1), arg2 >>> 0);
            return addHeapObject(ret);
        },
        __wbg_getRandomValues_3f44b700395062e5: function() { return handleError(function (arg0, arg1) {
            globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));
        }, arguments); },
        __wbg_getRandomValues_bf16787eede473f5: function() { return handleError(function (arg0, arg1) {
            globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));
        }, arguments); },
        __wbg_getShaderInfoLog_510365af17f29a35: function(arg0, arg1, arg2) {
            const ret = getObject(arg1).getShaderInfoLog(getObject(arg2));
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_getShaderInfoLog_cd77c7b7bdb9ce65: function(arg0, arg1, arg2) {
            const ret = getObject(arg1).getShaderInfoLog(getObject(arg2));
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_getSupportedExtensions_7a31b3412a25d9ba: function(arg0) {
            const ret = getObject(arg0).getSupportedExtensions();
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_getUniformLocation_010256f946f9a865: function(arg0, arg1, arg2, arg3) {
            const ret = getObject(arg0).getUniformLocation(getObject(arg1), getStringFromWasm0(arg2, arg3));
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_getUniformLocation_f9774d4f157f5914: function(arg0, arg1, arg2, arg3) {
            const ret = getObject(arg0).getUniformLocation(getObject(arg1), getStringFromWasm0(arg2, arg3));
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_get_1f8f054ddbaa7db2: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(getObject(arg0), getObject(arg1));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_get_2b48c7d0d006a781: function(arg0, arg1) {
            const ret = getObject(arg0)[arg1 >>> 0];
            return addHeapObject(ret);
        },
        __wbg_get_cb935c1402921898: function(arg0, arg1) {
            const ret = getObject(arg0)[arg1 >>> 0];
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_get_de6a0f7d4d18a304: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(getObject(arg0), getObject(arg1));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_get_index_ab123d64c89e3156: function(arg0, arg1) {
            const ret = getObject(arg0)[arg1 >>> 0];
            return ret;
        },
        __wbg_get_unchecked_33f6e5c9e2f2d6b2: function(arg0, arg1) {
            const ret = getObject(arg0)[arg1 >>> 0];
            return addHeapObject(ret);
        },
        __wbg_get_with_ref_key_6412cf3094599694: function(arg0, arg1) {
            const ret = getObject(arg0)[getObject(arg1)];
            return addHeapObject(ret);
        },
        __wbg_get_with_ref_key_7e638bba08a44478: function(arg0, arg1) {
            const ret = getObject(arg0)[getObject(arg1)];
            return addHeapObject(ret);
        },
        __wbg_gpu_2ccc250735d24a2a: function(arg0) {
            const ret = getObject(arg0).gpu;
            return addHeapObject(ret);
        },
        __wbg_has_0c97053e877f47cc: function(arg0, arg1, arg2) {
            const ret = getObject(arg0).has(getStringFromWasm0(arg1, arg2));
            return ret;
        },
        __wbg_has_73740b27f436fed3: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.has(getObject(arg0), getObject(arg1));
            return ret;
        }, arguments); },
        __wbg_height_4e7694e4e2110bdb: function(arg0) {
            const ret = getObject(arg0).height;
            return ret;
        },
        __wbg_info_af7f45292ba9b0ea: function(arg0) {
            console.info(getObject(arg0));
        },
        __wbg_info_cf0d9a286850cd24: function(arg0) {
            const ret = getObject(arg0).info;
            return addHeapObject(ret);
        },
        __wbg_innerHeight_8b6ee2571dbedb9d: function() { return handleError(function (arg0) {
            const ret = getObject(arg0).innerHeight;
            return addHeapObject(ret);
        }, arguments); },
        __wbg_innerWidth_7475bec19f48fe43: function() { return handleError(function (arg0) {
            const ret = getObject(arg0).innerWidth;
            return addHeapObject(ret);
        }, arguments); },
        __wbg_instanceof_ArrayBuffer_8f49811467741499: function(arg0) {
            let result;
            try {
                result = getObject(arg0) instanceof ArrayBuffer;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuOutOfMemoryError_6429c750997f1c8d: function(arg0) {
            let result;
            try {
                result = getObject(arg0) instanceof GPUOutOfMemoryError;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_GpuValidationError_75fa3611f065f4df: function(arg0) {
            let result;
            try {
                result = getObject(arg0) instanceof GPUValidationError;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_HtmlVideoElement_95590e1ff107ba83: function(arg0) {
            let result;
            try {
                result = getObject(arg0) instanceof HTMLVideoElement;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_ImageBitmap_beed1259521cd66d: function(arg0) {
            let result;
            try {
                result = getObject(arg0) instanceof ImageBitmap;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Response_cb984bd66d7bd408: function(arg0) {
            let result;
            try {
                result = getObject(arg0) instanceof Response;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Uint8Array_86f30649f63ef9c2: function(arg0) {
            let result;
            try {
                result = getObject(arg0) instanceof Uint8Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_WebGl2RenderingContext_39d13e3f953130c7: function(arg0) {
            let result;
            try {
                result = getObject(arg0) instanceof WebGL2RenderingContext;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Window_e093be59ee9a8e14: function(arg0) {
            let result;
            try {
                result = getObject(arg0) instanceof Window;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_invalidateFramebuffer_6b8dae55a3debb1d: function() { return handleError(function (arg0, arg1, arg2) {
            getObject(arg0).invalidateFramebuffer(arg1 >>> 0, getObject(arg2));
        }, arguments); },
        __wbg_isArray_67c2c9c4313f4448: function(arg0) {
            const ret = Array.isArray(getObject(arg0));
            return ret;
        },
        __wbg_isFallbackAdapter_8ccb967428491dcb: function(arg0) {
            const ret = getObject(arg0).isFallbackAdapter;
            return ret;
        },
        __wbg_isSafeInteger_66acec27e09e99a7: function(arg0) {
            const ret = Number.isSafeInteger(getObject(arg0));
            return ret;
        },
        __wbg_iterator_8732428d309e270e: function() {
            const ret = Symbol.iterator;
            return addHeapObject(ret);
        },
        __wbg_label_7ed42f25f841996b: function(arg0, arg1) {
            const ret = getObject(arg1).label;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_length_280688879ee7deb5: function(arg0) {
            const ret = getObject(arg0).length;
            return ret;
        },
        __wbg_length_4a591ecaa01354d9: function(arg0) {
            const ret = getObject(arg0).length;
            return ret;
        },
        __wbg_length_66f1a4b2e9026940: function(arg0) {
            const ret = getObject(arg0).length;
            return ret;
        },
        __wbg_limits_20c6f56636df7d38: function(arg0) {
            const ret = getObject(arg0).limits;
            return addHeapObject(ret);
        },
        __wbg_limits_328c61cd41512420: function(arg0) {
            const ret = getObject(arg0).limits;
            return addHeapObject(ret);
        },
        __wbg_linkProgram_3ccc9beaa6dace28: function(arg0, arg1) {
            getObject(arg0).linkProgram(getObject(arg1));
        },
        __wbg_linkProgram_fe2b1bf26336c4a5: function(arg0, arg1) {
            getObject(arg0).linkProgram(getObject(arg1));
        },
        __wbg_loadImageFromBytes_3d42766b73aca4ca: function(arg0) {
            const ret = loadImageFromBytes(takeObject(arg0));
            return addHeapObject(ret);
        },
        __wbg_loadImageFromUrl_50be99dbf040255b: function(arg0, arg1) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                const ret = loadImageFromUrl(getStringFromWasm0(arg0, arg1));
                return addHeapObject(ret);
            } finally {
                wasm.__wbindgen_export4(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_loadVideoFromBytes_3d884aadcf4d2139: function(arg0) {
            const ret = loadVideoFromBytes(takeObject(arg0));
            return addHeapObject(ret);
        },
        __wbg_loadVideoFromUrl_7997ffb030d4b08b: function(arg0, arg1) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                const ret = loadVideoFromUrl(getStringFromWasm0(arg0, arg1));
                return addHeapObject(ret);
            } finally {
                wasm.__wbindgen_export4(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_location_efdf1fea18b5552a: function(arg0) {
            const ret = getObject(arg0).location;
            return addHeapObject(ret);
        },
        __wbg_log_cf2e968649f3384e: function(arg0) {
            console.log(getObject(arg0));
        },
        __wbg_lost_0fa164c88f543338: function(arg0) {
            const ret = getObject(arg0).lost;
            return addHeapObject(ret);
        },
        __wbg_mapAsync_52b01fa9e8f765fd: function(arg0, arg1, arg2, arg3) {
            const ret = getObject(arg0).mapAsync(arg1 >>> 0, arg2, arg3);
            return addHeapObject(ret);
        },
        __wbg_maxBindGroupsPlusVertexBuffers_33e5006b23e20478: function(arg0) {
            const ret = getObject(arg0).maxBindGroupsPlusVertexBuffers;
            return ret;
        },
        __wbg_maxBindGroups_f6d26f3a67826666: function(arg0) {
            const ret = getObject(arg0).maxBindGroups;
            return ret;
        },
        __wbg_maxBindingsPerBindGroup_edab2e8dabbf6060: function(arg0) {
            const ret = getObject(arg0).maxBindingsPerBindGroup;
            return ret;
        },
        __wbg_maxBufferSize_bbc69284c14aa7da: function(arg0) {
            const ret = getObject(arg0).maxBufferSize;
            return ret;
        },
        __wbg_maxColorAttachmentBytesPerSample_63ebe4f81de2f34c: function(arg0) {
            const ret = getObject(arg0).maxColorAttachmentBytesPerSample;
            return ret;
        },
        __wbg_maxColorAttachments_aed8c38beabf3a5c: function(arg0) {
            const ret = getObject(arg0).maxColorAttachments;
            return ret;
        },
        __wbg_maxComputeInvocationsPerWorkgroup_2d964564c37f1c65: function(arg0) {
            const ret = getObject(arg0).maxComputeInvocationsPerWorkgroup;
            return ret;
        },
        __wbg_maxComputeWorkgroupSizeX_a3e3206570da184f: function(arg0) {
            const ret = getObject(arg0).maxComputeWorkgroupSizeX;
            return ret;
        },
        __wbg_maxComputeWorkgroupSizeY_dffa4a62244b7563: function(arg0) {
            const ret = getObject(arg0).maxComputeWorkgroupSizeY;
            return ret;
        },
        __wbg_maxComputeWorkgroupSizeZ_976ebcb760f6d07d: function(arg0) {
            const ret = getObject(arg0).maxComputeWorkgroupSizeZ;
            return ret;
        },
        __wbg_maxComputeWorkgroupStorageSize_2e8dbece6e532e2a: function(arg0) {
            const ret = getObject(arg0).maxComputeWorkgroupStorageSize;
            return ret;
        },
        __wbg_maxComputeWorkgroupsPerDimension_bb7d36b4d20c80f4: function(arg0) {
            const ret = getObject(arg0).maxComputeWorkgroupsPerDimension;
            return ret;
        },
        __wbg_maxDynamicStorageBuffersPerPipelineLayout_1ca859cb96a414e0: function(arg0) {
            const ret = getObject(arg0).maxDynamicStorageBuffersPerPipelineLayout;
            return ret;
        },
        __wbg_maxDynamicUniformBuffersPerPipelineLayout_e968f2c8cd8f4d46: function(arg0) {
            const ret = getObject(arg0).maxDynamicUniformBuffersPerPipelineLayout;
            return ret;
        },
        __wbg_maxInterStageShaderVariables_138ac882c4d6a3d3: function(arg0) {
            const ret = getObject(arg0).maxInterStageShaderVariables;
            return ret;
        },
        __wbg_maxSampledTexturesPerShaderStage_bb3e6b2698321fa6: function(arg0) {
            const ret = getObject(arg0).maxSampledTexturesPerShaderStage;
            return ret;
        },
        __wbg_maxSamplersPerShaderStage_98c00a1829fa414b: function(arg0) {
            const ret = getObject(arg0).maxSamplersPerShaderStage;
            return ret;
        },
        __wbg_maxStorageBufferBindingSize_e500e31f479e669e: function(arg0) {
            const ret = getObject(arg0).maxStorageBufferBindingSize;
            return ret;
        },
        __wbg_maxStorageBuffersPerShaderStage_eb663f6d7521b6a7: function(arg0) {
            const ret = getObject(arg0).maxStorageBuffersPerShaderStage;
            return ret;
        },
        __wbg_maxStorageTexturesPerShaderStage_bb3ad93b53e618c0: function(arg0) {
            const ret = getObject(arg0).maxStorageTexturesPerShaderStage;
            return ret;
        },
        __wbg_maxTextureArrayLayers_2a56d05fb261c99a: function(arg0) {
            const ret = getObject(arg0).maxTextureArrayLayers;
            return ret;
        },
        __wbg_maxTextureDimension1D_84590c1d4770d319: function(arg0) {
            const ret = getObject(arg0).maxTextureDimension1D;
            return ret;
        },
        __wbg_maxTextureDimension2D_7f2b5c8b2727e3fc: function(arg0) {
            const ret = getObject(arg0).maxTextureDimension2D;
            return ret;
        },
        __wbg_maxTextureDimension3D_7f3babddf55c32a6: function(arg0) {
            const ret = getObject(arg0).maxTextureDimension3D;
            return ret;
        },
        __wbg_maxUniformBufferBindingSize_d80a09e23c0b284c: function(arg0) {
            const ret = getObject(arg0).maxUniformBufferBindingSize;
            return ret;
        },
        __wbg_maxUniformBuffersPerShaderStage_0b8b2de676fa740e: function(arg0) {
            const ret = getObject(arg0).maxUniformBuffersPerShaderStage;
            return ret;
        },
        __wbg_maxVertexAttributes_a693dd921316649b: function(arg0) {
            const ret = getObject(arg0).maxVertexAttributes;
            return ret;
        },
        __wbg_maxVertexBufferArrayStride_f256d91f281076cb: function(arg0) {
            const ret = getObject(arg0).maxVertexBufferArrayStride;
            return ret;
        },
        __wbg_maxVertexBuffers_70ab564b25d5ac20: function(arg0) {
            const ret = getObject(arg0).maxVertexBuffers;
            return ret;
        },
        __wbg_message_28959d6ca4d7dda0: function(arg0, arg1) {
            const ret = getObject(arg1).message;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_message_4ada57a3710f1502: function(arg0, arg1) {
            const ret = getObject(arg1).message;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_minStorageBufferOffsetAlignment_3248ed00dcdbf79f: function(arg0) {
            const ret = getObject(arg0).minStorageBufferOffsetAlignment;
            return ret;
        },
        __wbg_minUniformBufferOffsetAlignment_3b9fa4caae03e903: function(arg0) {
            const ret = getObject(arg0).minUniformBufferOffsetAlignment;
            return ret;
        },
        __wbg_name_b7fa2500fc153b89: function(arg0, arg1) {
            const ret = getObject(arg1).name;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_navigator_3833ecdbc19d2757: function(arg0) {
            const ret = getObject(arg0).navigator;
            return addHeapObject(ret);
        },
        __wbg_navigator_391291470f58c650: function(arg0) {
            const ret = getObject(arg0).navigator;
            return addHeapObject(ret);
        },
        __wbg_new_227d7c05414eb861: function() {
            const ret = new Error();
            return addHeapObject(ret);
        },
        __wbg_new_3b242422c588a8f3: function() { return handleError(function (arg0, arg1) {
            const ret = new OffscreenCanvas(arg0 >>> 0, arg1 >>> 0);
            return addHeapObject(ret);
        }, arguments); },
        __wbg_new_578aeef4b6b94378: function(arg0) {
            const ret = new Uint8Array(getObject(arg0));
            return addHeapObject(ret);
        },
        __wbg_new_b682b81e8eaaf027: function(arg0, arg1) {
            try {
                var state0 = {a: arg0, b: arg1};
                var cb0 = (arg0, arg1) => {
                    const a = state0.a;
                    state0.a = 0;
                    try {
                        return __wasm_bindgen_func_elem_14197(a, state0.b, arg0, arg1);
                    } finally {
                        state0.a = a;
                    }
                };
                const ret = new Promise(cb0);
                return addHeapObject(ret);
            } finally {
                state0.a = 0;
            }
        },
        __wbg_new_ce1ab61c1c2b300d: function() {
            const ret = new Object();
            return addHeapObject(ret);
        },
        __wbg_new_d90091b82fdf5b91: function() {
            const ret = new Array();
            return addHeapObject(ret);
        },
        __wbg_new_from_slice_18fa1f71286d66b8: function(arg0, arg1) {
            const ret = new Uint8Array(getArrayU8FromWasm0(arg0, arg1));
            return addHeapObject(ret);
        },
        __wbg_new_from_slice_3c93d0bc613de8f0: function(arg0, arg1) {
            const ret = new Float64Array(getArrayF64FromWasm0(arg0, arg1));
            return addHeapObject(ret);
        },
        __wbg_new_from_slice_47be4219028de35d: function(arg0, arg1) {
            const ret = new Uint32Array(getArrayU32FromWasm0(arg0, arg1));
            return addHeapObject(ret);
        },
        __wbg_new_from_slice_956df4f769fb782c: function(arg0, arg1) {
            const ret = new Float32Array(getArrayF32FromWasm0(arg0, arg1));
            return addHeapObject(ret);
        },
        __wbg_new_typed_41c97238ee4583e3: function() {
            const ret = new Object();
            return addHeapObject(ret);
        },
        __wbg_new_typed_bf31d18f92484486: function(arg0, arg1) {
            try {
                var state0 = {a: arg0, b: arg1};
                var cb0 = (arg0, arg1) => {
                    const a = state0.a;
                    state0.a = 0;
                    try {
                        return __wasm_bindgen_func_elem_14197(a, state0.b, arg0, arg1);
                    } finally {
                        state0.a = a;
                    }
                };
                const ret = new Promise(cb0);
                return addHeapObject(ret);
            } finally {
                state0.a = 0;
            }
        },
        __wbg_new_with_byte_offset_and_length_d836f26d916dd9ad: function(arg0, arg1, arg2) {
            const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
            return addHeapObject(ret);
        },
        __wbg_new_with_length_36a4998e27b014c5: function(arg0) {
            const ret = new Uint8Array(arg0 >>> 0);
            return addHeapObject(ret);
        },
        __wbg_new_with_length_b4a87ccced374381: function(arg0) {
            const ret = new Float64Array(arg0 >>> 0);
            return addHeapObject(ret);
        },
        __wbg_new_with_str_and_init_bcd02b79a793d27f: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = new Request(getStringFromWasm0(arg0, arg1), getObject(arg2));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_next_9e03acdf51c4960d: function(arg0) {
            const ret = getObject(arg0).next;
            return addHeapObject(ret);
        },
        __wbg_next_eb8ca7351fa27906: function() { return handleError(function (arg0) {
            const ret = getObject(arg0).next();
            return addHeapObject(ret);
        }, arguments); },
        __wbg_now_f565250295e2d180: function(arg0) {
            const ret = getObject(arg0).now();
            return ret;
        },
        __wbg_of_57145fdec12d159f: function(arg0) {
            const ret = Array.of(getObject(arg0));
            return addHeapObject(ret);
        },
        __wbg_ok_fb13c30bc1893039: function(arg0) {
            const ret = getObject(arg0).ok;
            return ret;
        },
        __wbg_onSubmittedWorkDone_270d6b5a45520e79: function(arg0) {
            const ret = getObject(arg0).onSubmittedWorkDone();
            return addHeapObject(ret);
        },
        __wbg_open_177ad1dcc06b9106: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = getObject(arg0).open(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6));
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        }, arguments); },
        __wbg_open_feb75fe4d9971c50: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
            const ret = getObject(arg0).open(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        }, arguments); },
        __wbg_ownKeys_0587b8fe286a40e6: function() { return handleError(function (arg0) {
            const ret = Reflect.ownKeys(getObject(arg0));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_pause_adce2b37e004ae49: function() { return handleError(function (arg0) {
            getObject(arg0).pause();
        }, arguments); },
        __wbg_performance_68499ca0718837f5: function(arg0) {
            const ret = getObject(arg0).performance;
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_pixelStorei_6e42d231aa75bd00: function(arg0, arg1, arg2) {
            getObject(arg0).pixelStorei(arg1 >>> 0, arg2);
        },
        __wbg_pixelStorei_84dc1952dc699c94: function(arg0, arg1, arg2) {
            getObject(arg0).pixelStorei(arg1 >>> 0, arg2);
        },
        __wbg_play_4ed9ece3cae2c100: function() { return handleError(function (arg0) {
            const ret = getObject(arg0).play();
            return addHeapObject(ret);
        }, arguments); },
        __wbg_popErrorScope_8e7f4cbff8b758dd: function(arg0) {
            const ret = getObject(arg0).popErrorScope();
            return addHeapObject(ret);
        },
        __wbg_prototypesetcall_3249fc62a0fafa30: function(arg0, arg1, arg2) {
            Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), getObject(arg2));
        },
        __wbg_prototypesetcall_59640349d2c6d881: function(arg0, arg1, arg2) {
            Uint32Array.prototype.set.call(getArrayU32FromWasm0(arg0, arg1), getObject(arg2));
        },
        __wbg_provokingVertexWEBGL_0354dc7ad44d69bf: function(arg0, arg1) {
            getObject(arg0).provokingVertexWEBGL(arg1 >>> 0);
        },
        __wbg_pushErrorScope_fa23d1206bc26dce: function(arg0, arg1) {
            getObject(arg0).pushErrorScope(__wbindgen_enum_GpuErrorFilter[arg1]);
        },
        __wbg_push_a6822215aa43e71c: function(arg0, arg1) {
            const ret = getObject(arg0).push(getObject(arg1));
            return ret;
        },
        __wbg_querySelectorAll_4dcc230a2f8a2498: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = getObject(arg0).querySelectorAll(getStringFromWasm0(arg1, arg2));
            return addHeapObject(ret);
        }, arguments); },
        __wbg_queueMicrotask_35c611f4a14830b2: function(arg0) {
            queueMicrotask(getObject(arg0));
        },
        __wbg_queueMicrotask_404ed0a58e0b63cc: function(arg0) {
            const ret = getObject(arg0).queueMicrotask;
            return addHeapObject(ret);
        },
        __wbg_queue_adce34608fd0c893: function(arg0) {
            const ret = getObject(arg0).queue;
            return addHeapObject(ret);
        },
        __wbg_readBuffer_2027f7cdd7533f2d: function(arg0, arg1) {
            getObject(arg0).readBuffer(arg1 >>> 0);
        },
        __wbg_readPixels_a04f5cf5019be695: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            getObject(arg0).readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, getObject(arg7));
        }, arguments); },
        __wbg_readPixels_bf9ee726d9179d3c: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            getObject(arg0).readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, getObject(arg7));
        }, arguments); },
        __wbg_readPixels_d00c1cae608273d8: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            getObject(arg0).readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
        }, arguments); },
        __wbg_readyState_77b1b1db1b8c2a5f: function(arg0) {
            const ret = getObject(arg0).readyState;
            return ret;
        },
        __wbg_reason_b02cd587d1a09948: function(arg0) {
            const ret = getObject(arg0).reason;
            return (__wbindgen_enum_GpuDeviceLostReason.indexOf(ret) + 1 || 3) - 1;
        },
        __wbg_renderbufferStorageMultisample_75bba97a8e59bc6e: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            getObject(arg0).renderbufferStorageMultisample(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
        },
        __wbg_renderbufferStorage_3f5b0ec8fca2f9f8: function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).renderbufferStorage(arg1 >>> 0, arg2 >>> 0, arg3, arg4);
        },
        __wbg_renderbufferStorage_c34a47cacbbc5fff: function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).renderbufferStorage(arg1 >>> 0, arg2 >>> 0, arg3, arg4);
        },
        __wbg_requestAdapter_2e6718811c735a57: function(arg0, arg1) {
            const ret = getObject(arg0).requestAdapter(getObject(arg1));
            return addHeapObject(ret);
        },
        __wbg_requestDevice_ab46d0519ea1cc34: function(arg0, arg1) {
            const ret = getObject(arg0).requestDevice(getObject(arg1));
            return addHeapObject(ret);
        },
        __wbg_resolveQuerySet_0f32dc3de3f09701: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            getObject(arg0).resolveQuerySet(getObject(arg1), arg2 >>> 0, arg3 >>> 0, getObject(arg4), arg5 >>> 0);
        },
        __wbg_resolve_25a7e548d5881dca: function(arg0) {
            const ret = Promise.resolve(getObject(arg0));
            return addHeapObject(ret);
        },
        __wbg_scissor_079b7c4a5c9fcb63: function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).scissor(arg1, arg2, arg3, arg4);
        },
        __wbg_scissor_e69faa631ab6fdc0: function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).scissor(arg1, arg2, arg3, arg4);
        },
        __wbg_setBindGroup_268fd1714fff0ef5: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            getObject(arg0).setBindGroup(arg1 >>> 0, getObject(arg2), getArrayU32FromWasm0(arg3, arg4), arg5, arg6 >>> 0);
        }, arguments); },
        __wbg_setBindGroup_3e4ce136bc833ea1: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            getObject(arg0).setBindGroup(arg1 >>> 0, getObject(arg2), getArrayU32FromWasm0(arg3, arg4), arg5, arg6 >>> 0);
        }, arguments); },
        __wbg_setBindGroup_c22a1b95c0b17f37: function(arg0, arg1, arg2) {
            getObject(arg0).setBindGroup(arg1 >>> 0, getObject(arg2));
        },
        __wbg_setBindGroup_f0de6cb2c7dbfc2c: function(arg0, arg1, arg2) {
            getObject(arg0).setBindGroup(arg1 >>> 0, getObject(arg2));
        },
        __wbg_setIndexBuffer_2531a9103450445e: function(arg0, arg1, arg2, arg3) {
            getObject(arg0).setIndexBuffer(getObject(arg1), __wbindgen_enum_GpuIndexFormat[arg2], arg3);
        },
        __wbg_setIndexBuffer_7f3cf667b4d71566: function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).setIndexBuffer(getObject(arg1), __wbindgen_enum_GpuIndexFormat[arg2], arg3, arg4);
        },
        __wbg_setPipeline_c41bf46790f27f9e: function(arg0, arg1) {
            getObject(arg0).setPipeline(getObject(arg1));
        },
        __wbg_setPipeline_d73f019e98c76d2d: function(arg0, arg1) {
            getObject(arg0).setPipeline(getObject(arg1));
        },
        __wbg_setStencilReference_66c74be6232bb9da: function(arg0, arg1) {
            getObject(arg0).setStencilReference(arg1 >>> 0);
        },
        __wbg_setTimeout_b5f25e402b6e8ff9: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = getObject(arg0).setTimeout(getObject(arg1), arg2);
            return ret;
        }, arguments); },
        __wbg_setVertexBuffer_1e448859663dd400: function(arg0, arg1, arg2, arg3) {
            getObject(arg0).setVertexBuffer(arg1 >>> 0, getObject(arg2), arg3);
        },
        __wbg_setVertexBuffer_7cf533d694e747f3: function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).setVertexBuffer(arg1 >>> 0, getObject(arg2), arg3, arg4);
        },
        __wbg_setViewport_d9fc3eac343de7d0: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            getObject(arg0).setViewport(arg1, arg2, arg3, arg4, arg5, arg6);
        },
        __wbg_set_29c99a8aac1c01e5: function(arg0, arg1, arg2) {
            getObject(arg0).set(getArrayU8FromWasm0(arg1, arg2));
        },
        __wbg_set_6e30c9374c26414c: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
            return ret;
        }, arguments); },
        __wbg_set_6f7e2d6e41d9a122: function(arg0, arg1, arg2) {
            getObject(arg0)[takeObject(arg1)] = takeObject(arg2);
        },
        __wbg_set_a_88262a42340d0b1c: function(arg0, arg1) {
            getObject(arg0).a = arg1;
        },
        __wbg_set_access_9a5092f05dc45fad: function(arg0, arg1) {
            getObject(arg0).access = __wbindgen_enum_GpuStorageTextureAccess[arg1];
        },
        __wbg_set_address_mode_u_9e2695575a219e33: function(arg0, arg1) {
            getObject(arg0).addressModeU = __wbindgen_enum_GpuAddressMode[arg1];
        },
        __wbg_set_address_mode_v_f479b2e6cccbcac4: function(arg0, arg1) {
            getObject(arg0).addressModeV = __wbindgen_enum_GpuAddressMode[arg1];
        },
        __wbg_set_address_mode_w_46273e153230180d: function(arg0, arg1) {
            getObject(arg0).addressModeW = __wbindgen_enum_GpuAddressMode[arg1];
        },
        __wbg_set_alpha_bfd2df62e7bc581b: function(arg0, arg1) {
            getObject(arg0).alpha = getObject(arg1);
        },
        __wbg_set_alpha_mode_df805952892caa9c: function(arg0, arg1) {
            getObject(arg0).alphaMode = __wbindgen_enum_GpuCanvasAlphaMode[arg1];
        },
        __wbg_set_alpha_to_coverage_enabled_8b5dc2b0a225b3b2: function(arg0, arg1) {
            getObject(arg0).alphaToCoverageEnabled = arg1 !== 0;
        },
        __wbg_set_array_layer_count_7312f0f31af94e7c: function(arg0, arg1) {
            getObject(arg0).arrayLayerCount = arg1 >>> 0;
        },
        __wbg_set_array_stride_f64_27ffaf4fffd74e61: function(arg0, arg1) {
            getObject(arg0).arrayStride = arg1;
        },
        __wbg_set_aspect_0d453bca3d012f02: function(arg0, arg1) {
            getObject(arg0).aspect = __wbindgen_enum_GpuTextureAspect[arg1];
        },
        __wbg_set_aspect_210da747c9d77aba: function(arg0, arg1) {
            getObject(arg0).aspect = __wbindgen_enum_GpuTextureAspect[arg1];
        },
        __wbg_set_aspect_4962514fe99e68e6: function(arg0, arg1) {
            getObject(arg0).aspect = __wbindgen_enum_GpuTextureAspect[arg1];
        },
        __wbg_set_attributes_7537844a7e6dafdc: function(arg0, arg1, arg2) {
            getObject(arg0).attributes = getArrayJsValueViewFromWasm0(arg1, arg2);
        },
        __wbg_set_b_c47befe0af3261eb: function(arg0, arg1) {
            getObject(arg0).b = arg1;
        },
        __wbg_set_base_array_layer_f176bb9f1b37b342: function(arg0, arg1) {
            getObject(arg0).baseArrayLayer = arg1 >>> 0;
        },
        __wbg_set_base_mip_level_1df145d9f8db32a9: function(arg0, arg1) {
            getObject(arg0).baseMipLevel = arg1 >>> 0;
        },
        __wbg_set_beginning_of_pass_write_index_0d4fa06109208ad7: function(arg0, arg1) {
            getObject(arg0).beginningOfPassWriteIndex = arg1 >>> 0;
        },
        __wbg_set_beginning_of_pass_write_index_e9f5d016947893bd: function(arg0, arg1) {
            getObject(arg0).beginningOfPassWriteIndex = arg1 >>> 0;
        },
        __wbg_set_bind_group_layouts_5a9cfea401c020ab: function(arg0, arg1, arg2) {
            getObject(arg0).bindGroupLayouts = getArrayJsValueViewFromWasm0(arg1, arg2);
        },
        __wbg_set_binding_155b0440b4307793: function(arg0, arg1) {
            getObject(arg0).binding = arg1 >>> 0;
        },
        __wbg_set_binding_f74df3510792aba1: function(arg0, arg1) {
            getObject(arg0).binding = arg1 >>> 0;
        },
        __wbg_set_blend_7493c2066c3e9970: function(arg0, arg1) {
            getObject(arg0).blend = getObject(arg1);
        },
        __wbg_set_buffer_9c01e3b6d6765ea2: function(arg0, arg1) {
            getObject(arg0).buffer = getObject(arg1);
        },
        __wbg_set_buffer_c3410572051920ba: function(arg0, arg1) {
            getObject(arg0).buffer = getObject(arg1);
        },
        __wbg_set_buffer_ef7f75306cf663ed: function(arg0, arg1) {
            getObject(arg0).buffer = getObject(arg1);
        },
        __wbg_set_buffers_7d0d8f507699e956: function(arg0, arg1, arg2) {
            getObject(arg0).buffers = getArrayJsValueViewFromWasm0(arg1, arg2);
        },
        __wbg_set_bytes_per_row_c54ca96953f35774: function(arg0, arg1) {
            getObject(arg0).bytesPerRow = arg1 >>> 0;
        },
        __wbg_set_bytes_per_row_d69b88eee3929c07: function(arg0, arg1) {
            getObject(arg0).bytesPerRow = arg1 >>> 0;
        },
        __wbg_set_c775d84916be79ea: function(arg0, arg1, arg2) {
            getObject(arg0).set(getObject(arg1), arg2 >>> 0);
        },
        __wbg_set_clear_value_gpu_color_dict_6211425789c76e59: function(arg0, arg1) {
            getObject(arg0).clearValue = getObject(arg1);
        },
        __wbg_set_code_b4f37f81f45b5b25: function(arg0, arg1, arg2) {
            getObject(arg0).code = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_color_83aa977526e88cbb: function(arg0, arg1) {
            getObject(arg0).color = getObject(arg1);
        },
        __wbg_set_color_attachments_581fdb3310e4abfa: function(arg0, arg1, arg2) {
            getObject(arg0).colorAttachments = getArrayJsValueViewFromWasm0(arg1, arg2);
        },
        __wbg_set_compare_cd9b62cdb92eb580: function(arg0, arg1) {
            getObject(arg0).compare = __wbindgen_enum_GpuCompareFunction[arg1];
        },
        __wbg_set_compare_f36b34abfaa08ccb: function(arg0, arg1) {
            getObject(arg0).compare = __wbindgen_enum_GpuCompareFunction[arg1];
        },
        __wbg_set_compute_d0c2d276b6d4b18d: function(arg0, arg1) {
            getObject(arg0).compute = getObject(arg1);
        },
        __wbg_set_count_069a4eac409bac55: function(arg0, arg1) {
            getObject(arg0).count = arg1 >>> 0;
        },
        __wbg_set_count_3ab1c1220e4ceeb3: function(arg0, arg1) {
            getObject(arg0).count = arg1 >>> 0;
        },
        __wbg_set_cull_mode_fc649853947a3d0c: function(arg0, arg1) {
            getObject(arg0).cullMode = __wbindgen_enum_GpuCullMode[arg1];
        },
        __wbg_set_currentTime_7c37e2312e9d2687: function(arg0, arg1) {
            getObject(arg0).currentTime = arg1;
        },
        __wbg_set_depth_bias_clamp_1c0d695df7f092e5: function(arg0, arg1) {
            getObject(arg0).depthBiasClamp = arg1;
        },
        __wbg_set_depth_bias_d7cd16096242a657: function(arg0, arg1) {
            getObject(arg0).depthBias = arg1;
        },
        __wbg_set_depth_bias_slope_scale_c4e52ec743ef55ba: function(arg0, arg1) {
            getObject(arg0).depthBiasSlopeScale = arg1;
        },
        __wbg_set_depth_clear_value_beda3ec5b1a5c43a: function(arg0, arg1) {
            getObject(arg0).depthClearValue = arg1;
        },
        __wbg_set_depth_compare_0c8631eb2eae98e3: function(arg0, arg1) {
            getObject(arg0).depthCompare = __wbindgen_enum_GpuCompareFunction[arg1];
        },
        __wbg_set_depth_fail_op_668155ae33d3c06f: function(arg0, arg1) {
            getObject(arg0).depthFailOp = __wbindgen_enum_GpuStencilOperation[arg1];
        },
        __wbg_set_depth_load_op_511c513eab4e56a9: function(arg0, arg1) {
            getObject(arg0).depthLoadOp = __wbindgen_enum_GpuLoadOp[arg1];
        },
        __wbg_set_depth_or_array_layers_89371305ed0bd962: function(arg0, arg1) {
            getObject(arg0).depthOrArrayLayers = arg1 >>> 0;
        },
        __wbg_set_depth_read_only_7f41a74741c144ec: function(arg0, arg1) {
            getObject(arg0).depthReadOnly = arg1 !== 0;
        },
        __wbg_set_depth_stencil_97506c7bea4f53da: function(arg0, arg1) {
            getObject(arg0).depthStencil = getObject(arg1);
        },
        __wbg_set_depth_stencil_attachment_73b79e8b4e948222: function(arg0, arg1) {
            getObject(arg0).depthStencilAttachment = getObject(arg1);
        },
        __wbg_set_depth_store_op_c89f33b39b43361c: function(arg0, arg1) {
            getObject(arg0).depthStoreOp = __wbindgen_enum_GpuStoreOp[arg1];
        },
        __wbg_set_depth_write_enabled_ce89750042940350: function(arg0, arg1) {
            getObject(arg0).depthWriteEnabled = arg1 !== 0;
        },
        __wbg_set_device_e275d1d4f3c9eb74: function(arg0, arg1) {
            getObject(arg0).device = getObject(arg1);
        },
        __wbg_set_dimension_868eee80f4b90011: function(arg0, arg1) {
            getObject(arg0).dimension = __wbindgen_enum_GpuTextureDimension[arg1];
        },
        __wbg_set_dimension_e325282e613ca0a4: function(arg0, arg1) {
            getObject(arg0).dimension = __wbindgen_enum_GpuTextureViewDimension[arg1];
        },
        __wbg_set_dst_factor_ec7407f19be1aff9: function(arg0, arg1) {
            getObject(arg0).dstFactor = __wbindgen_enum_GpuBlendFactor[arg1];
        },
        __wbg_set_end_of_pass_write_index_0d546e46b86ea069: function(arg0, arg1) {
            getObject(arg0).endOfPassWriteIndex = arg1 >>> 0;
        },
        __wbg_set_end_of_pass_write_index_49a6ddbb2b888bfa: function(arg0, arg1) {
            getObject(arg0).endOfPassWriteIndex = arg1 >>> 0;
        },
        __wbg_set_entries_86a29dd6291c95e7: function(arg0, arg1, arg2) {
            getObject(arg0).entries = getArrayJsValueViewFromWasm0(arg1, arg2);
        },
        __wbg_set_entries_a12aca1e458b0456: function(arg0, arg1, arg2) {
            getObject(arg0).entries = getArrayJsValueViewFromWasm0(arg1, arg2);
        },
        __wbg_set_entry_point_207540f042015ce5: function(arg0, arg1, arg2) {
            getObject(arg0).entryPoint = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_entry_point_5f26aacbe4c545eb: function(arg0, arg1, arg2) {
            getObject(arg0).entryPoint = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_entry_point_e87e79251dd3144f: function(arg0, arg1, arg2) {
            getObject(arg0).entryPoint = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_external_texture_386483d8dd82ab56: function(arg0, arg1) {
            getObject(arg0).externalTexture = getObject(arg1);
        },
        __wbg_set_fail_op_92f716dbc88b6973: function(arg0, arg1) {
            getObject(arg0).failOp = __wbindgen_enum_GpuStencilOperation[arg1];
        },
        __wbg_set_flip_y_4e1632b36ad0413a: function(arg0, arg1) {
            getObject(arg0).flipY = arg1 !== 0;
        },
        __wbg_set_format_1fcaa7d60546b490: function(arg0, arg1) {
            getObject(arg0).format = __wbindgen_enum_GpuTextureFormat[arg1];
        },
        __wbg_set_format_2c1414a817c213f8: function(arg0, arg1) {
            getObject(arg0).format = __wbindgen_enum_GpuTextureFormat[arg1];
        },
        __wbg_set_format_533f9ffa7eef563d: function(arg0, arg1) {
            getObject(arg0).format = __wbindgen_enum_GpuTextureFormat[arg1];
        },
        __wbg_set_format_5d2f25cc93654ecc: function(arg0, arg1) {
            getObject(arg0).format = __wbindgen_enum_GpuVertexFormat[arg1];
        },
        __wbg_set_format_5ff53724ed6cedf2: function(arg0, arg1) {
            getObject(arg0).format = __wbindgen_enum_GpuTextureFormat[arg1];
        },
        __wbg_set_format_815efd4dc4817bbb: function(arg0, arg1) {
            getObject(arg0).format = __wbindgen_enum_GpuTextureFormat[arg1];
        },
        __wbg_set_format_e52bdcca880d2c8e: function(arg0, arg1) {
            getObject(arg0).format = __wbindgen_enum_GpuTextureFormat[arg1];
        },
        __wbg_set_fragment_8b780f00a0b0e6f3: function(arg0, arg1) {
            getObject(arg0).fragment = getObject(arg1);
        },
        __wbg_set_front_face_28ffdf524eedce5b: function(arg0, arg1) {
            getObject(arg0).frontFace = __wbindgen_enum_GpuFrontFace[arg1];
        },
        __wbg_set_g_5983abfc46e0cf4e: function(arg0, arg1) {
            getObject(arg0).g = arg1;
        },
        __wbg_set_has_dynamic_offset_62bc230bdb7c54d0: function(arg0, arg1) {
            getObject(arg0).hasDynamicOffset = arg1 !== 0;
        },
        __wbg_set_height_0739170de8653cc4: function(arg0, arg1) {
            getObject(arg0).height = arg1 >>> 0;
        },
        __wbg_set_height_14335c4047cf9c1b: function(arg0, arg1) {
            getObject(arg0).height = arg1 >>> 0;
        },
        __wbg_set_height_c661af0c0b5376f9: function(arg0, arg1) {
            getObject(arg0).height = arg1 >>> 0;
        },
        __wbg_set_label_08d9be3e4719c226: function(arg0, arg1, arg2) {
            getObject(arg0).label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_17eb9fe3a02f62b0: function(arg0, arg1, arg2) {
            getObject(arg0).label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_206558c8adc3780f: function(arg0, arg1, arg2) {
            getObject(arg0).label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_48e6b787d256f621: function(arg0, arg1, arg2) {
            getObject(arg0).label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_547d0d4aec39fbe9: function(arg0, arg1, arg2) {
            getObject(arg0).label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_5ee7427342869829: function(arg0, arg1, arg2) {
            getObject(arg0).label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_60ad96c811e0d109: function(arg0, arg1, arg2) {
            getObject(arg0).label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_6db0393d3fdc90a5: function(arg0, arg1, arg2) {
            getObject(arg0).label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_72bb4f41ef0cb893: function(arg0, arg1, arg2) {
            getObject(arg0).label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_79387decda299036: function(arg0, arg1, arg2) {
            getObject(arg0).label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_9556af8b5cda3c9d: function(arg0, arg1, arg2) {
            getObject(arg0).label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_d010f237b26f2c55: function(arg0, arg1, arg2) {
            getObject(arg0).label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_e16e2dbe51349c7f: function(arg0, arg1, arg2) {
            getObject(arg0).label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_e3944e54881b8c50: function(arg0, arg1, arg2) {
            getObject(arg0).label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_e922700240417ab5: function(arg0, arg1, arg2) {
            getObject(arg0).label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_label_ef44793ddf4455c5: function(arg0, arg1, arg2) {
            getObject(arg0).label = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_layout_41021cfd2a2f62df: function(arg0, arg1) {
            getObject(arg0).layout = getObject(arg1);
        },
        __wbg_set_layout_50ab727f44b38f26: function(arg0, arg1) {
            getObject(arg0).layout = getObject(arg1);
        },
        __wbg_set_layout_913d53c17194c989: function(arg0, arg1) {
            getObject(arg0).layout = getObject(arg1);
        },
        __wbg_set_layout_gpu_auto_layout_mode_0a5a185b3d52b726: function(arg0, arg1) {
            getObject(arg0).layout = __wbindgen_enum_GpuAutoLayoutMode[arg1];
        },
        __wbg_set_layout_gpu_auto_layout_mode_aeba193938b47882: function(arg0, arg1) {
            getObject(arg0).layout = __wbindgen_enum_GpuAutoLayoutMode[arg1];
        },
        __wbg_set_load_op_99661da6c4eab9b0: function(arg0, arg1) {
            getObject(arg0).loadOp = __wbindgen_enum_GpuLoadOp[arg1];
        },
        __wbg_set_lod_max_clamp_dd2d9f9f052f4f44: function(arg0, arg1) {
            getObject(arg0).lodMaxClamp = arg1;
        },
        __wbg_set_lod_min_clamp_6d20c97916baeb93: function(arg0, arg1) {
            getObject(arg0).lodMinClamp = arg1;
        },
        __wbg_set_loop_b622b726769860be: function(arg0, arg1) {
            getObject(arg0).loop = arg1 !== 0;
        },
        __wbg_set_mag_filter_b5adebc99cb938e1: function(arg0, arg1) {
            getObject(arg0).magFilter = __wbindgen_enum_GpuFilterMode[arg1];
        },
        __wbg_set_mapped_at_creation_81b586dc90a50347: function(arg0, arg1) {
            getObject(arg0).mappedAtCreation = arg1 !== 0;
        },
        __wbg_set_mask_70a8a59ce09e5997: function(arg0, arg1) {
            getObject(arg0).mask = arg1 >>> 0;
        },
        __wbg_set_max_anisotropy_2beada0e2db62c45: function(arg0, arg1) {
            getObject(arg0).maxAnisotropy = arg1;
        },
        __wbg_set_method_7a6811dec7a4feff: function(arg0, arg1, arg2) {
            getObject(arg0).method = getStringFromWasm0(arg1, arg2);
        },
        __wbg_set_min_binding_size_f64_5005a6904cdf43da: function(arg0, arg1) {
            getObject(arg0).minBindingSize = arg1;
        },
        __wbg_set_min_filter_c72f17375e135f0a: function(arg0, arg1) {
            getObject(arg0).minFilter = __wbindgen_enum_GpuFilterMode[arg1];
        },
        __wbg_set_mip_level_13253f3afc7aa58a: function(arg0, arg1) {
            getObject(arg0).mipLevel = arg1 >>> 0;
        },
        __wbg_set_mip_level_count_534caaa7e68e68b8: function(arg0, arg1) {
            getObject(arg0).mipLevelCount = arg1 >>> 0;
        },
        __wbg_set_mip_level_count_776c8c218b65bc08: function(arg0, arg1) {
            getObject(arg0).mipLevelCount = arg1 >>> 0;
        },
        __wbg_set_mip_level_f7ac79e8c54f59ad: function(arg0, arg1) {
            getObject(arg0).mipLevel = arg1 >>> 0;
        },
        __wbg_set_mipmap_filter_5bf66195a3639700: function(arg0, arg1) {
            getObject(arg0).mipmapFilter = __wbindgen_enum_GpuMipmapFilterMode[arg1];
        },
        __wbg_set_mode_9990b3393ba469ae: function(arg0, arg1) {
            getObject(arg0).mode = __wbindgen_enum_GpuCanvasToneMappingMode[arg1];
        },
        __wbg_set_mode_c90e3667002857d4: function(arg0, arg1) {
            getObject(arg0).mode = __wbindgen_enum_RequestMode[arg1];
        },
        __wbg_set_module_5db9b76ee2dd2a59: function(arg0, arg1) {
            getObject(arg0).module = getObject(arg1);
        },
        __wbg_set_module_d0e2098713606cae: function(arg0, arg1) {
            getObject(arg0).module = getObject(arg1);
        },
        __wbg_set_module_f02e076ca7e7daf8: function(arg0, arg1) {
            getObject(arg0).module = getObject(arg1);
        },
        __wbg_set_multisample_37ddafe88b5cd466: function(arg0, arg1) {
            getObject(arg0).multisample = getObject(arg1);
        },
        __wbg_set_multisampled_7913fd7183272840: function(arg0, arg1) {
            getObject(arg0).multisampled = arg1 !== 0;
        },
        __wbg_set_muted_16f1e7acd8244e28: function(arg0, arg1) {
            getObject(arg0).muted = arg1 !== 0;
        },
        __wbg_set_offset_f64_28c24dc15000932e: function(arg0, arg1) {
            getObject(arg0).offset = arg1;
        },
        __wbg_set_offset_f64_89f0ce01a689839e: function(arg0, arg1) {
            getObject(arg0).offset = arg1;
        },
        __wbg_set_offset_f64_b562d1367e34ef93: function(arg0, arg1) {
            getObject(arg0).offset = arg1;
        },
        __wbg_set_offset_f64_fa66068813376ca3: function(arg0, arg1) {
            getObject(arg0).offset = arg1;
        },
        __wbg_set_once_27df5233613a51cd: function(arg0, arg1) {
            getObject(arg0).once = arg1 !== 0;
        },
        __wbg_set_operation_62ce44e1728c4047: function(arg0, arg1) {
            getObject(arg0).operation = __wbindgen_enum_GpuBlendOperation[arg1];
        },
        __wbg_set_origin_gpu_origin_2d_dict_1240202973e56f92: function(arg0, arg1) {
            getObject(arg0).origin = getObject(arg1);
        },
        __wbg_set_origin_gpu_origin_3d_dict_37222d7b3d238123: function(arg0, arg1) {
            getObject(arg0).origin = getObject(arg1);
        },
        __wbg_set_origin_gpu_origin_3d_dict_631c04520718091f: function(arg0, arg1) {
            getObject(arg0).origin = getObject(arg1);
        },
        __wbg_set_pass_op_cf02fa088d6352a7: function(arg0, arg1) {
            getObject(arg0).passOp = __wbindgen_enum_GpuStencilOperation[arg1];
        },
        __wbg_set_power_preference_8fdca0b7af640d49: function(arg0, arg1) {
            getObject(arg0).powerPreference = __wbindgen_enum_GpuPowerPreference[arg1];
        },
        __wbg_set_premultiplied_alpha_3f27816ad319d5a9: function(arg0, arg1) {
            getObject(arg0).premultipliedAlpha = arg1 !== 0;
        },
        __wbg_set_primitive_43c23761a55b4088: function(arg0, arg1) {
            getObject(arg0).primitive = getObject(arg1);
        },
        __wbg_set_query_set_41de86d2401aee04: function(arg0, arg1) {
            getObject(arg0).querySet = getObject(arg1);
        },
        __wbg_set_query_set_4889dd944d5ec0fd: function(arg0, arg1) {
            getObject(arg0).querySet = getObject(arg1);
        },
        __wbg_set_r_c6f4c68f4804d655: function(arg0, arg1) {
            getObject(arg0).r = arg1;
        },
        __wbg_set_required_features_1baf274a8669db60: function(arg0, arg1, arg2) {
            getObject(arg0).requiredFeatures = getArrayJsValueViewFromWasm0(arg1, arg2);
        },
        __wbg_set_required_limits_871ed33c68613dcb: function(arg0, arg1) {
            getObject(arg0).requiredLimits = getObject(arg1);
        },
        __wbg_set_resolve_target_gpu_texture_view_b19a4f2debf79b96: function(arg0, arg1) {
            getObject(arg0).resolveTarget = getObject(arg1);
        },
        __wbg_set_resource_5ae7b5e67924f234: function(arg0, arg1) {
            getObject(arg0).resource = getObject(arg1);
        },
        __wbg_set_resource_gpu_buffer_binding_e5dbca063e7cb67b: function(arg0, arg1) {
            getObject(arg0).resource = getObject(arg1);
        },
        __wbg_set_resource_gpu_texture_view_eb46c355d51ad7e5: function(arg0, arg1) {
            getObject(arg0).resource = getObject(arg1);
        },
        __wbg_set_rows_per_image_5011f97318ee71af: function(arg0, arg1) {
            getObject(arg0).rowsPerImage = arg1 >>> 0;
        },
        __wbg_set_rows_per_image_59a813ac5006e10e: function(arg0, arg1) {
            getObject(arg0).rowsPerImage = arg1 >>> 0;
        },
        __wbg_set_sample_count_eb86a8b18545b54f: function(arg0, arg1) {
            getObject(arg0).sampleCount = arg1 >>> 0;
        },
        __wbg_set_sample_type_c32e1dfff94e63eb: function(arg0, arg1) {
            getObject(arg0).sampleType = __wbindgen_enum_GpuTextureSampleType[arg1];
        },
        __wbg_set_sampler_c0e1258543a33bce: function(arg0, arg1) {
            getObject(arg0).sampler = getObject(arg1);
        },
        __wbg_set_shader_location_7e1832a74f912217: function(arg0, arg1) {
            getObject(arg0).shaderLocation = arg1 >>> 0;
        },
        __wbg_set_size_f64_6bcd40704bf4cfdc: function(arg0, arg1) {
            getObject(arg0).size = arg1;
        },
        __wbg_set_size_f64_8b8f6bba5d678162: function(arg0, arg1) {
            getObject(arg0).size = arg1;
        },
        __wbg_set_size_gpu_extent_3d_dict_7e42e1c98fa36434: function(arg0, arg1) {
            getObject(arg0).size = getObject(arg1);
        },
        __wbg_set_source_0c40b87cfdd5d704: function(arg0, arg1) {
            getObject(arg0).source = getObject(arg1);
        },
        __wbg_set_source_html_canvas_element_f657e39507ba2fe5: function(arg0, arg1) {
            getObject(arg0).source = getObject(arg1);
        },
        __wbg_set_source_html_image_element_fcc7cba0635adac1: function(arg0, arg1) {
            getObject(arg0).source = getObject(arg1);
        },
        __wbg_set_source_html_video_element_e63a39653665f651: function(arg0, arg1) {
            getObject(arg0).source = getObject(arg1);
        },
        __wbg_set_source_image_data_68478f1afce208b8: function(arg0, arg1) {
            getObject(arg0).source = getObject(arg1);
        },
        __wbg_set_source_offscreen_canvas_266a3de949693e62: function(arg0, arg1) {
            getObject(arg0).source = getObject(arg1);
        },
        __wbg_set_source_video_frame_3083c0ce54b9cb73: function(arg0, arg1) {
            getObject(arg0).source = getObject(arg1);
        },
        __wbg_set_src_factor_9bfe84af9b7b5cac: function(arg0, arg1) {
            getObject(arg0).srcFactor = __wbindgen_enum_GpuBlendFactor[arg1];
        },
        __wbg_set_stencil_back_85b22f1db5b1940a: function(arg0, arg1) {
            getObject(arg0).stencilBack = getObject(arg1);
        },
        __wbg_set_stencil_clear_value_42be608809151e2a: function(arg0, arg1) {
            getObject(arg0).stencilClearValue = arg1 >>> 0;
        },
        __wbg_set_stencil_front_525526164a798a44: function(arg0, arg1) {
            getObject(arg0).stencilFront = getObject(arg1);
        },
        __wbg_set_stencil_load_op_31838c036993098a: function(arg0, arg1) {
            getObject(arg0).stencilLoadOp = __wbindgen_enum_GpuLoadOp[arg1];
        },
        __wbg_set_stencil_read_mask_5cc26495e8b3ae82: function(arg0, arg1) {
            getObject(arg0).stencilReadMask = arg1 >>> 0;
        },
        __wbg_set_stencil_read_only_bf1d0c1897e25c62: function(arg0, arg1) {
            getObject(arg0).stencilReadOnly = arg1 !== 0;
        },
        __wbg_set_stencil_store_op_e6be1cbc3a8fc210: function(arg0, arg1) {
            getObject(arg0).stencilStoreOp = __wbindgen_enum_GpuStoreOp[arg1];
        },
        __wbg_set_stencil_write_mask_d9cb40ec4b4bee5b: function(arg0, arg1) {
            getObject(arg0).stencilWriteMask = arg1 >>> 0;
        },
        __wbg_set_step_mode_a97bb24714da41a9: function(arg0, arg1) {
            getObject(arg0).stepMode = __wbindgen_enum_GpuVertexStepMode[arg1];
        },
        __wbg_set_storage_texture_939a097db4b18bd4: function(arg0, arg1) {
            getObject(arg0).storageTexture = getObject(arg1);
        },
        __wbg_set_store_op_b5fdf672436f13f3: function(arg0, arg1) {
            getObject(arg0).storeOp = __wbindgen_enum_GpuStoreOp[arg1];
        },
        __wbg_set_strip_index_format_9f787be6c5fc9e87: function(arg0, arg1) {
            getObject(arg0).stripIndexFormat = __wbindgen_enum_GpuIndexFormat[arg1];
        },
        __wbg_set_targets_c38bd200c836d66f: function(arg0, arg1, arg2) {
            getObject(arg0).targets = getArrayJsValueViewFromWasm0(arg1, arg2);
        },
        __wbg_set_texture_016561d5911339e5: function(arg0, arg1) {
            getObject(arg0).texture = getObject(arg1);
        },
        __wbg_set_texture_1f64653a5d2d7b4d: function(arg0, arg1) {
            getObject(arg0).texture = getObject(arg1);
        },
        __wbg_set_texture_9dcedde1bb31eda6: function(arg0, arg1) {
            getObject(arg0).texture = getObject(arg1);
        },
        __wbg_set_timestamp_writes_59c2d19ed8aecd97: function(arg0, arg1) {
            getObject(arg0).timestampWrites = getObject(arg1);
        },
        __wbg_set_timestamp_writes_98bed1a8bbc6682d: function(arg0, arg1) {
            getObject(arg0).timestampWrites = getObject(arg1);
        },
        __wbg_set_tone_mapping_b3464f1baa4cff92: function(arg0, arg1) {
            getObject(arg0).toneMapping = getObject(arg1);
        },
        __wbg_set_topology_da25f2cc5af203d2: function(arg0, arg1) {
            getObject(arg0).topology = __wbindgen_enum_GpuPrimitiveTopology[arg1];
        },
        __wbg_set_type_7f0457c6084dde9b: function(arg0, arg1) {
            getObject(arg0).type = __wbindgen_enum_GpuQueryType[arg1];
        },
        __wbg_set_type_ccf8472d40abcddf: function(arg0, arg1) {
            getObject(arg0).type = __wbindgen_enum_GpuSamplerBindingType[arg1];
        },
        __wbg_set_type_d09829f59932a0fc: function(arg0, arg1) {
            getObject(arg0).type = __wbindgen_enum_GpuBufferBindingType[arg1];
        },
        __wbg_set_unclipped_depth_04524a2b44e1e3c1: function(arg0, arg1) {
            getObject(arg0).unclippedDepth = arg1 !== 0;
        },
        __wbg_set_usage_a137f82ca163b0a9: function(arg0, arg1) {
            getObject(arg0).usage = arg1 >>> 0;
        },
        __wbg_set_usage_b2a2935f37bf3d08: function(arg0, arg1) {
            getObject(arg0).usage = arg1 >>> 0;
        },
        __wbg_set_usage_ba5b0f8b333ab325: function(arg0, arg1) {
            getObject(arg0).usage = arg1 >>> 0;
        },
        __wbg_set_usage_ddd42599bbba7779: function(arg0, arg1) {
            getObject(arg0).usage = arg1 >>> 0;
        },
        __wbg_set_vertex_0be5d146f9ff6f36: function(arg0, arg1) {
            getObject(arg0).vertex = getObject(arg1);
        },
        __wbg_set_view_dimension_0df554032f1f3a85: function(arg0, arg1) {
            getObject(arg0).viewDimension = __wbindgen_enum_GpuTextureViewDimension[arg1];
        },
        __wbg_set_view_dimension_4818d4c18ce5815e: function(arg0, arg1) {
            getObject(arg0).viewDimension = __wbindgen_enum_GpuTextureViewDimension[arg1];
        },
        __wbg_set_view_formats_4347dc8363331086: function(arg0, arg1, arg2) {
            getObject(arg0).viewFormats = getArrayJsValueViewFromWasm0(arg1, arg2);
        },
        __wbg_set_view_formats_5797d2fff3c11808: function(arg0, arg1, arg2) {
            getObject(arg0).viewFormats = getArrayJsValueViewFromWasm0(arg1, arg2);
        },
        __wbg_set_view_gpu_texture_view_9b2d86b6b99d9fd9: function(arg0, arg1) {
            getObject(arg0).view = getObject(arg1);
        },
        __wbg_set_view_gpu_texture_view_c0f35f8857c25206: function(arg0, arg1) {
            getObject(arg0).view = getObject(arg1);
        },
        __wbg_set_visibility_9570b037224c4cc2: function(arg0, arg1) {
            getObject(arg0).visibility = arg1 >>> 0;
        },
        __wbg_set_volume_520cdc6b7ada8f76: function(arg0, arg1) {
            getObject(arg0).volume = arg1;
        },
        __wbg_set_width_7ca43f32db1cfe8e: function(arg0, arg1) {
            getObject(arg0).width = arg1 >>> 0;
        },
        __wbg_set_width_87301412247f3343: function(arg0, arg1) {
            getObject(arg0).width = arg1 >>> 0;
        },
        __wbg_set_width_9f685402c2cbee70: function(arg0, arg1) {
            getObject(arg0).width = arg1 >>> 0;
        },
        __wbg_set_write_mask_d45279e56abbfcb5: function(arg0, arg1) {
            getObject(arg0).writeMask = arg1 >>> 0;
        },
        __wbg_set_x_232d24fdc32d8351: function(arg0, arg1) {
            getObject(arg0).x = arg1 >>> 0;
        },
        __wbg_set_x_876d592971db129a: function(arg0, arg1) {
            getObject(arg0).x = arg1 >>> 0;
        },
        __wbg_set_y_18fe375093e59dfb: function(arg0, arg1) {
            getObject(arg0).y = arg1 >>> 0;
        },
        __wbg_set_y_2b1f5ac0dd5586a5: function(arg0, arg1) {
            getObject(arg0).y = arg1 >>> 0;
        },
        __wbg_set_z_ef005d82bc9d24e3: function(arg0, arg1) {
            getObject(arg0).z = arg1 >>> 0;
        },
        __wbg_shaderSource_7d18b5a43a504f5c: function(arg0, arg1, arg2, arg3) {
            getObject(arg0).shaderSource(getObject(arg1), getStringFromWasm0(arg2, arg3));
        },
        __wbg_shaderSource_df5bb6320451f3cd: function(arg0, arg1, arg2, arg3) {
            getObject(arg0).shaderSource(getObject(arg1), getStringFromWasm0(arg2, arg3));
        },
        __wbg_size_211f88d386430781: function(arg0) {
            const ret = getObject(arg0).size;
            return ret;
        },
        __wbg_src_f0e9281991fbd919: function(arg0, arg1) {
            const ret = getObject(arg1).src;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_stack_3b0d974bbf31e44f: function(arg0, arg1) {
            const ret = getObject(arg1).stack;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_static_accessor_GLOBAL_9d53f2689e622ca1: function() {
            const ret = typeof global === 'undefined' ? null : global;
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_static_accessor_GLOBAL_THIS_a1a35cec07001a8a: function() {
            const ret = typeof globalThis === 'undefined' ? null : globalThis;
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_static_accessor_SELF_4c59f6c7ea29a144: function() {
            const ret = typeof self === 'undefined' ? null : self;
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_static_accessor_WINDOW_e70ae9f2eb052253: function() {
            const ret = typeof window === 'undefined' ? null : window;
            return isLikeNone(ret) ? 0 : addHeapObject(ret);
        },
        __wbg_stencilFunc_8f53a5508560354d: function(arg0, arg1, arg2, arg3) {
            getObject(arg0).stencilFunc(arg1 >>> 0, arg2, arg3 >>> 0);
        },
        __wbg_stencilFunc_c7553215f237ee38: function(arg0, arg1, arg2, arg3) {
            getObject(arg0).stencilFunc(arg1 >>> 0, arg2, arg3 >>> 0);
        },
        __wbg_stencilOp_a844a4e9824eee70: function(arg0, arg1, arg2, arg3) {
            getObject(arg0).stencilOp(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0);
        },
        __wbg_stencilOp_e82bd7ea13f18adf: function(arg0, arg1, arg2, arg3) {
            getObject(arg0).stencilOp(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0);
        },
        __wbg_subgroupMaxSize_1527c5f7a8fe91bb: function(arg0) {
            const ret = getObject(arg0).subgroupMaxSize;
            return ret;
        },
        __wbg_subgroupMinSize_d6c5ad4bddc828e9: function(arg0) {
            const ret = getObject(arg0).subgroupMinSize;
            return ret;
        },
        __wbg_submit_ce44115121cd166c: function(arg0, arg1, arg2) {
            getObject(arg0).submit(getArrayJsValueViewFromWasm0(arg1, arg2));
        },
        __wbg_texImage2D_01c22558517ee8db: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            getObject(arg0).texImage2D(arg1 >>> 0, arg2, arg3, arg4 >>> 0, arg5 >>> 0, getObject(arg6));
        }, arguments); },
        __wbg_texImage2D_152e9dcd4bc3a464: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            getObject(arg0).texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, getObject(arg9));
        }, arguments); },
        __wbg_texImage2D_3704db20a16b6c35: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            getObject(arg0).texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, getObject(arg9));
        }, arguments); },
        __wbg_texImage2D_63d0b87d5ebe4a7f: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            getObject(arg0).texImage2D(arg1 >>> 0, arg2, arg3, arg4 >>> 0, arg5 >>> 0, getObject(arg6));
        }, arguments); },
        __wbg_texImage2D_90633e994ded3d2b: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            getObject(arg0).texImage2D(arg1 >>> 0, arg2, arg3, arg4 >>> 0, arg5 >>> 0, getObject(arg6));
        }, arguments); },
        __wbg_texImage2D_ea94e8a2df5f97e2: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            getObject(arg0).texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments); },
        __wbg_texImage2D_facfa039fb461b66: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            getObject(arg0).texImage2D(arg1 >>> 0, arg2, arg3, arg4 >>> 0, arg5 >>> 0, getObject(arg6));
        }, arguments); },
        __wbg_texParameteri_87ebfcefb0af2c50: function(arg0, arg1, arg2, arg3) {
            getObject(arg0).texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
        },
        __wbg_texParameteri_e5ad2054e239066e: function(arg0, arg1, arg2, arg3) {
            getObject(arg0).texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
        },
        __wbg_texStorage2D_bb2a1bd1ab0b9184: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            getObject(arg0).texStorage2D(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
        },
        __wbg_texSubImage2D_3483ba5f10ee42c2: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            getObject(arg0).texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, getObject(arg7));
        }, arguments); },
        __wbg_texSubImage2D_4ca4c3faa4392438: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            getObject(arg0).texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, getObject(arg9));
        }, arguments); },
        __wbg_texSubImage2D_54d18572b1ba74ab: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            getObject(arg0).texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
        }, arguments); },
        __wbg_texSubImage2D_5bebe93724e6ed61: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            getObject(arg0).texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, getObject(arg9));
        }, arguments); },
        __wbg_texSubImage2D_5e1594de0416e9f6: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            getObject(arg0).texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, getObject(arg7));
        }, arguments); },
        __wbg_then_18f476d590e58992: function(arg0, arg1, arg2) {
            const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
            return addHeapObject(ret);
        },
        __wbg_then_47213a40b6aeb86c: function(arg0, arg1) {
            const ret = getObject(arg0).then(getObject(arg1));
            return addHeapObject(ret);
        },
        __wbg_then_ac7b025999b52837: function(arg0, arg1) {
            const ret = getObject(arg0).then(getObject(arg1));
            return addHeapObject(ret);
        },
        __wbg_type_71742b859467fa3c: function(arg0) {
            const ret = getObject(arg0).type;
            return ret;
        },
        __wbg_unconfigure_0a07a0a40de8988d: function(arg0) {
            getObject(arg0).unconfigure();
        },
        __wbg_uniform1f_8c3b3e6e3723fe14: function(arg0, arg1, arg2) {
            getObject(arg0).uniform1f(getObject(arg1), arg2);
        },
        __wbg_uniform1f_d6619faa73c2a45f: function(arg0, arg1, arg2) {
            getObject(arg0).uniform1f(getObject(arg1), arg2);
        },
        __wbg_uniform1fv_11d5842aff79c8a3: function(arg0, arg1, arg2, arg3) {
            getObject(arg0).uniform1fv(getObject(arg1), getArrayF32FromWasm0(arg2, arg3));
        },
        __wbg_uniform1fv_b4b087b4d6e2bb25: function(arg0, arg1, arg2, arg3) {
            getObject(arg0).uniform1fv(getObject(arg1), getArrayF32FromWasm0(arg2, arg3));
        },
        __wbg_uniform1i_14982bb8438243b4: function(arg0, arg1, arg2) {
            getObject(arg0).uniform1i(getObject(arg1), arg2);
        },
        __wbg_uniform1i_cf11d5b364eed1c8: function(arg0, arg1, arg2) {
            getObject(arg0).uniform1i(getObject(arg1), arg2);
        },
        __wbg_uniform1ui_d177882f473d2afc: function(arg0, arg1, arg2) {
            getObject(arg0).uniform1ui(getObject(arg1), arg2 >>> 0);
        },
        __wbg_uniform2f_19fb96222ae72e1a: function(arg0, arg1, arg2, arg3) {
            getObject(arg0).uniform2f(getObject(arg1), arg2, arg3);
        },
        __wbg_uniform2f_44cee47e30b82f96: function(arg0, arg1, arg2, arg3) {
            getObject(arg0).uniform2f(getObject(arg1), arg2, arg3);
        },
        __wbg_uniform2fv_2f06d989ec4b5d8f: function(arg0, arg1, arg2, arg3) {
            getObject(arg0).uniform2fv(getObject(arg1), getArrayF32FromWasm0(arg2, arg3));
        },
        __wbg_uniform2fv_f022309b362a80c3: function(arg0, arg1, arg2, arg3) {
            getObject(arg0).uniform2fv(getObject(arg1), getArrayF32FromWasm0(arg2, arg3));
        },
        __wbg_uniform2i_16e8a2c966614be6: function(arg0, arg1, arg2, arg3) {
            getObject(arg0).uniform2i(getObject(arg1), arg2, arg3);
        },
        __wbg_uniform2i_d353da02172ea38d: function(arg0, arg1, arg2, arg3) {
            getObject(arg0).uniform2i(getObject(arg1), arg2, arg3);
        },
        __wbg_uniform3f_360c1ea4c73cacef: function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).uniform3f(getObject(arg1), arg2, arg3, arg4);
        },
        __wbg_uniform3f_b616f9e06266a25f: function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).uniform3f(getObject(arg1), arg2, arg3, arg4);
        },
        __wbg_uniform4f_f1a670d511b34878: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            getObject(arg0).uniform4f(getObject(arg1), arg2, arg3, arg4, arg5);
        },
        __wbg_uniform4f_f97f3f59af09856f: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            getObject(arg0).uniform4f(getObject(arg1), arg2, arg3, arg4, arg5);
        },
        __wbg_uniformMatrix3fv_f45b91f173d7fbed: function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).uniformMatrix3fv(getObject(arg1), arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
        },
        __wbg_uniformMatrix3fv_feab3f952d705f51: function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).uniformMatrix3fv(getObject(arg1), arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
        },
        __wbg_uniformMatrix3x2fv_ab13f9742e5fcb2f: function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).uniformMatrix3x2fv(getObject(arg1), arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
        },
        __wbg_uniformMatrix4fv_540dc6bf792eba8f: function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).uniformMatrix4fv(getObject(arg1), arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
        },
        __wbg_uniformMatrix4fv_e3dac9dd429d6adc: function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).uniformMatrix4fv(getObject(arg1), arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
        },
        __wbg_uniformMatrix4x3fv_115d029ad3124cef: function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).uniformMatrix4x3fv(getObject(arg1), arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
        },
        __wbg_unmap_adaf93276fdf9aaf: function(arg0) {
            getObject(arg0).unmap();
        },
        __wbg_useProgram_55a3e940abb19137: function(arg0, arg1) {
            getObject(arg0).useProgram(getObject(arg1));
        },
        __wbg_useProgram_e24dadf4c06636f5: function(arg0, arg1) {
            getObject(arg0).useProgram(getObject(arg1));
        },
        __wbg_userAgent_8def8135d886414b: function() { return handleError(function (arg0, arg1) {
            const ret = getObject(arg1).userAgent;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        }, arguments); },
        __wbg_valueOf_41ae57308c1f031c: function(arg0) {
            const ret = getObject(arg0).valueOf();
            return ret;
        },
        __wbg_value_f3625092ee4b37f4: function(arg0) {
            const ret = getObject(arg0).value;
            return addHeapObject(ret);
        },
        __wbg_vertexAttrib4f_6444504b25f4d43e: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            getObject(arg0).vertexAttrib4f(arg1 >>> 0, arg2, arg3, arg4, arg5);
        },
        __wbg_vertexAttrib4f_aad41fe000407191: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            getObject(arg0).vertexAttrib4f(arg1 >>> 0, arg2, arg3, arg4, arg5);
        },
        __wbg_vertexAttribIPointer_ed1c3507e84527e2: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            getObject(arg0).vertexAttribIPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
        },
        __wbg_vertexAttribPointer_39eddea7c20e350c: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            getObject(arg0).vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
        },
        __wbg_vertexAttribPointer_3bc50c0431082f73: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            getObject(arg0).vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
        },
        __wbg_videoFrameToken_6f05524e85fa2b75: function(arg0) {
            const ret = videoFrameToken(getObject(arg0));
            return ret;
        },
        __wbg_videoHeight_e267fd1e74bb1b06: function(arg0) {
            const ret = getObject(arg0).videoHeight;
            return ret;
        },
        __wbg_videoWidth_670b8e775ea04b5d: function(arg0) {
            const ret = getObject(arg0).videoWidth;
            return ret;
        },
        __wbg_viewport_14d947f2faf58e85: function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).viewport(arg1, arg2, arg3, arg4);
        },
        __wbg_viewport_24055b0754803788: function(arg0, arg1, arg2, arg3, arg4) {
            getObject(arg0).viewport(arg1, arg2, arg3, arg4);
        },
        __wbg_warn_410c3261e3c6d686: function(arg0) {
            console.warn(getObject(arg0));
        },
        __wbg_width_f1791280fae1517a: function(arg0) {
            const ret = getObject(arg0).width;
            return ret;
        },
        __wbg_writeTexture_53ba204c494b042c: function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
            getObject(arg0).writeTexture(getObject(arg1), getArrayU8FromWasm0(arg2, arg3), getObject(arg4), getObject(arg5));
        }, arguments); },
        __wbindgen_cast_0000000000000001: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Externref], shim_idx: 1054, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, __wasm_bindgen_func_elem_14195);
            return addHeapObject(ret);
        },
        __wbindgen_cast_0000000000000002: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("Event")], shim_idx: 34, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, __wasm_bindgen_func_elem_5127);
            return addHeapObject(ret);
        },
        __wbindgen_cast_0000000000000003: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("GPUComputePipeline")], shim_idx: 929, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, __wasm_bindgen_func_elem_11150);
            return addHeapObject(ret);
        },
        __wbindgen_cast_0000000000000004: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("GPUDevice")], shim_idx: 929, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, __wasm_bindgen_func_elem_11150_3);
            return addHeapObject(ret);
        },
        __wbindgen_cast_0000000000000005: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("GPUDeviceLostInfo")], shim_idx: 930, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, __wasm_bindgen_func_elem_11151);
            return addHeapObject(ret);
        },
        __wbindgen_cast_0000000000000006: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("GPURenderPipeline")], shim_idx: 929, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, __wasm_bindgen_func_elem_11150_5);
            return addHeapObject(ret);
        },
        __wbindgen_cast_0000000000000007: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("any")], shim_idx: 929, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, __wasm_bindgen_func_elem_11150_6);
            return addHeapObject(ret);
        },
        __wbindgen_cast_0000000000000008: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("undefined")], shim_idx: 929, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, __wasm_bindgen_func_elem_11150_7);
            return addHeapObject(ret);
        },
        __wbindgen_cast_0000000000000009: function(arg0, arg1) {
            // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [], shim_idx: 1037, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
            const ret = makeMutClosure(arg0, arg1, __wasm_bindgen_func_elem_12558);
            return addHeapObject(ret);
        },
        __wbindgen_cast_000000000000000a: function(arg0) {
            // Cast intrinsic for `F64 -> Externref`.
            const ret = arg0;
            return addHeapObject(ret);
        },
        __wbindgen_cast_000000000000000b: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(F32)) -> NamedExternref("Float32Array")`.
            const ret = getArrayF32FromWasm0(arg0, arg1);
            return addHeapObject(ret);
        },
        __wbindgen_cast_000000000000000c: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(I16)) -> NamedExternref("Int16Array")`.
            const ret = getArrayI16FromWasm0(arg0, arg1);
            return addHeapObject(ret);
        },
        __wbindgen_cast_000000000000000d: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(I32)) -> NamedExternref("Int32Array")`.
            const ret = getArrayI32FromWasm0(arg0, arg1);
            return addHeapObject(ret);
        },
        __wbindgen_cast_000000000000000e: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(I8)) -> NamedExternref("Int8Array")`.
            const ret = getArrayI8FromWasm0(arg0, arg1);
            return addHeapObject(ret);
        },
        __wbindgen_cast_000000000000000f: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(U16)) -> NamedExternref("Uint16Array")`.
            const ret = getArrayU16FromWasm0(arg0, arg1);
            return addHeapObject(ret);
        },
        __wbindgen_cast_0000000000000010: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(U32)) -> NamedExternref("Uint32Array")`.
            const ret = getArrayU32FromWasm0(arg0, arg1);
            return addHeapObject(ret);
        },
        __wbindgen_cast_0000000000000011: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(U8)) -> NamedExternref("Uint8Array")`.
            const ret = getArrayU8FromWasm0(arg0, arg1);
            return addHeapObject(ret);
        },
        __wbindgen_cast_0000000000000012: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return addHeapObject(ret);
        },
        __wbindgen_cast_0000000000000013: function(arg0) {
            // Cast intrinsic for `U64 -> Externref`.
            const ret = BigInt.asUintN(64, arg0);
            return addHeapObject(ret);
        },
        __wbindgen_cast_0000000000000014: function(arg0, arg1) {
            var v0 = getArrayU8FromWasm0(arg0, arg1).slice();
            wasm.__wbindgen_export4(arg0, arg1 * 1, 1);
            // Cast intrinsic for `Vector(U8) -> Externref`.
            const ret = v0;
            return addHeapObject(ret);
        },
        __wbindgen_object_clone_ref: function(arg0) {
            const ret = getObject(arg0);
            return addHeapObject(ret);
        },
        __wbindgen_object_drop_ref: function(arg0) {
            takeObject(arg0);
        },
    };
    return {
        __proto__: null,
        "./hana_bg.js": import0,
    };
}

function __wasm_bindgen_func_elem_12558(arg0, arg1) {
    wasm.__wasm_bindgen_func_elem_12558(arg0, arg1);
}

function __wasm_bindgen_func_elem_5127(arg0, arg1, arg2) {
    wasm.__wasm_bindgen_func_elem_5127(arg0, arg1, addHeapObject(arg2));
}

function __wasm_bindgen_func_elem_11151(arg0, arg1, arg2) {
    wasm.__wasm_bindgen_func_elem_11151(arg0, arg1, addHeapObject(arg2));
}

function __wasm_bindgen_func_elem_14195(arg0, arg1, arg2) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.__wasm_bindgen_func_elem_14195(retptr, arg0, arg1, addHeapObject(arg2));
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        if (r1) {
            throw takeObject(r0);
        }
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

function __wasm_bindgen_func_elem_11150(arg0, arg1, arg2) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.__wasm_bindgen_func_elem_11150(retptr, arg0, arg1, addHeapObject(arg2));
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        if (r1) {
            throw takeObject(r0);
        }
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

function __wasm_bindgen_func_elem_11150_3(arg0, arg1, arg2) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.__wasm_bindgen_func_elem_11150_3(retptr, arg0, arg1, addHeapObject(arg2));
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        if (r1) {
            throw takeObject(r0);
        }
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

function __wasm_bindgen_func_elem_11150_5(arg0, arg1, arg2) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.__wasm_bindgen_func_elem_11150_5(retptr, arg0, arg1, addHeapObject(arg2));
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        if (r1) {
            throw takeObject(r0);
        }
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

function __wasm_bindgen_func_elem_11150_6(arg0, arg1, arg2) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.__wasm_bindgen_func_elem_11150_6(retptr, arg0, arg1, addHeapObject(arg2));
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        if (r1) {
            throw takeObject(r0);
        }
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

function __wasm_bindgen_func_elem_11150_7(arg0, arg1, arg2) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.__wasm_bindgen_func_elem_11150_7(retptr, arg0, arg1, addHeapObject(arg2));
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        if (r1) {
            throw takeObject(r0);
        }
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

function __wasm_bindgen_func_elem_14197(arg0, arg1, arg2, arg3) {
    wasm.__wasm_bindgen_func_elem_14197(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}


const __wbindgen_enum_GpuAddressMode = ["clamp-to-edge", "repeat", "mirror-repeat"];


const __wbindgen_enum_GpuAutoLayoutMode = ["auto"];


const __wbindgen_enum_GpuBlendFactor = ["zero", "one", "src", "one-minus-src", "src-alpha", "one-minus-src-alpha", "dst", "one-minus-dst", "dst-alpha", "one-minus-dst-alpha", "src-alpha-saturated", "constant", "one-minus-constant", "src1", "one-minus-src1", "src1-alpha", "one-minus-src1-alpha"];


const __wbindgen_enum_GpuBlendOperation = ["add", "subtract", "reverse-subtract", "min", "max"];


const __wbindgen_enum_GpuBufferBindingType = ["uniform", "storage", "read-only-storage"];


const __wbindgen_enum_GpuCanvasAlphaMode = ["opaque", "premultiplied"];


const __wbindgen_enum_GpuCanvasToneMappingMode = ["standard", "extended"];


const __wbindgen_enum_GpuCompareFunction = ["never", "less", "equal", "less-equal", "greater", "not-equal", "greater-equal", "always"];


const __wbindgen_enum_GpuCullMode = ["none", "front", "back"];


const __wbindgen_enum_GpuDeviceLostReason = ["unknown", "destroyed"];


const __wbindgen_enum_GpuErrorFilter = ["validation", "out-of-memory", "internal"];


const __wbindgen_enum_GpuFilterMode = ["nearest", "linear"];


const __wbindgen_enum_GpuFrontFace = ["ccw", "cw"];


const __wbindgen_enum_GpuIndexFormat = ["uint16", "uint32"];


const __wbindgen_enum_GpuLoadOp = ["load", "clear"];


const __wbindgen_enum_GpuMipmapFilterMode = ["nearest", "linear"];


const __wbindgen_enum_GpuPowerPreference = ["low-power", "high-performance"];


const __wbindgen_enum_GpuPrimitiveTopology = ["point-list", "line-list", "line-strip", "triangle-list", "triangle-strip"];


const __wbindgen_enum_GpuQueryType = ["occlusion", "timestamp"];


const __wbindgen_enum_GpuSamplerBindingType = ["filtering", "non-filtering", "comparison"];


const __wbindgen_enum_GpuStencilOperation = ["keep", "zero", "replace", "invert", "increment-clamp", "decrement-clamp", "increment-wrap", "decrement-wrap"];


const __wbindgen_enum_GpuStorageTextureAccess = ["write-only", "read-only", "read-write"];


const __wbindgen_enum_GpuStoreOp = ["store", "discard"];


const __wbindgen_enum_GpuTextureAspect = ["all", "stencil-only", "depth-only"];


const __wbindgen_enum_GpuTextureDimension = ["1d", "2d", "3d"];


const __wbindgen_enum_GpuTextureFormat = ["r8unorm", "r8snorm", "r8uint", "r8sint", "r16unorm", "r16snorm", "r16uint", "r16sint", "r16float", "rg8unorm", "rg8snorm", "rg8uint", "rg8sint", "r32uint", "r32sint", "r32float", "rg16unorm", "rg16snorm", "rg16uint", "rg16sint", "rg16float", "rgba8unorm", "rgba8unorm-srgb", "rgba8snorm", "rgba8uint", "rgba8sint", "bgra8unorm", "bgra8unorm-srgb", "rgb9e5ufloat", "rgb10a2uint", "rgb10a2unorm", "rg11b10ufloat", "rg32uint", "rg32sint", "rg32float", "rgba16unorm", "rgba16snorm", "rgba16uint", "rgba16sint", "rgba16float", "rgba32uint", "rgba32sint", "rgba32float", "stencil8", "depth16unorm", "depth24plus", "depth24plus-stencil8", "depth32float", "depth32float-stencil8", "bc1-rgba-unorm", "bc1-rgba-unorm-srgb", "bc2-rgba-unorm", "bc2-rgba-unorm-srgb", "bc3-rgba-unorm", "bc3-rgba-unorm-srgb", "bc4-r-unorm", "bc4-r-snorm", "bc5-rg-unorm", "bc5-rg-snorm", "bc6h-rgb-ufloat", "bc6h-rgb-float", "bc7-rgba-unorm", "bc7-rgba-unorm-srgb", "etc2-rgb8unorm", "etc2-rgb8unorm-srgb", "etc2-rgb8a1unorm", "etc2-rgb8a1unorm-srgb", "etc2-rgba8unorm", "etc2-rgba8unorm-srgb", "eac-r11unorm", "eac-r11snorm", "eac-rg11unorm", "eac-rg11snorm", "astc-4x4-unorm", "astc-4x4-unorm-srgb", "astc-5x4-unorm", "astc-5x4-unorm-srgb", "astc-5x5-unorm", "astc-5x5-unorm-srgb", "astc-6x5-unorm", "astc-6x5-unorm-srgb", "astc-6x6-unorm", "astc-6x6-unorm-srgb", "astc-8x5-unorm", "astc-8x5-unorm-srgb", "astc-8x6-unorm", "astc-8x6-unorm-srgb", "astc-8x8-unorm", "astc-8x8-unorm-srgb", "astc-10x5-unorm", "astc-10x5-unorm-srgb", "astc-10x6-unorm", "astc-10x6-unorm-srgb", "astc-10x8-unorm", "astc-10x8-unorm-srgb", "astc-10x10-unorm", "astc-10x10-unorm-srgb", "astc-12x10-unorm", "astc-12x10-unorm-srgb", "astc-12x12-unorm", "astc-12x12-unorm-srgb"];


const __wbindgen_enum_GpuTextureSampleType = ["float", "unfilterable-float", "depth", "sint", "uint"];


const __wbindgen_enum_GpuTextureViewDimension = ["1d", "2d", "2d-array", "cube", "cube-array", "3d"];


const __wbindgen_enum_GpuVertexFormat = ["uint8", "uint8x2", "uint8x4", "sint8", "sint8x2", "sint8x4", "unorm8", "unorm8x2", "unorm8x4", "snorm8", "snorm8x2", "snorm8x4", "uint16", "uint16x2", "uint16x4", "sint16", "sint16x2", "sint16x4", "unorm16", "unorm16x2", "unorm16x4", "snorm16", "snorm16x2", "snorm16x4", "float16", "float16x2", "float16x4", "float32", "float32x2", "float32x3", "float32x4", "uint32", "uint32x2", "uint32x3", "uint32x4", "sint32", "sint32x2", "sint32x3", "sint32x4", "unorm10-10-10-2", "unorm8x4-bgra"];


const __wbindgen_enum_GpuVertexStepMode = ["vertex", "instance"];


const __wbindgen_enum_RequestMode = ["same-origin", "no-cors", "cors", "navigate"];
const DeviceLostPromiseFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_devicelostpromise_free(ptr, 1));
const EngineFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_engine_free(ptr, 1));
const PixelReadPromiseFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_pixelreadpromise_free(ptr, 1));
const SceneControllerFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_scenecontroller_free(ptr, 1));

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => wasm.__wbindgen_export5(state.a, state.b));

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function dropObject(idx) {
    if (idx < 1028) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayF64FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat64ArrayMemory0().subarray(ptr / 8, ptr / 8 + len);
}

function getArrayI16FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt16ArrayMemory0().subarray(ptr / 2, ptr / 2 + len);
}

function getArrayI32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayI8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(takeObject(mem.getUint32(i, true)));
    }
    return result;
}

function getArrayJsValueViewFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(getObject(mem.getUint32(i, true)));
    }
    return result;
}

function getArrayU16FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint16ArrayMemory0().subarray(ptr / 2, ptr / 2 + len);
}

function getArrayU32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

let cachedFloat32ArrayMemory0 = null;
function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

let cachedFloat64ArrayMemory0 = null;
function getFloat64ArrayMemory0() {
    if (cachedFloat64ArrayMemory0 === null || cachedFloat64ArrayMemory0.byteLength === 0) {
        cachedFloat64ArrayMemory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64ArrayMemory0;
}

let cachedInt16ArrayMemory0 = null;
function getInt16ArrayMemory0() {
    if (cachedInt16ArrayMemory0 === null || cachedInt16ArrayMemory0.byteLength === 0) {
        cachedInt16ArrayMemory0 = new Int16Array(wasm.memory.buffer);
    }
    return cachedInt16ArrayMemory0;
}

let cachedInt32ArrayMemory0 = null;
function getInt32ArrayMemory0() {
    if (cachedInt32ArrayMemory0 === null || cachedInt32ArrayMemory0.byteLength === 0) {
        cachedInt32ArrayMemory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32ArrayMemory0;
}

let cachedInt8ArrayMemory0 = null;
function getInt8ArrayMemory0() {
    if (cachedInt8ArrayMemory0 === null || cachedInt8ArrayMemory0.byteLength === 0) {
        cachedInt8ArrayMemory0 = new Int8Array(wasm.memory.buffer);
    }
    return cachedInt8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    return decodeText(ptr >>> 0, len);
}

let cachedUint16ArrayMemory0 = null;
function getUint16ArrayMemory0() {
    if (cachedUint16ArrayMemory0 === null || cachedUint16ArrayMemory0.byteLength === 0) {
        cachedUint16ArrayMemory0 = new Uint16Array(wasm.memory.buffer);
    }
    return cachedUint16ArrayMemory0;
}

let cachedUint32ArrayMemory0 = null;
function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getObject(idx) { return heap[idx]; }

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_export3(addHeapObject(e));
    }
}

let heap = new Array(1024).fill(undefined);
heap.push(undefined, null, true, false);

let heap_next = heap.length;

function isLikeNone(x) {
    return x === undefined || x === null;
}

function makeMutClosure(arg0, arg1, f) {
    const state = { a: arg0, b: arg1, cnt: 1 };
    const real = (...args) => {

        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            state.a = a;
            real._wbg_cb_unref();
        }
    };
    real._wbg_cb_unref = () => {
        if (--state.cnt === 0) {
            wasm.__wbindgen_export5(state.a, state.b);
            state.a = 0;
            CLOSURE_DTORS.unregister(state);
        }
    };
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    const mem = getDataViewMemory0();
    for (let i = 0; i < array.length; i++) {
        mem.setUint32(ptr + 4 * i, addHeapObject(array[i]), true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let stack_pointer = 1024;

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasmInstance, wasm;
function __wbg_finalize_init(instance, module) {
    wasmInstance = instance;
    wasm = instance.exports;
    wasmModule = module;
    cachedDataViewMemory0 = null;
    cachedFloat32ArrayMemory0 = null;
    cachedFloat64ArrayMemory0 = null;
    cachedInt16ArrayMemory0 = null;
    cachedInt32ArrayMemory0 = null;
    cachedInt8ArrayMemory0 = null;
    cachedUint16ArrayMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = module.ok && expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL(/* @vite-ignore */ 'hana-ui.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
