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