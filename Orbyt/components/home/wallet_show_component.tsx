import React from 'react';
import { Alert, Button, GestureResponderEvent, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedView } from '../themed-view';
import { ThemedText } from '../themed-text';
import { Wallet } from '@/app/(tabs)/home';
import Icon from 'react-native-vector-icons/Feather'; // Or FontAwesome, MaterialIcons, etc.
import { CustomSelect } from '../select_picker_component';
import { useOrbytColor } from '@/assets/colors/defaultColors';

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
          <Icon name="chevron-down" size={20} color = {useOrbytColor('text')} />

        </ThemedView>
      </CustomSelect>

      <ThemedText type="default">
        {wallets[index].currency.font} {wallets[index].value.toFixed(2)}
      </ThemedText>
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

  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#ffffffff',
    borderRadius: 6,
    marginLeft: 8,
  },

});