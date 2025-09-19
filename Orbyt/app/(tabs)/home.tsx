// HomeScreen.tsx
import { Dimensions, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedView } from '@/components/themed-view';
import BasicChart from '@/components/home/graphComponent';
import React, { useState } from 'react';
import WalletsInfo from '@/components/home/wallet_show_component';
import { useOrbytColor } from '@/assets/colors/defaultColors';

const { width } = Dimensions.get('window');

export type Wallet = {
  name: string;
  total: number;
  incoming: number;
  outcoming: number;
  currency: { id: string; font: string };
};
type User = {
  name: string,
  wallets: Wallet[]
}

export default function HomeScreen() {
  const [index, setIndex] = useState(0);
  const user: User = {
    name: "Jairo",
    wallets: [
      {
        name: "Rumo aos 10k",
        total: 10569.3,
        incoming: 500,
        outcoming: 20,
        currency: { id: "Brl", font: 'R$' },
      },
      {
        name: "Cofrinho",
        total: 432.12,
        incoming: 0,
        outcoming: 0,
        currency: { id: "Brl", font: 'R$' },
      }
    ],
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor= {{ color: useOrbytColor('main')}}
    >
      <ThemedView style={[styles.container, { backgroundColor: useOrbytColor('backgroundItem')}]}>
        <WalletsInfo
          wallets={user.wallets}
          index={index}
          onChangeWallet={(i) => setIndex(i)}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding: 8,
    gap: 8,
    borderRadius: 5,
  },
  reactLogo: {
    width: width * 0.3,
    aspectRatio: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});