import React from 'react';
import { ViewProps, StyleProp, ViewStyle } from 'react-native';
export interface NodeProps extends ViewProps {
    /** Unique ID for this node */
    nodeId: string;
    /** Extra style to apply when focused */
    focusStyle?: StyleProp<ViewStyle>;
}
export declare const SpatialNavigationNode: React.FC<NodeProps>;
