import { useContext } from 'react';
import { SpatialContext } from './SpatialNavigationRoot';

export function useSpatialNavigator() {
  const ctx = useContext(SpatialContext);
  if (!ctx) throw new Error('useSpatialNavigator must be used within SpatialNavigationRoot');
  return ctx;
}
