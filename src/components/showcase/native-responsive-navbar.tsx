import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Animated } from 'react-native';

const navItems = ['Features', 'Pricing', 'About', 'Contact'];

export function NativeResponsiveNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [heightAnim] = useState(() => new Animated.Value(0));

  const toggleMenu = () => {
    if (isOpen) {
      Animated.timing(heightAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsOpen(false));
    } else {
      setIsOpen(true);
      Animated.spring(heightAnim, {
        toValue: 180,
        useNativeDriver: false,
        bounciness: 4,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Osnovy</Text>
        <Pressable onPress={toggleMenu} style={styles.toggleBtn}>
          <Text style={styles.toggleText}>{isOpen ? '✕' : '☰'}</Text>
        </Pressable>
      </View>
      {isOpen && (
        <Animated.View style={[styles.menu, { height: heightAnim }]}>
          {navItems.map((item) => (
            <Pressable key={item} style={styles.menuItem} onPress={toggleMenu}>
              <Text style={styles.menuText}>{item}</Text>
            </Pressable>
          ))}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    alignSelf: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  toggleBtn: {
    padding: 6,
  },
  toggleText: {
    fontSize: 20,
    color: '#64748b',
    fontWeight: 'bold',
  },
  menu: {
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    backgroundColor: '#f8fafc',
    overflow: 'hidden',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
});
