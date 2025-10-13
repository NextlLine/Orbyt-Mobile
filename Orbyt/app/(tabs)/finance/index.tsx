import { StyleSheet, Text, TouchableOpacity } from "react-native";
import ParallaxScrollView from "@/components/util/parallax-scroll-view";
import { ThemedView } from "@/components/util/themed-view";
import React, { useCallback, useRef } from "react";
import { useOrbytColor } from "@/hooks/defaultColors";
import CustomBarGraph from "@/components/util/barGraph";
import WalletsInfo from "@/components/finance/wallet_info";
import { useFocusEffect } from "@react-navigation/native";
import { FinanceInteractor } from "./_finance.interactor";
import { observer } from "mobx-react-lite";
import { ThemedText } from "@/components/util/themed-text";

export default observer(function Finance() {
  const interactor = useRef(new FinanceInteractor()).current;

  const borderColorItem = useOrbytColor("borderItem");
  const backgroundItem = useOrbytColor("backgroundItem");
  const background = useOrbytColor("background");
  const mainColor = useOrbytColor('main');

  useFocusEffect(
    useCallback(() => {
      interactor.fetchFinanceWallets();
    }, [interactor])
  );

  const onSubmit = () => {
    // interactor.createFinanceWallet()
  }

  if (interactor.entity.loading) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading Wallets...</Text>
      </ThemedView>
    );
  }

  if (interactor.entity.financeWallets.length === 0) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:background}}>
        <ThemedText>Looks like you don't have a wallet</ThemedText>

        <TouchableOpacity
          onPress={onSubmit}
          style={{ backgroundColor: mainColor, borderRadius: 8, padding: 14, alignItems: 'center', opacity: interactor.entity.loading ? 0.7 : 1 }}
        >
          <Text style={{ color: '#fff', fontWeight: '600' }}>
            Create wallet
          </Text>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  const currentWallet = interactor.entity.financeWallets[interactor.entity.index];

  return (
    <ParallaxScrollView>
      <ThemedView
        style={[
          styles.container,
          { borderColor: borderColorItem, backgroundColor: backgroundItem },
        ]}
      >
        <WalletsInfo
          wallets={interactor.entity.financeWallets}
          index={interactor.entity.index}
          onChangeWallet={(i) => (interactor.entity.setIndex(i))}
        />
      </ThemedView>

      {currentWallet?.monthReport && (
        <ThemedView
          style={[
            styles.container,
            { borderColor: borderColorItem, backgroundColor: backgroundItem },
          ]}
        >
          <CustomBarGraph values={currentWallet.monthReport} />
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    maxHeight: 300,
  },
});
