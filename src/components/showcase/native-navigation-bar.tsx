import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Animated } from 'react-native';

const navigationItems = [
  { id: 'about', label: 'About' },
  { id: 'docs', label: 'Docs' },
  { id: 'pricing', label: 'Pricing' },
];

export function NativeNavigationBar() {
  const [activeTab, setActiveTab] = useState('about');
  const [underlineLeft] = useState(() => new Animated.Value(0));

  const handleTabPress = (tabId: string, index: number) => {
    setActiveTab(tabId);
    Animated.spring(underlineLeft, {
      toValue: index * 80,
      useNativeDriver: true,
      bounciness: 4,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.navRow}>
        {navigationItems.map((item, index) => {
          const isActive = activeTab === item.id;
          return (
            <Pressable
              key={item.id}
              onPress={() => handleTabPress(item.id, index)}
              style={styles.tab}
            >
              <Text
                style={[
                  styles.tabText,
                  isActive && styles.activeTabText,
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
        <Animated.View
          style={[
            styles.underline,
            {
              transform: [{ translateX: underlineLeft }],
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    padding: 16,
  },
  navRow: {
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: '#f1f5f9',
    borderRadius: 24,
    padding: 4,
  },
  tab: {
    width: 80,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  activeTabText: {
    color: '#3b82f6',
    fontWeight: 'bold',
  },
  underline: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    width: 80,
    height: '80%',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 1,
  },
});
