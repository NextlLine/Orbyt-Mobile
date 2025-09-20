// WalletsInfoGraph.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Wallet } from '@/app/(tabs)/home';
import { useOrbytColor } from '@/assets/colors/defaultColors';
import { SCREEN_SIZE } from '../parallax-scroll-view';
import { ThemedText } from '../themed-text';
import { ThemedView } from '../themed-view';
import { CustomCarousel } from '../carousel_component';
import LastEntryWalletGraph from './graphLastNEntryToWallet';

type WalletCarousel = {
    wallet: Wallet;
};

export default function WalletCarousel({ wallet }: WalletCarousel) {
    return (
        <View style={{ alignItems: 'center', width: '100%', backgroundColor: "transparent" }}>
            <CustomCarousel
                items={[
                    {
                        tag: "●",
                        content:
                            <ThemedView style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}>
                                {wallet && wallet.totalMonth?.length > 0 ? (
                                    <LastEntryWalletGraph wallet={wallet} lastN={6}/>
                                ) : (
                                    <ThemedText>Gráfico indisponível por falta de dado</ThemedText>
                                )}
                            </ThemedView>
                        ,
                    },
                    {
                        tag: "●",
                        content: 
                        <ThemedView style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}>
                                {wallet && wallet.totalMonth?.length > 0 ? (
                                    <LastEntryWalletGraph wallet={wallet} lastN={4} />
                                ) : (
                                    <ThemedText>Gráfico indisponível por falta de dado</ThemedText>
                                )}
                            </ThemedView>
                            ,
                    },
                ]}
                spacing={0}
                activeTagColor={useOrbytColor('activeTag')}
            />
        </View>
    );
}