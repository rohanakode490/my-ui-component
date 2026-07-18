import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

export function NativeDotBackground({ children }: { children?: ReactNode }) {
  return (
    <View style={styles.container}>
      <View style={styles.gridOverlay}>
        {Array.from({ length: 48 }).map((_, i) => (
          <View key={i} style={styles.dotRow}>
            {Array.from({ length: 12 }).map((_, j) => (
              <View key={j} style={styles.dot} />
            ))}
          </View>
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
    justifyContent: 'space-around',
    opacity: 0.15,
    padding: 10,
  },
  dotRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dot: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
