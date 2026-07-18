import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image, ActivityIndicator, Pressable, Animated } from 'react-native';

const p1 = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop';
const p2 = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop';

export function NativeAnimatedAvatar() {
  const [imageToggled, setImageToggled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedSrc, setDisplayedSrc] = useState(p1);
  const isMountedRef = useRef(true);
  const [progressAnim] = useState(() => new Animated.Value(0));
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handlePress = () => {
    if (isLoading) return;

    setIsLoading(true);
    progressAnim.setValue(0);

    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();

    timeoutRef.current = setTimeout(() => {
      const newSrc = imageToggled ? p1 : p2;
      
      Image.prefetch(newSrc)
        .then(() => {
          if (!isMountedRef.current) return;
          setDisplayedSrc(newSrc);
          setImageToggled((prev) => !prev);
          setIsLoading(false);
          progressAnim.setValue(0);
        })
        .catch(() => {
          if (!isMountedRef.current) return;
          setIsLoading(false);
          progressAnim.setValue(0);
        });
    }, 2000);
  };

  const borderRotate = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <View style={styles.avatarWrapper}>
        {isLoading && (
          <Animated.View
            style={[
              styles.progressBorder,
              {
                transform: [{ rotate: borderRotate }],
              },
            ]}
          />
        )}
        <Image source={{ uri: displayedSrc }} style={styles.image} />
        {isLoading && (
          <View style={styles.loaderOverlay}>
            <ActivityIndicator color="#3b82f6" size="small" />
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    padding: 8,
  },
  avatarWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  progressBorder: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: '#3b82f6',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  loaderOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
