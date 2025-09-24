import React from 'react';
import { useOrbytColor } from '@/hooks/defaultColors';
import { ThemedView } from '../themed-view';
import { CustomCarousel } from '../carousel_component';
import CustomGraph from '../customGraph';
import { Wallet } from '@/model/mockModels';
import { View } from 'react-native';

type WalletCarousel = {
  wallet: Wallet;
};

export default function WalletCarousel({ wallet }: WalletCarousel) {
  return (
    <View   style={{ width: '100%', height: '100%' }}>
    <CustomCarousel
      items={[
        {
          content: (
            <ThemedView style={{ backgroundColor: 'transparent' }}>
              <CustomGraph values={wallet.history} />
            </ThemedView>
          ),
        },
          {
          content: (
            <ThemedView style={{ backgroundColor: 'transparent' }}>
              <CustomGraph values={wallet.history} qtdToShow={6}/>
            </ThemedView>
          ),
        },
      ]}
      style={{ width: '100%', height: '100%' }}
      activeTagColor={useOrbytColor('activeTag')}
    />
    </View>
  );
}
