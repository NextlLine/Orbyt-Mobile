// graphComponent.tsx
import React from 'react';
import { Alert, Button, GestureResponderEvent, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemedView } from '../themed-view';
import { ThemedText } from '../themed-text';
import { Wallet } from '@/app/(tabs)/home';
import { CustomButton } from '../custom_button_component';

type Props = {
  wallets: Wallet[];
  index: number;
  onChangeWallet: (i: number) => void;
};

export default function WalletsInfo({ wallets, index, onChangeWallet }: Props) {
  return (
    <CustomButton onPress={() => Alert.alert('Simple Button pressed')}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.subcontainer}>
          <ThemedText type="subtitle">{wallets[index].name}</ThemedText>
        </ThemedView>

        <ThemedText type="default">
          {wallets[index].currency.font} {wallets[index].value.toFixed(2)}
        </ThemedText>
      </ThemedView>
    </CustomButton>
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
  },
  picker: {
    width: 200,
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#ffffffff',
    borderRadius: 6,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});