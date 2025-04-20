import React, { createContext, useRef } from 'react';
import { View } from 'react-native';
export const SpatialContext = createContext(null);
export const SpatialNavigationRoot = ({ children, ...props }) => {
    const nodes = useRef(new Map());
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
        React.createElement(View, { ...props }, children)));
};
