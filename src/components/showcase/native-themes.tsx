import React, { useEffect, useState } from 'react';
import { StyleSheet, Pressable, Animated, View } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { Sun, Moon } from 'lucide-react';

export function NativeThemeToggleClassic() {
  const { isDark, setTheme } = useTheme();
  const [anim] = useState(() => new Animated.Value(isDark ? 1 : 0));
  const [revealAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.spring(anim, {
      toValue: isDark ? 1 : 0,
      useNativeDriver: true,
      friction: 6,
    }).start();
  }, [isDark, anim]);

  const toggle = (e?: unknown) => {
    const nextTheme = isDark ? 'light' : 'dark';

    revealAnim.setValue(0);
    Animated.timing(revealAnim, {
      toValue: 1,
      duration: 650,
      useNativeDriver: true,
    }).start(() => {
      revealAnim.setValue(0);
    });

    setTheme(nextTheme, e as unknown as React.MouseEvent);
  };

  const sunRotate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-90deg'],
  });

  const sunScale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const moonRotate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['90deg', '0deg'],
  });

  const moonScale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const revealScale = revealAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  const revealOpacity = revealAnim.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [1, 1, 0],
  });

  return (
    <View style={[styles.previewContainer, { backgroundColor: isDark ? '#27272a' : '#f4f4f5' }]}>
      <Animated.View
        style={[
          styles.revealCircle,
          {
            backgroundColor: isDark ? '#f4f4f5' : '#27272a',
            transform: [{ scale: revealScale }],
            opacity: revealOpacity,
          },
        ]}
      />

      <Pressable
        onPress={toggle}
        style={[
          styles.btn,
          {
            backgroundColor: isDark ? '#3f3f46' : '#ffffff',
            borderColor: isDark ? '#52525b' : '#e2e8f0',
          },
        ]}
      >
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{ rotate: sunRotate }, { scale: sunScale }],
              opacity: anim.interpolate({ inputRange: [0, 0.5], outputRange: [1, 0] }),
            },
          ]}
        >
          <Sun size={20} color="#f97316" />
        </Animated.View>
        <Animated.View
          style={[
            styles.iconContainer,
            {
              position: 'absolute',
              top: 13,
              left: 13,
              transform: [{ rotate: moonRotate }, { scale: moonScale }],
              opacity: anim.interpolate({ inputRange: [0.5, 1], outputRange: [0, 1] }),
            },
          ]}
        >
          <Moon size={20} color="#60a5fa" />
        </Animated.View>
      </Pressable>
    </View>
  );
}

export function NativeThemeToggleSwitch() {
  const { isDark, setTheme } = useTheme();
  const [slideAnim] = useState(() => new Animated.Value(isDark ? 1 : 0));
  const [revealAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: isDark ? 1 : 0,
      useNativeDriver: true,
      friction: 6,
    }).start();
  }, [isDark, slideAnim]);

  const toggle = (e?: unknown) => {
    const nextTheme = isDark ? 'light' : 'dark';

    revealAnim.setValue(0);
    Animated.timing(revealAnim, {
      toValue: 1,
      duration: 650,
      useNativeDriver: true,
    }).start(() => {
      revealAnim.setValue(0);
    });

    setTheme(nextTheme, e as unknown as React.MouseEvent);
  };

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 38],
  });

  const revealScale = revealAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  const revealOpacity = revealAnim.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [1, 1, 0],
  });

  return (
    <View style={[styles.previewContainer, { backgroundColor: isDark ? '#27272a' : '#f4f4f5' }]}>
      <Animated.View
        style={[
          styles.revealCircle,
          {
            backgroundColor: isDark ? '#f4f4f5' : '#27272a',
            transform: [{ scale: revealScale }],
            opacity: revealOpacity,
          },
        ]}
      />

      <Pressable
        onPress={toggle}
        style={[
          styles.switchBg,
          {
            backgroundColor: isDark ? '#3f3f46' : '#e2e8f0',
            borderColor: isDark ? '#52525b' : '#cbd5e1',
          },
        ]}
      >
        <Animated.View
          style={[
            styles.switchThumb,
            {
              backgroundColor: isDark ? '#27272a' : '#ffffff',
              borderColor: isDark ? '#52525b' : '#cbd5e1',
              transform: [{ translateX }],
            },
          ]}
        >
          {isDark ? (
            <Moon size={14} color="#60a5fa" />
          ) : (
            <Sun size={14} color="#f97316" />
          )}
        </Animated.View>
      </Pressable>
    </View>
  );
}

