import { Dimensions, StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/util/parallax-scroll-view";
import React, { useState } from "react";
import { useOrbytColor } from "@/hooks/defaultColors";
import { mockUser } from "@/model/mockUser";
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