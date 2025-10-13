import React from 'react';
import { Platform } from 'react-native';
import { useOrbytColor } from '@/hooks/defaultColors';

import { NativeTabs, Label, Icon as NativeIcon } from 'expo-router/unstable-native-tabs';
import { Tabs } from 'expo-router';
import RNIcon from 'react-native-vector-icons/Feather';
import { HapticTab } from '@/components/util/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const color = useOrbytColor('main');

  if (Platform.OS === 'ios') {
    const renderIcon = (iosDefault: string, iosSelected: string) => {
      return <NativeIcon sf={{ default: iosDefault, selected: iosSelected } as any} />;
    };

    return (
      <NativeTabs iconColor={color} >
        <NativeTabs.Trigger name="news/index">
          {renderIcon('house', 'house.fill')}
          <Label>News</Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="finance/index">
          {renderIcon('chart.bar', 'chart.bar.fill')}
          <Label>Finance</Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="investment/index">
          {renderIcon('chart.line.uptrend.xyaxis', 'chart.line.uptrend.xyaxis')}
          <Label>Investment</Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="settings/index">
          {renderIcon('gear', 'gear.fill')}
          <Label>Settings</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: color,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="news/index"
        options={{
          title: 'News',
          tabBarIcon: ({ color }) => <RNIcon name="home" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="finance/index"
        options={{
          title: 'Finance',
          tabBarIcon: ({ color }) => <RNIcon name="bar-chart" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="investment/index"
        options={{
          title: 'Investment',
          tabBarIcon: ({ color }) => <RNIcon name="trending-up" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <RNIcon name="settings" size={20} color={color} />,
        }}
      />
    </Tabs>
  );
}
