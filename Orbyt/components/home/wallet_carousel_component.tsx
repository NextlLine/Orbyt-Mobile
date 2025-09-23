// WalletsInfoGraph.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useOrbytColor } from '@/assets/colors/defaultColors';
import { SCREEN_SIZE } from '../parallax-scroll-view';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';
import { CustomCarousel } from '../carousel_component';
import CustomGraph from '../customGraph';
import { Wallet } from '@/model/mockModels';

type WalletCarousel = {
  wallet: Wallet;
};

export default function WalletCarousel({ wallet }: WalletCarousel) {
  return (
      <CustomCarousel
        items={[
          {
            content: (
              <ThemedView style={{ backgroundColor: 'transparent' }}>
                {wallet && wallet.history?.length > 0 ? (
                  <CustomGraph values={wallet.history} />
                ) : (
                  <ThemedText>Gráfico indisponível por falta de dado</ThemedText>
                )}
              </ThemedView>
            ),
          },
        ]}
        style={{ width: '100%', height: '100%' }}
        spacing={0}
        activeTagColor={useOrbytColor('activeTag')}
      />
  );
}
