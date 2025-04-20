// src/SpatialNavigationScrollView.tsx
import React, { useRef, useEffect, useState } from 'react';
import { View, Platform, ScrollView, } from 'react-native';
import TVEventHandler from './TVEventHandler'; // your constructable wrapper
/**
 * A horizontal ScrollView that:
 *  - On Android TV, always renders a flex‑row View (no native scroll content view)
 *  - Otherwise, renders a ScrollView and pages by container width via TV key events
 */
export const SpatialNavigationScrollView = ({ children, onScroll, onLayout, style, ...props }) => {
    // === ANDROID TV FALLBACK ===
    if (Platform.OS === 'android' && Platform.isTV) {
        return (React.createElement(View, { style: [{ flexDirection: 'row' }, style] }, children));
    }
    // === REAL SCROLLVIEW + TV EVENT HANDLER ===
    const scrollRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [scrollOffset, setScrollOffset] = useState(0);
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
    useEffect(() => {
        if (!Platform.isTV)
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
    return (React.createElement(ScrollView, { ref: scrollRef, horizontal: true, scrollEventThrottle: 16, onScroll: onScrollInternal, onLayout: onLayoutInternal, style: style, ...props }, children));
};
