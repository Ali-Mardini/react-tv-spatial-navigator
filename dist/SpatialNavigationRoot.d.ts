import React from 'react';
import { ViewProps } from 'react-native';
export interface RootContextProps {
    registerNode: (id: string, ref: React.RefObject<any>) => void;
    unregisterNode: (id: string) => void;
    focusNode: (id: string) => void;
}
export declare const SpatialContext: React.Context<RootContextProps | null>;
export declare const SpatialNavigationRoot: React.FC<ViewProps>;
