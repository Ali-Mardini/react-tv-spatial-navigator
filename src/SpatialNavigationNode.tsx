import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  ViewProps,
  StyleProp,
  ViewStyle,
  Platform,
} from 'react-native';
import { SpatialContext } from './SpatialNavigationRoot';

export interface NodeProps extends ViewProps {
  /** Unique ID for this node */
  nodeId: string;
  /** Extra style to apply when focused */
  focusStyle?: StyleProp<ViewStyle>;
}

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
  }, [nodeId]);

  // Non‑TV: just render a plain View
  if (!Platform.isTV) {
    return (
      <View ref={ref} style={style} {...props}>
        {children}
      </View>
    );
  }

  // TV: make it focusable and apply visuals on focus
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
