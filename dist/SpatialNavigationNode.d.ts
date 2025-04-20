import React from 'react';
import { StyleProp, ViewStyle, ViewProps } from 'react-native';
export interface NodeProps extends ViewProps {
    /** Unique ID for this node */
    nodeId: string;
    /** Style applied when the node is focused */
    focusStyle?: StyleProp<ViewStyle>;
}
/**
 * A focusable node component that:
 *  - Registers itself in the SpatialContext
 *  - Scales up, adds a shadow and merges in `focusStyle` when focused on TV
 *  - Falls back to a plain View on non-TV platforms
 */
export declare const SpatialNavigationNode: React.FC<NodeProps>;
