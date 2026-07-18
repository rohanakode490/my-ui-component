import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

export function NativeGridBackground({ children }: { children?: ReactNode }) {
  return (
    <View style={styles.container}>
      <View style={styles.gridOverlay}>
        {Array.from({ length: 6 }).map((_, i) => (
          <View
            key={`h-${i}`}
            style={[styles.lineHorizontal, { top: `${(i + 1) * 16}%` }]}
          />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <View
            key={`v-${i}`}
            style={[styles.lineVertical, { left: `${(i + 1) * 16}%` }]}
          />
        ))}
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    minHeight: 200,
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  gridOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.1,
  },
  lineHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#000000',
  },
  lineVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
