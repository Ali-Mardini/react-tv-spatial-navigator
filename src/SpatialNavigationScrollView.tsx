// src/SpatialNavigationScrollView.tsx
import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Platform,
  ScrollView,
  ScrollViewProps,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent,
} from 'react-native';
import TVEventHandler from './TVEventHandler'; // your constructable wrapper

/**
 * A horizontal ScrollView that:
 *  - On Android TV, always renders a flex‑row View (no native scroll content view)
 *  - Otherwise, renders a ScrollView and pages by container width via TV key events
 */
export const SpatialNavigationScrollView: React.FC<ScrollViewProps> = ({
  children,
  onScroll,
  onLayout,
  style,
  ...props
}) => {
  // === ANDROID TV FALLBACK ===
  if (Platform.OS === 'android' && Platform.isTV) {
    return (
      <View style={[{ flexDirection: 'row' }, style]}>
        {children}
      </View>
    );
  }

  // === REAL SCROLLVIEW + TV EVENT HANDLER ===
  const scrollRef = useRef<ScrollView>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);

  const handleTVEvent = (_cmp: any, evt: { eventType?: string }) => {
    if (!evt?.eventType) return;
    let target = scrollOffset;
    if (evt.eventType === 'right') target += containerWidth;
    else if (evt.eventType === 'left') target -= containerWidth;
    scrollRef.current?.scrollTo({ x: target, animated: true });
  };

  useEffect(() => {
    if (!Platform.isTV) return;
    const handler = new TVEventHandler();
    handler.enable(null, handleTVEvent);
    return () => handler.disable();
  }, [containerWidth, scrollOffset]);

  const onScrollInternal = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollOffset(e.nativeEvent.contentOffset.x);
    onScroll?.(e);
  };

  const onLayoutInternal = (e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
    onLayout?.(e);
  };

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      scrollEventThrottle={16}
      onScroll={onScrollInternal}
      onLayout={onLayoutInternal}
      style={style}
      {...props}
    >
      {children}
    </ScrollView>
  );
};
