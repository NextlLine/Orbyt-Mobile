import { Dimensions, StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/util/parallax-scroll-view";
import { ThemedView } from "@/components/util/themed-view";
import React, { useState } from "react";
import { useOrbytColor } from "@/hooks/defaultColors";
import FinanceCarousel from "@/components/finance/finance_carousel_component";
import { mockUser } from "@/model/mockUser";
import CustomBarGraph from "@/components/util/barGraph";
import WalletsInfo from "@/components/home/wallet_show_component";

export default function Finance() {
  const [index, setIndex] = useState(0);
  const user = mockUser;
  const borderColorItem = useOrbytColor('borderItem')
  const backgroundItem = useOrbytColor('backgroundItem')

  return (
    <>
      <ParallaxScrollView>
        <ThemedView
          style={[
            styles.container, { borderColor: borderColorItem, backgroundColor: backgroundItem },
          ]}
        >
          <WalletsInfo
            wallets={user.financeWallets}
            index={index}
            onChangeWallet={(i) => setIndex(i)}
          />
        </ThemedView>

        <ThemedView
          style={[
            styles.container, { borderColor: borderColorItem, backgroundColor: backgroundItem },
          ]}
        >
          <CustomBarGraph values={user.financeWallets[index].monthReport} />

        </ThemedView>

        <ThemedView
          style={[
            styles.container, { borderColor: borderColorItem, backgroundColor: backgroundItem },
          ]}
        >

        </ThemedView>

      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    maxHeight: 300
  },
});