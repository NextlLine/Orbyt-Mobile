import { Image } from 'expo-image';
import { Dimensions, Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BasicChart from '@/components/home/graphComponent';
const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { width } = Dimensions.get('window');
  const user = {
    name: "Jairo"
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#043fffff', dark: '#080053ff' }}
      headerImage={
        <Image
          source={require('@/assets/images/icon.png')}
          style={[
            styles.reactLogo,
            { marginTop: insets.top },
          ]}
        />
      }>

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
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    width: width * 0.5,
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  chartContainer: {
    marginTop: 20,
    alignItems: 'center', // centraliza horizontalmente
  },
});

