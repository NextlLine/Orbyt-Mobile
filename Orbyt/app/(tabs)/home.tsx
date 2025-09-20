// HomeScreen.tsx
import { Dimensions, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedView } from '@/components/themed-view';
import React, { useState } from 'react';
import WalletsInfo from '@/components/home/wallet_show_component';
import { useOrbytColor } from '@/assets/colors/defaultColors';
import { ThemedText } from '@/components/themed-text';
import WalletCarousel from '@/components/home/wallet_carousel_component';

const { width } = Dimensions.get('window');

export type totalMonth = {
  month: string,
  value: number,
}

export type Wallet = {
  name: string;
  total: number;
  incoming: number;
  outcoming: number;
  totalMonth: totalMonth[];
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
        totalMonth: [
          { month: "01-2025", value: 1220 },
          { month: "02-2025", value: 1980 },
          { month: "03-2025", value: -1500 },
          { month: "04-2025", value: 780 },
          { month: "05-2025", value: -1500 },
          { month: "06-2025", value: 3000 },
          { month: "07-2025", value: 1130.4 },
        ]
      },
      {
        name: "Cofrinho",
        total: 0,
        incoming: 0,
        outcoming: 0,
        currency: { id: "Brl", font: 'R$' },
        totalMonth: [

        ]
      }
    ],
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ color: useOrbytColor('main') }}
    >
      <ThemedView style={[styles.container, { backgroundColor: useOrbytColor('backgroundItem') }]}>
        <WalletsInfo
          wallets={user.wallets}
          index={index}
          onChangeWallet={(i) => setIndex(i)}
        />
      </ThemedView>

      <ThemedView style={[styles.container, { backgroundColor: useOrbytColor('backgroundItem'), alignItems: 'center', padding: 20 }]}>
        {user.wallets[index] && user.wallets[index].totalMonth?.length > 0 ? (
          <WalletCarousel wallet={user.wallets[index]} />
        ) : (
          <ThemedText>Gráfico indisponível por falta de dado</ThemedText>
        )}
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