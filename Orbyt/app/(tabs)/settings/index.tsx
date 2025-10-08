import { Dimensions, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import ParallaxScrollView from "@/components/util/parallax-scroll-view";
import React, { useState } from "react";
import { useOrbytColor } from "@/hooks/defaultColors";
import { mockUser } from "@/model/mockUser";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get("window");

export default function Settings() {
  const [index, setIndex] = useState(0);
  const user = mockUser;
  const borderColorItem = useOrbytColor('borderItem');
  const backgroundItem = useOrbytColor('backgroundItem');
  const textColor = useOrbytColor('text');
  const router = useRouter();

  const signOut = async () => {
    await AsyncStorage.removeItem('acces_taken');
    await AsyncStorage.removeItem('remind_me');
    router.replace('/signin'); 
  };

  return (
    <ParallaxScrollView>
      <View style={{ padding: 16 }}>

        <TouchableOpacity
          onPress={signOut}
          style={{
            backgroundColor: 'red',
            padding: 14,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 20
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '700' }}>Sair da conta</Text>
        </TouchableOpacity>
      </View>
    </ParallaxScrollView>
  );
}
