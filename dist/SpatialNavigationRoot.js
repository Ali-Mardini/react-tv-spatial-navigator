import React, { createContext, useEffect, useState } from 'react';
import { View, Platform, useTVEventHandler } from 'react-native';
export const SpatialContext = createContext(null);
export const SpatialNavigationRoot = ({ children, style, ...props }) => {
    const [nodes, setNodes] = useState(new Map());
    const [focusedNode, setFocusedNode] = useState(null);
    const registerNode = (id, ref) => {
        setNodes((prev) => new Map(prev).set(id, ref));
    };
    const unregisterNode = (id) => {
        setNodes((prev) => {
            const copy = new Map(prev);
            copy.delete(id);
            return copy;
        });
    };
    const focusNode = (id) => {
        const ref = nodes.get(id);
        if ((ref === null || ref === void 0 ? void 0 : ref.current) && typeof ref.current.focus === 'function') {
            ref.current.focus();
            setFocusedNode(id);
        }
    };
    // Handle left/right (or up/down) to move focus in registration order
    const handleTVEvent = (event) => {
        if (!Platform.isTV || !event.eventType || !focusedNode)
            return;
        const ids = Array.from(nodes.keys());
        const idx = ids.indexOf(focusedNode);
        let nextIndex = idx;
        switch (event.eventType) {
            case 'right':
            case 'down':
                nextIndex = (idx + 1) % ids.length;
                break;
            case 'left':
            case 'up':
                nextIndex = (idx - 1 + ids.length) % ids.length;
                break;
            default:
                return;
        }
        focusNode(ids[nextIndex]);
    };
    // Wire up the TV remote events
    useTVEventHandler(handleTVEvent);
    // Optionally auto-focus the first node when it appears
    useEffect(() => {
        if (!focusedNode && nodes.size > 0) {
            const firstNode = nodes.keys().next().value;
            if (firstNode) {
                focusNode(firstNode);
            }
        }
    }, [nodes]);
    return (React.createElement(SpatialContext.Provider, { value: { registerNode, unregisterNode, focusNode, focusedNode } },
        React.createElement(View, { style: style, ...props }, children)));
};
