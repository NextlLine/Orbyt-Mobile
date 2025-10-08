import { Tabs } from 'expo-router';
import React from 'react';
import { HapticTab } from '@/components/util/haptic-tab';
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
        name="index"
        options={{
          title: 'News',
          tabBarIcon: ({ color }) => <Icon name="cloud" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="finance"
        options={{
          title: 'Fincance',
          tabBarIcon: ({ color }) => <Icon name="bar-chart" size={20} color={color} />,
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
