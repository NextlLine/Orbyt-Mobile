import React from 'react';
import { Alert, Button, GestureResponderEvent, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedView } from '../themed-view';
import { ThemedText } from '../themed-text';
import Icon from 'react-native-vector-icons/Feather';
import { CustomSelect } from '../select_picker_component';
import { useOrbytColor } from '@/assets/colors/defaultColors';
import { Wallet } from '@/model/mockModels';

type WalletsInfoProps = {
  wallets: Wallet[];
  index: number;
  onChangeWallet: (i: number) => void;
};

export default function WalletsInfo({ wallets, index, onChangeWallet }: WalletsInfoProps) {
  return (
    <ThemedView style={styles.container}>
      <CustomSelect data={wallets} onSelect={onChangeWallet}>
        <ThemedView style={styles.subcontainer}>
          <ThemedText type="subtitle">{wallets[index].name}</ThemedText>
          <Icon name="chevron-down" size={20} color={useOrbytColor('text')} />

        </ThemedView>
      </CustomSelect>

      <ThemedView style={styles.subsubcontainer}>
        <ThemedText type="default">
          {wallets[index].currency.symbol} {wallets[index].total.toFixed(2)}
        </ThemedText>

        <ThemedText style={{ color: useOrbytColor('gain') }}>
          {wallets[index].incoming.toFixed(2)}
          <Icon name="trending-up" size={20} color={useOrbytColor('gain')} />

        </ThemedText>

        <ThemedText style={{ color: useOrbytColor('loose') }}>
          {wallets[index].outcoming.toFixed(2)}
          <Icon name="trending-down" size={20} color={useOrbytColor('loose')} />

        </ThemedText>
      </ThemedView>
    </ThemedView>

  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  subcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0)',
    width: '100%',
  },
  subsubcontainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 20,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0)',
  }
});