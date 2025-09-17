import { Dimensions, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BasicChart from '@/components/home/graphComponent';
import React from 'react';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const user = { name: "Jairo" };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#043fffff', dark: '#080053ff' }}
    >

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hello, {user.name} </ThemedText>
      </ThemedView>

      <ThemedView style={styles.chartContainer}>
        <ThemedText type="subtitle">Visão geral</ThemedText>
        <BasicChart />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reactLogo: {
    width: width * 0.3,
    aspectRatio: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
