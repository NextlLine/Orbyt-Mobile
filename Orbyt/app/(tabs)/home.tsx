import { Dimensions, StyleSheet } from "react-native";
import ParallaxScrollView, { SCREEN_SIZE } from "@/components/parallax-scroll-view";
import { ThemedView } from "@/components/themed-view";
import React, { useState } from "react";
import WalletsInfo from "@/components/home/wallet_show_component";
import { useOrbytColor } from "@/hooks/defaultColors";
import { ThemedText } from "@/components/themed-text";
import WalletCarousel from "@/components/home/wallet_carousel_component";
import { mockUser } from "@/model/mockUser";
const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const [index, setIndex] = useState(0);
  const user = mockUser;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ color: useOrbytColor("main") }}
    >
      <ThemedView
        style={[
          styles.container,
          { backgroundColor: useOrbytColor("backgroundItem") },
        ]}
      >
        <WalletsInfo
          wallets={user.wallets}
          index={index}
          onChangeWallet={(i) => setIndex(i)}
        />
      </ThemedView>

      <ThemedView
        style={[
          styles.container, { backgroundColor: useOrbytColor("backgroundItem") },
        ]}
      >
        <WalletCarousel wallet={user.wallets[index]} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    borderRadius: 10,
    // borderWidth: 0.5,
    maxHeight: 300
  },
});
