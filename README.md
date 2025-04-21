# react-tv-spatial-navigator

A lightweight spatial navigation library for React Native & Expo TV apps.  
Provides easy D‑pad / remote control focus management and paging scroll views on Android TV, Apple TV, Fire TV, and other Smart TV platforms, while gracefully falling back to plain `<View>`/`<ScrollView>` on phones/tablets.

---

## Table of Contents

- [react-tv-spatial-navigator](#react-tv-spatial-navigator)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Quick Start](#quick-start)
  - [API](#api)
    - [`<SpatialNavigationRoot>`](#spatialnavigationroot)
    - [`<SpatialNavigationNode>`](#spatialnavigationnode)
    - [`<SpatialNavigationScrollView>`](#spatialnavigationscrollview)
    - [`useSpatialNavigator()`](#usespatialnavigator)
  - [Example](#example)

---

## Features

- **Auto‑focus & wrap‑around navigation** between registered nodes (up/down/left/right)  
- **Paging ScrollView** that jumps by “page” width on left/right presses  
- **Focus styling** with scale, shadow, and customizable `focusStyle`  
- **Graceful fallback** to plain Views in non‑TV environments (Expo Go, mobile)  
- **Zero runtime dependencies** beyond React Native core  

---

## Installation

```bash
npm install react-tv-spatial-navigator
# or
yarn add react-tv-spatial-navigator
```

## Quick Start
Wrap your app in the root provider:

```tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SpatialNavigationRoot } from 'react-tv-spatial-navigator';

export default function App() {
  return (
    <SpatialNavigationRoot style={styles.container}>
      {/* your TV content here */}
    </SpatialNavigationRoot>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
});
```

## API

### `<SpatialNavigationRoot>`

The context provider that tracks registered nodes and handles D-pad events.

**Props**

| Prop        | PropType   | Description                                           |
| ----------- | ---------- | ----------------------------------------------------- |
| `style`     | `ViewStyle` | Optional container style                              |
| `...anyViewProps` |          | Passed through to the root `<View>`                  |

### `<SpatialNavigationNode>`

A focusable element. Must be a direct or indirect child of `<SpatialNavigationRoot>`.

**Props**

| Prop        | PropType   | Description                                                |
| ----------- | ---------- | ---------------------------------------------------------- |
| `nodeId`    | `string`   | **(required)** Unique identifier for this node             |
| `focusStyle`| `ViewStyle` | (optional) Additional style applied when this node is focused |
| `...anyViewProps` |          | Passed through to the underlying `<View>`                |

### `<SpatialNavigationScrollView>`

A horizontal paging scroll view. On TV, left/right jumps by the container’s width. On non-TV, renders a plain `<ScrollView>`.

**Props**

| Prop        | PropType      | Description                                  |
| ----------- | ------------- | -------------------------------------------- |
| `style`     | `ViewStyle`   | Optional style for the `<ScrollView>`        |
| `...anyScrollViewProps` |             | Passed through to `<ScrollView>`           |

### `useSpatialNavigator()`

A hook for programmatic focus control.

**Returns**

```typescript
{
  registerNode: (id: string, ref: RefObject<any>) => void;
  unregisterNode: (id: string) => void;
  focusNode: (id: string) => void;      // call to move focus to a given nodeId
  focusedNode: string | null;           // current focused nodeId
}
```

## Example

``` tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  SpatialNavigationRoot,
  SpatialNavigationNode,
  SpatialNavigationScrollView,
} from 'react-tv-spatial-navigator';

export default function App() {
  return (
    <SpatialNavigationRoot style={styles.container}>
      <View style={styles.row}>
        <SpatialNavigationNode
          nodeId="btn1"
          style={styles.box}
          focusStyle={styles.focused}
        >
          <Text style={styles.text}>Button 1</Text>
        </SpatialNavigationNode>
        <SpatialNavigationNode
          nodeId="btn2"
          style={styles.box}
          focusStyle={styles.focused}
        >
          <Text style={styles.text}>Button 2</Text>
        </SpatialNavigationNode>
      </View>

      <SpatialNavigationScrollView style={styles.scroll}>
        {[...Array(4)].map((_, i) => (
          <SpatialNavigationNode
            key={i}
            nodeId={`item${i}`}
            style={styles.tile}
            focusStyle={styles.focused}
          >
            <Text style={styles.text}>Item {i + 1}</Text>
          </SpatialNavigationNode>
        ))}
      </SpatialNavigationScrollView>
    </SpatialNavigationRoot>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 20 },
  row:       { flexDirection: 'row', marginBottom: 30 },
  box:        { width: 120, height: 120, backgroundColor: '#333', alignItems: 'center', justifyContent: 'center', marginRight: 20 },
  tile:       { width: 140, height: 140, backgroundColor: '#444', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  text:       { color: '#fff', fontSize: 18 },
  scroll:     { height: 140 },
  focused:    { borderColor: '#0af', borderWidth: 3, backgroundColor: '#555' },
});
```