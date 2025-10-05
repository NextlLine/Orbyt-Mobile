import { StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/util/parallax-scroll-view";
import React, { useState } from "react";
import { useOrbytColor } from "@/hooks/defaultColors";
import { mockUser } from "@/model/mockUser";
import { ThemedText } from "@/components/util/themed-text";
import CustomBarGraph from "@/components/util/barGraph";
import { ThemedView } from "@/components/util/themed-view";
import FinanceCarousel from "@/components/finance/carousel_component";
import WalletsInfo from "@/components/news/wallet_info";

export default function NewsScreen() {
  const [index, setIndex] = useState(0);
  const user = mockUser;
  const borderColorItem = useOrbytColor('borderItem')
  const backgroundItem = useOrbytColor('backgroundItem')

  return (
    <ParallaxScrollView >
      <ThemedText type="title">Hello, {user.name}!</ThemedText>

      {/* <ThemedView
        style={[
          styles.container, { borderColor: borderColorItem, backgroundColor: backgroundItem },
        ]}
      >
        <WalletsInfo
          wallets={user.financeWallets}
          index={index}
          onChangeWallet={(i) => setIndex(i)}
        />
      </ThemedView> */}

    </ParallaxScrollView>
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
