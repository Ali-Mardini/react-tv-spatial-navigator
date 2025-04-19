import React, { createContext, useRef } from 'react';
import { View, ViewProps } from 'react-native';

interface RootContextProps {
  registerNode: (id: string, ref: React.RefObject<any>) => void;
  unregisterNode: (id: string) => void;
  focusNode: (id: string) => void;
}

export const SpatialContext = createContext<RootContextProps | null>(null);

export const SpatialNavigationRoot: React.FC<ViewProps> = ({ children, ...props }) => {
  const nodes = useRef(new Map<string, React.RefObject<any>>());

  const value = {
    registerNode: (id: string, ref: React.RefObject<any>) => nodes.current.set(id, ref),
    unregisterNode: (id: string) => nodes.current.delete(id),
    focusNode: (id: string) => {
      const target = nodes.current.get(id);
      if (target?.current?.focus) target.current.focus();
    }
  };

  return (
    <SpatialContext.Provider value={value}>
      <View {...props}>{children}</View>
    </SpatialContext.Provider>
  );
};