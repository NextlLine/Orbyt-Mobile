// WalletsInfoGraph.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Wallet } from '@/app/(tabs)/home';
import { useOrbytColor } from '@/assets/colors/defaultColors';
import { SCREEN_SIZE } from '../parallax-scroll-view';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';
import { CustomCarousel } from '../carousel_component';
import WalletsInfoGraph from './walllet_graph_component';

type WalletCarousel = {
  wallet: Wallet;
};

export default function WalletCarousel({ wallet }: WalletCarousel) {
  return (

    <View style={{ alignItems: 'center', width: '100%' }}>

      <CustomCarousel
        items={[
          {
            tag: "Gráfico básico",
            content: 
            <ThemedView >
                    {wallet && wallet.totalMonth?.length > 0 ? (
                      <WalletsInfoGraph wallet={wallet} />
                    ) : (
                      <ThemedText>Gráfico indisponível por falta de dado</ThemedText>
                    )}
                  </ThemedView>
              ,
          },
          {
            tag: "Azul",
            content: <View style={{ height: '100%', backgroundColor: "lightblue" }} />,
          },
        ]}
        spacing={0}
      />

    </View>
  );
}