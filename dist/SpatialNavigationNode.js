import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Platform, } from 'react-native';
import { SpatialContext } from './SpatialNavigationRoot';
export const SpatialNavigationNode = ({ nodeId, children, style, focusStyle, ...props }) => {
    const ref = useRef(null);
    const ctx = useContext(SpatialContext);
    const [isFocused, setIsFocused] = useState(false);
    useEffect(() => {
        ctx === null || ctx === void 0 ? void 0 : ctx.registerNode(nodeId, ref);
        return () => ctx === null || ctx === void 0 ? void 0 : ctx.unregisterNode(nodeId);
    }, [nodeId]);
    // Non‑TV: just render a plain View
    if (!Platform.isTV) {
        return (React.createElement(View, { ref: ref, style: style, ...props }, children));
    }
    // TV: make it focusable and apply visuals on focus
    return (React.createElement(View, { ref: ref, focusable: true, style: [
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
