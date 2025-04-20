import React from 'react';
import { ScrollViewProps } from 'react-native';
/**
 * A horizontal ScrollView that:
 *  - On Android TV, always renders a flex‑row View (no native scroll content view)
 *  - Otherwise, renders a ScrollView and pages by container width via TV key events
 */
export declare const SpatialNavigationScrollView: React.FC<ScrollViewProps>;
