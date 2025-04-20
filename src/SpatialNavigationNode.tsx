// src/SpatialNavigationNode.tsx
import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, StyleProp, ViewStyle, ViewProps, Platform } from 'react-native';
import { SpatialContext } from './SpatialNavigationRoot';

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
export const SpatialNavigationNode: React.FC<NodeProps> = ({
  nodeId,
  children,
  style,
  focusStyle,
  ...props
}) => {
  const ref = useRef<View>(null);
  const ctx = useContext(SpatialContext);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    ctx?.registerNode(nodeId, ref);
    return () => ctx?.unregisterNode(nodeId);
  }, [nodeId, ctx]);

  // Non-TV: just render a regular View
  if (!Platform.isTV) {
    return (
      <View ref={ref} style={style} {...props}>
        {children}
      </View>
    );
  }

  // TV: make the View focusable and style on focus
  return (
    <View
      ref={ref}
      focusable={true}
      style={[
        style,
        isFocused && focusStyle,
        {
          transform: [{ scale: isFocused ? 1.05 : 1 }],
          shadowColor: '#000',
          shadowOpacity: isFocused ? 0.3 : 0,
          shadowRadius: isFocused ? 5 : 0,
          shadowOffset: { width: 0, height: 2 },
        },
      ]}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    >
      {children}
    </View>
  );
};
