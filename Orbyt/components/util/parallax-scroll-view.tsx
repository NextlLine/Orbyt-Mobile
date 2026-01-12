import { Dimensions, StyleSheet, View, RefreshControlProps } from "react-native";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import { ThemedView } from "@/components/util/themed-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { PropsWithChildren } from "react";
import { useOrbytColor } from "@/hooks/defaultColors";

export const SCREEN_SIZE = Dimensions.get("window");

interface ParallaxScrollViewProps extends PropsWithChildren {
  refreshControl?: React.ReactElement<RefreshControlProps>;
}

export default function ParallaxScrollView({
  children,
  refreshControl,
}: ParallaxScrollViewProps) {
  const backgroundColor = useOrbytColor("background");
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ backgroundColor, flex: 1 }}>
      <Animated.ScrollView
        ref={scrollRef}
        style={{ marginTop: insets.top }}
        scrollEventThrottle={10}
        showsVerticalScrollIndicator={false}
        refreshControl={refreshControl}
      >
        <ThemedView style={[styles.content, { backgroundColor }]}>
          {children}
        </ThemedView>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 10,
    gap: 16,
    overflow: "hidden",
  },
});
