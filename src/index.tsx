// src/index.ts
declare const global: any;
if (typeof global.setImmediate === 'undefined') {
  global.setImmediate = (fn: (...args: any[]) => void, ...args: any[]) =>
    setTimeout(fn, 0, ...args);
}

import React from 'react';
import { Platform, View, ScrollView, ViewProps, ScrollViewProps } from 'react-native';

// TV‑only implementations:
import { SpatialNavigationRoot as TVRoot } from './SpatialNavigationRoot';
import { SpatialNavigationNode as TVNode } from './SpatialNavigationNode';
import { SpatialNavigationScrollView as TVScroll } from './SpatialNavigationScrollView';
import { useSpatialNavigator as useTVNavigator } from './useSpatialNavigator';

export * from './types';

// Fallback implementations for non‑TV
const isTV = Platform.isTV;

export const SpatialNavigationRoot = isTV
  ? TVRoot
  : ((props: ViewProps) => <View {...props} />);

export const SpatialNavigationNode = isTV
  ? TVNode
  : ((props: ViewProps & { nodeId?: string }) => <View {...props} />);

export const SpatialNavigationScrollView = isTV
  ? TVScroll
  : ((props: ScrollViewProps) => <ScrollView {...props} />);

export function useSpatialNavigator() {
  if (isTV) {
    return useTVNavigator();
  }
  // no‑ops for non‑TV
  return {
    registerNode: (_id: string, _ref: any) => {},
    unregisterNode: (_id: string) => {},
    focusNode: (_id: string) => {},
  };
}
