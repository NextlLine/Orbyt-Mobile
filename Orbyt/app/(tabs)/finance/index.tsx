import { StyleSheet, Text } from "react-native";
import ParallaxScrollView from "@/components/util/parallax-scroll-view";
import { ThemedView } from "@/components/util/themed-view";
import React, { useCallback, useRef } from "react";
import { useOrbytColor } from "@/hooks/defaultColors";
import CustomBarGraph from "@/components/util/barGraph";
import WalletsInfo from "@/components/news/wallet_info";
import { useFocusEffect } from "@react-navigation/native";
import { FinanceInteractor } from "./_finance.interactor";
import { observer } from "mobx-react-lite";

export default observer(function Finance() {
  const interactor = useRef(new FinanceInteractor()).current;

  const borderColorItem = useOrbytColor("borderItem");
  const backgroundItem = useOrbytColor("backgroundItem");

  useFocusEffect(
    useCallback(() => {
      interactor.fetchFinanceWallets();
    }, [interactor])
  );

  if (interactor.entity.loading) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading Wallets...</Text>
      </ThemedView>
    );
  }

  if (interactor.entity.financeWallets.length === 0) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No Wallet was found</Text>
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
          onChangeWallet={(i) => (interactor.entity.index = i)}
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
