import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/util/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Icon from 'react-native-vector-icons/Feather';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="finance"
        options={{
          title: 'Fincance',
          tabBarIcon: ({ color }) => <Icon name="bar-chart" size={20} color={color}  />,
        }}
      />
      <Tabs.Screen
        name="investment"
        options={{
          title: 'Investment',
          tabBarIcon: ({ color }) => <Icon name="trending-up" size={20} color={color} />,
        }}
      />
       <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Icon name="settings" size={20} color={color} />
          ,
        }}
      />
    </Tabs>
  );
}
