import { useState } from 'react';
import { StyleSheet, Text, View, PanResponder, Animated } from 'react-native';

export function NativeTiltCard() {
  const [tiltX] = useState(() => new Animated.Value(0));
  const [tiltY] = useState(() => new Animated.Value(0));

  const [panResponder] = useState(() =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const maxTilt = 15;
        const tiltXVal = (gestureState.dy / 100) * maxTilt;
        const tiltYVal = -(gestureState.dx / 100) * maxTilt;
        
        Animated.spring(tiltX, {
          toValue: Math.max(-maxTilt, Math.min(maxTilt, tiltXVal)),
          useNativeDriver: true,
          bounciness: 8,
        }).start();

        Animated.spring(tiltY, {
          toValue: Math.max(-maxTilt, Math.min(maxTilt, tiltYVal)),
          useNativeDriver: true,
          bounciness: 8,
        }).start();
      },
      onPanResponderRelease: () => {
        Animated.spring(tiltX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        Animated.spring(tiltY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
    })
  );

  const rotateX = tiltX.interpolate({
    inputRange: [-15, 15],
    outputRange: ['-15deg', '15deg'],
  });
  const rotateY = tiltY.interpolate({
    inputRange: [-15, 15],
    outputRange: ['-15deg', '15deg'],
  });

  return (
    <Animated.View
      style={[
        styles.card,
        {
          transform: [
            { perspective: 1000 },
            { rotateX: rotateX },
            { rotateY: rotateY },
          ],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>📱</Text>
      </View>
      <Text style={styles.title}>Native 3D Tilt</Text>
      <Text style={styles.description}>
        Drag or swipe on this card to feel the 3D physics tilt effect.
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 280,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  iconContainer: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
});
