import { Dimensions, StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/util/parallax-scroll-view";
import { ThemedView } from "@/components/util/themed-view";
import React, { useState } from "react";
import AccountsInfo from "@/components/wallet/wallet_show_component";
import { useOrbytColor } from "@/hooks/defaultColors";
import FinanceCarousel from "@/components/finance/finance_carousel_component";
import { mockUser } from "@/model/mockUser";
import WalletTransactions from "@/components/util/transaction_history";
import { ThemedText } from "@/components/util/themed-text";
const { width } = Dimensions.get("window");

export default function Settings() {
  const [index, setIndex] = useState(0);
  const user = mockUser;
  const borderColorItem = useOrbytColor('borderItem')
  const backgroundItem = useOrbytColor('backgroundItem')

  return (
    <>
    <ParallaxScrollView>
        
    </ParallaxScrollView>
    </>
  );
}