import { RefreshControl, StyleSheet, Text, TouchableOpacity } from "react-native";
import ParallaxScrollView from "@/components/util/parallax-scroll-view";
import { ThemedView } from "@/components/util/themed-view";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useOrbytColor } from "@/hooks/defaultColors";
import CustomBarGraph from "@/components/util/barGraph";
import { FinanceInteractor } from "./_finance.interactor";
import { observer } from "mobx-react-lite";
import { ThemedText } from "@/components/util/themed-text";
import CreateWalletModal from "@/components/finance/create_financeWallet_modal";
import { CustomSelect } from "@/components/util/select_picker_component";
import Icon from 'react-native-vector-icons/Feather';

export default observer(function Finance() {
  const interactor = useRef(new FinanceInteractor()).current;

  const borderColorItem = useOrbytColor("borderItem");
  const backgroundItem = useOrbytColor("backgroundItem");
  const background = useOrbytColor("background");
  const mainColor = useOrbytColor("main");

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    interactor.fetchFinanceWallets();
  }, [interactor]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await interactor.fetchFinanceWallets();
    setRefreshing(false);
  }, [interactor]);

  const handleDelete = (index: number) => interactor.deleteWallet(index);
  const handleToggleShowWalletModal = () => interactor.entity.setShowWalletsModal(!interactor.entity.showWalletsModal);
  const handleCreateWallet = async (name: string, balance: number) => await interactor.createWallet(name, balance);
  const handleCreateWalletModal = () => interactor.openCreateWalletModal();

  const currentWallet = interactor.entity.financeWallets[interactor.entity.index];

  return (
    <>
      <ParallaxScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={mainColor}
            colors={[mainColor]}
          />
        }
      >
        <ThemedView
          style={[
            styles.container,
            { borderColor: borderColorItem, backgroundColor: backgroundItem },
          ]}
        >
          <CustomSelect
            data={interactor.entity.financeWallets}
            onSelect={(i) => interactor.entity.setIndex(i)}
            onDelete={(i) => handleDelete(i)}
            onCreateWallet={handleCreateWalletModal}
            visible={interactor.entity.showWalletsModal}
            toggle={handleToggleShowWalletModal}
          >
            <ThemedView style={styles.subcontainer}>
              <ThemedText type="subtitle">
                {currentWallet?.name || "Select Wallet"}
              </ThemedText>
              <Icon name="chevron-down" size={20} color={useOrbytColor('text')} />
            </ThemedView>
          </CustomSelect>


          {currentWallet && (
            <ThemedView style={styles.subsubcontainer}>
              <ThemedText type="default">
                {currentWallet.currency?.symbol} {currentWallet.balance.toFixed(2)}
              </ThemedText>
            </ThemedView>
          )}
        </ThemedView>

        {currentWallet?.monthReport != undefined && currentWallet?.monthReport?.length > 0 && (
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

      <CreateWalletModal
        visible={interactor.entity.showCreateWalletModal}
        onCancel={() => interactor.entity.setShowCreateWalletModal(false)}
        onConfirm={handleCreateWallet}
      />
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 12,
  },
  subcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'transparent'
  },
  subsubcontainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 20,
    width: '100%',
    marginTop: 8,
    backgroundColor: 'transparent'
  },
});
