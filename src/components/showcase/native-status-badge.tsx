import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

interface NativeStatusBadgeProps {
  status?: 'online' | 'offline' | 'busy';
}

export function NativeStatusBadge({ status = 'online' }: NativeStatusBadgeProps) {
  const [pulseAnim] = useState(() => new Animated.Value(1));

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [pulseAnim]);

  const colors = {
    online: '#10b981',
    offline: '#64748b',
    busy: '#f59e0b',
  };

  const activeColor = colors[status];

  return (
    <View style={styles.container}>
      <View style={styles.badgeWrapper}>
        <Animated.View
          style={[
            styles.pulse,
            {
              backgroundColor: activeColor,
              transform: [{ scale: pulseAnim }],
              opacity: pulseAnim.interpolate({
                inputRange: [1, 1.5],
                outputRange: [0.75, 0],
              }),
            },
          ]}
        />
        <View style={[styles.dot, { backgroundColor: activeColor }]} />
      </View>
      <Text style={styles.text}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  badgeWrapper: {
    width: 10,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  pulse: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  text: {
    textTransform: 'capitalize',
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
});
