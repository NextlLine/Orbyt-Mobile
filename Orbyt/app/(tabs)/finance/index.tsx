import { StyleSheet, Text } from "react-native";
import ParallaxScrollView from "@/components/util/parallax-scroll-view";
import { ThemedView } from "@/components/util/themed-view";
import React, { useState, useCallback } from "react";
import { useOrbytColor } from "@/hooks/defaultColors";
import CustomBarGraph from "@/components/util/barGraph";
import WalletsInfo from "@/components/news/wallet_info";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native"; 
import { FinanceWallet } from "@/model/models";
import env from "@/config/env";

export default function Finance() {
  const [index, setIndex] = useState(0);
  const [financeWallets, setFinanceWallets] = useState<FinanceWallet[]>([]);
  const [loading, setLoading] = useState(true);

  const borderColorItem = useOrbytColor("borderItem");
  const backgroundItem = useOrbytColor("backgroundItem");

  useFocusEffect(
    useCallback(() => {
      const fetchFinanceWallets = async () => {
        try {
          setLoading(true);

          const token = await AsyncStorage.getItem("acces_taken");
          if (!token) throw new Error("Usuário não logado");

          const response = await fetch(`${env.BASE_URL}/finance`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          const json = await response.json();
          if (!response.ok) throw new Error(json.message || "Erro ao buscar wallets");

          const formattedWallets: FinanceWallet[] = json.data.map((w: any) => ({
            id: w.id,
            name: w.name,
            balance: w.balance,
            currency: {
              id: w.currency.id,
              symbol: w.currency.symbol,
              code: w.currency.code,
            },
            transactions: w.transactions ?? [],
            monthReport: w.monthReports ?? [], 
          }));

          setFinanceWallets(formattedWallets);
        } catch (err: unknown) {
          if (err instanceof Error)
            console.error("Erro ao carregar wallets:", err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchFinanceWallets();
    }, [])
  );

  if (loading) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando carteiras...</Text>
      </ThemedView>
    );
  }

  if (financeWallets.length === 0) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Nenhuma carteira encontrada</Text>
      </ThemedView>
    );
  }

  const currentWallet = financeWallets[index];

  return (
    <ParallaxScrollView>
      <ThemedView
        style={[
          styles.container,
          { borderColor: borderColorItem, backgroundColor: backgroundItem },
        ]}
      >
        <WalletsInfo
          wallets={financeWallets}
          index={index}
          onChangeWallet={(i) => setIndex(i)}
        />
      </ThemedView>

      {currentWallet && currentWallet.monthReport && (
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    maxHeight: 300,
  },
});
