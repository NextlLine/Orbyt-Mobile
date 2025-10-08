import { Dimensions, StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/util/parallax-scroll-view";
import React, { useState } from "react";
import { useOrbytColor } from "@/hooks/defaultColors";
import { mockUser } from "@/model/mockUser";const { width } = Dimensions.get("window");

export default function Investment() {
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

} const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    maxHeight: 300
  },
});
