import React, { createContext, useEffect, useState } from 'react';
import { View, ViewProps, Platform, useTVEventHandler } from 'react-native';

export interface RootContextProps {
  registerNode: (id: string, ref: React.RefObject<any>) => void;
  unregisterNode: (id: string) => void;
  focusNode: (id: string) => void;
  focusedNode: string | null;
}

export const SpatialContext = createContext<RootContextProps | null>(null);

export interface SpatialNavigationRootProps extends ViewProps {}

export const SpatialNavigationRoot: React.FC<SpatialNavigationRootProps> = ({
  children,
  style,
  ...props
}) => {
  const [nodes, setNodes] = useState<Map<string, React.RefObject<any>>>(new Map());
  const [focusedNode, setFocusedNode] = useState<string | null>(null);

  const registerNode = (id: string, ref: React.RefObject<any>) => {
    setNodes((prev) => new Map(prev).set(id, ref));
  };

  const unregisterNode = (id: string) => {
    setNodes((prev) => {
      const copy = new Map(prev);
      copy.delete(id);
      return copy;
    });
  };

  const focusNode = (id: string) => {
    const ref = nodes.get(id);
    if (ref?.current && typeof ref.current.focus === 'function') {
      ref.current.focus();
      setFocusedNode(id);
    }
  };

  // Handle left/right (or up/down) to move focus in registration order
  const handleTVEvent = (event: { eventType?: string }) => {
      if (!Platform.isTV || !event.eventType || !focusedNode) return;
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

  return (
    <SpatialContext.Provider
      value={{ registerNode, unregisterNode, focusNode, focusedNode }}
    >
      <View style={style} {...props}>
        {children}
      </View>
    </SpatialContext.Provider>
  );
};
