import React from 'react';
import { ViewProps, ScrollViewProps } from 'react-native';
export * from './types';
export declare const SpatialNavigationRoot: React.FC<import("./SpatialNavigationRoot").SpatialNavigationRootProps> | ((props: ViewProps) => React.JSX.Element);
export declare const SpatialNavigationNode: React.FC<import("./SpatialNavigationNode").NodeProps> | ((props: ViewProps & {
    nodeId?: string;
}) => React.JSX.Element);
export declare const SpatialNavigationScrollView: React.FC<ScrollViewProps> | ((props: ScrollViewProps) => React.JSX.Element);
export declare function useSpatialNavigator(): import("./SpatialNavigationRoot").RootContextProps | {
    registerNode: (_id: string, _ref: any) => void;
    unregisterNode: (_id: string) => void;
    focusNode: (_id: string) => void;
};