export function NativeThemeToggleBouncyLinearButton() {
  const { isDark, setTheme } = useTheme();
  const [bounceAnim] = useState(() => new Animated.Value(0));

  const toggle = (e?: unknown) => {
    const nextTheme = isDark ? 'light' : 'dark';
    bounceAnim.setValue(-30);
    Animated.spring(bounceAnim, {
      toValue: 0,
      bounciness: 15,
      speed: 10,
      useNativeDriver: true,
    }).start();

    setTheme(nextTheme, e as unknown as React.MouseEvent);
  };

  return (
    <View style={[styles.previewContainer, { backgroundColor: isDark ? '#27272a' : '#f4f4f5' }]}>
      <Pressable
        onPress={toggle}
        style={[
          styles.btn,
          {
            backgroundColor: isDark ? '#3f3f46' : '#ffffff',
            borderColor: isDark ? '#52525b' : '#e2e8f0',
          },
        ]}
      >
        <Animated.View
          style={{
            transform: [{ translateY: bounceAnim }],
          }}
        >
          {isDark ? (
            <Moon size={20} color="#60a5fa" />
          ) : (
            <Sun size={20} color="#f97316" />
          )}
        </Animated.View>
      </Pressable>
    </View>
  );
}

export function NativeThemeToggleBouncyLinearSwitch() {
  const { isDark, setTheme } = useTheme();
  const [slideAnim] = useState(() => new Animated.Value(isDark ? 1 : 0));

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: isDark ? 1 : 0,
      useNativeDriver: true,
      bounciness: 14,
      speed: 8,
    }).start();
  }, [isDark, slideAnim]);

  const toggle = (e?: unknown) => {
    const nextTheme = isDark ? 'light' : 'dark';
    setTheme(nextTheme, e as unknown as React.MouseEvent);
  };

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 38],
  });

  return (
    <View style={[styles.previewContainer, { backgroundColor: isDark ? '#27272a' : '#f4f4f5' }]}>
      <Pressable
        onPress={toggle}
        style={[
          styles.switchBg,
          {
            backgroundColor: isDark ? '#3f3f46' : '#e2e8f0',
            borderColor: isDark ? '#52525b' : '#cbd5e1',
          },
        ]}
      >
        <Animated.View
          style={[
            styles.switchThumb,
            {
              backgroundColor: isDark ? '#27272a' : '#ffffff',
              borderColor: isDark ? '#52525b' : '#cbd5e1',
              transform: [{ translateX }],
            },
          ]}
        >
          {isDark ? (
            <Moon size={14} color="#60a5fa" />
          ) : (
            <Sun size={14} color="#f97316" />
          )}
        </Animated.View>
      </Pressable>
    </View>
  );
}

export function NativeThemeToggleLRButton() {
  const { isDark, setTheme } = useTheme();
  const [anim] = useState(() => new Animated.Value(isDark ? 1 : 0));

  useEffect(() => {
    Animated.timing(anim, {
      toValue: isDark ? 1 : 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, [isDark, anim]);

  const toggle = (e?: unknown) => {
    const nextTheme = isDark ? 'light' : 'dark';
    setTheme(nextTheme, e as unknown as React.MouseEvent);
  };

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -32],
  });

  return (
    <View style={[styles.previewContainer, { backgroundColor: isDark ? '#27272a' : '#f4f4f5' }]}>
      <Pressable
        onPress={toggle}
        style={[
          styles.btn,
          {
            backgroundColor: isDark ? '#3f3f46' : '#ffffff',
            borderColor: isDark ? '#52525b' : '#e2e8f0',
            overflow: 'hidden',
          },
        ]}
      >
        <Animated.View
          style={{
            transform: [{ translateX }],
            flexDirection: 'row',
            alignItems: 'center',
            width: 64,
            paddingLeft: 4,
            gap: 12,
          }}
        >
          <Sun size={20} color="#f97316" />
          <Moon size={20} color="#60a5fa" />
        </Animated.View>
      </Pressable>
    </View>
  );
}

export function NativeThemeToggleLRSwitch() {
  return <NativeThemeToggleSwitch />;
}

const styles = StyleSheet.create({
  previewContainer: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  revealCircle: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    zIndex: 0,
  },
  btn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: 'relative',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchBg: {
    width: 72,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 2,
    justifyContent: 'center',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  switchThumb: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
});
