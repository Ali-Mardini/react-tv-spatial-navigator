'use strict';

var React = require('react');
var reactNative = require('react-native');

const SpatialContext = React.createContext(null);
const SpatialNavigationRoot$1 = ({ children, ...props }) => {
    const nodes = React.useRef(new Map());
    const value = {
        registerNode: (id, ref) => nodes.current.set(id, ref),
        unregisterNode: (id) => nodes.current.delete(id),
        focusNode: (id) => {
            var _a;
            const target = nodes.current.get(id);
            if ((_a = target === null || target === void 0 ? void 0 : target.current) === null || _a === void 0 ? void 0 : _a.focus)
                target.current.focus();
        }
    };
    return (React.createElement(SpatialContext.Provider, { value: value },
        React.createElement(reactNative.View, { ...props }, children)));
};

// src/SpatialNavigationNode.tsx
/**
 * A focusable node component that:
 *  - Registers itself in the SpatialContext
 *  - Scales up, adds a shadow and merges in `focusStyle` when focused on TV
 *  - Falls back to a plain View on non-TV platforms
 */
const SpatialNavigationNode$1 = ({ nodeId, children, style, focusStyle, ...props }) => {
    const ref = React.useRef(null);
    const ctx = React.useContext(SpatialContext);
    const [isFocused, setIsFocused] = React.useState(false);
    React.useEffect(() => {
        ctx === null || ctx === void 0 ? void 0 : ctx.registerNode(nodeId, ref);
        return () => ctx === null || ctx === void 0 ? void 0 : ctx.unregisterNode(nodeId);
    }, [nodeId, ctx]);
    // Non-TV: just render a regular View
    if (!reactNative.Platform.isTV) {
        return (React.createElement(reactNative.View, { ref: ref, style: style, ...props }, children));
    }
    // TV: make the View focusable and style on focus
    return (React.createElement(reactNative.View, { ref: ref, focusable: true, style: [
            style,
            isFocused && focusStyle,
            {
                transform: [{ scale: isFocused ? 1.05 : 1 }],
                shadowColor: '#000',
                shadowOpacity: isFocused ? 0.3 : 0,
                shadowRadius: isFocused ? 5 : 0,
                shadowOffset: { width: 0, height: 2 },
            },
        ], onFocus: () => setIsFocused(true), onBlur: () => setIsFocused(false), ...props }, children));
};

// src/TVEventHandler.ts
const { TVEventHandler: TVEventHandlerModule } = reactNative.NativeModules;
/**
 * A thin wrapper that *is* constructable, wrapping the native TVEventHandler
 */
class TVEventHandler {
    constructor() {
        this.subscription = null;
    }
    enable(component, callback) {
        if (!TVEventHandlerModule) {
            console.warn('TVEventHandler native module not available');
            return;
        }
        const emitter = new reactNative.NativeEventEmitter(TVEventHandlerModule);
        this.subscription = emitter.addListener('onHWKeyEvent', (event) => {
            callback(component, event);
        });
    }
    disable() {
        var _a;
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.remove();
        this.subscription = null;
    }
}

// src/SpatialNavigationScrollView.tsx
/**
 * A horizontal ScrollView that:
 *  - On Android TV, always renders a flex‑row View (no native scroll content view)
 *  - Otherwise, renders a ScrollView and pages by container width via TV key events
 */
const SpatialNavigationScrollView$1 = ({ children, onScroll, onLayout, style, ...props }) => {
    // === ANDROID TV FALLBACK ===
    if (reactNative.Platform.OS === 'android' && reactNative.Platform.isTV) {
        return (React.createElement(reactNative.View, { style: [{ flexDirection: 'row' }, style] }, children));
    }
    // === REAL SCROLLVIEW + TV EVENT HANDLER ===
    const scrollRef = React.useRef(null);
    const [containerWidth, setContainerWidth] = React.useState(0);
    const [scrollOffset, setScrollOffset] = React.useState(0);
    const handleTVEvent = (_cmp, evt) => {
        var _a;
        if (!(evt === null || evt === void 0 ? void 0 : evt.eventType))
            return;
        let target = scrollOffset;
        if (evt.eventType === 'right')
            target += containerWidth;
        else if (evt.eventType === 'left')
            target -= containerWidth;
        (_a = scrollRef.current) === null || _a === void 0 ? void 0 : _a.scrollTo({ x: target, animated: true });
    };
    React.useEffect(() => {
        if (!reactNative.Platform.isTV)
            return;
        const handler = new TVEventHandler();
        handler.enable(null, handleTVEvent);
        return () => handler.disable();
    }, [containerWidth, scrollOffset]);
    const onScrollInternal = (e) => {
        setScrollOffset(e.nativeEvent.contentOffset.x);
        onScroll === null || onScroll === void 0 ? void 0 : onScroll(e);
    };
    const onLayoutInternal = (e) => {
        setContainerWidth(e.nativeEvent.layout.width);
        onLayout === null || onLayout === void 0 ? void 0 : onLayout(e);
    };
    return (React.createElement(reactNative.ScrollView, { ref: scrollRef, horizontal: true, scrollEventThrottle: 16, onScroll: onScrollInternal, onLayout: onLayoutInternal, style: style, ...props }, children));
};

function useSpatialNavigator$1() {
    const ctx = React.useContext(SpatialContext);
    if (!ctx)
        throw new Error('useSpatialNavigator must be used within SpatialNavigationRoot');
    return ctx;
}

if (typeof global.setImmediate === 'undefined') {
    global.setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args);
}
// Fallback implementations for non‑TV
const isTV = reactNative.Platform.isTV;
const SpatialNavigationRoot = isTV
    ? SpatialNavigationRoot$1
    : ((props) => React.createElement(reactNative.View, { ...props }));
const SpatialNavigationNode = isTV
    ? SpatialNavigationNode$1
    : ((props) => React.createElement(reactNative.View, { ...props }));
const SpatialNavigationScrollView = isTV
    ? SpatialNavigationScrollView$1
    : ((props) => React.createElement(reactNative.ScrollView, { ...props }));
function useSpatialNavigator() {
    if (isTV) {
        return useSpatialNavigator$1();
    }
    // no‑ops for non‑TV
    return {
        registerNode: (_id, _ref) => { },
        unregisterNode: (_id) => { },
        focusNode: (_id) => { },
    };
}

exports.SpatialNavigationNode = SpatialNavigationNode;
exports.SpatialNavigationRoot = SpatialNavigationRoot;
exports.SpatialNavigationScrollView = SpatialNavigationScrollView;
exports.useSpatialNavigator = useSpatialNavigator;
//# sourceMappingURL=index.js.map
