import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useOrbytColor } from '@/hooks/defaultColors';
import { SignInInteractor } from './signin/_signin.interactor';

export default function AppInitScreen() {
  const router = useRouter();
  const backgroundColor = useOrbytColor('background');
  const imageColor = useOrbytColor('primary');

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem('acces_taken');
        const remindMe = await AsyncStorage.getItem('remind_me');

        await new Promise(resolve => setTimeout(resolve, 1000));

        if (token && remindMe) {
          const interactor = new SignInInteractor();
          const successToken = await interactor.validateToken(token, remindMe);
          if (successToken) router.replace('/(tabs)/news');
          else router.replace('/signin');
        } else {
          router.replace('/signin');
        }

      } catch (error) {
        console.error('Erro ao verificar login:', error);
        router.replace('/signin');
      }
    };

    checkLogin();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Image
        source={require('@/assets/images/whiteIcon.png')}
        style={[styles.logo, { tintColor: imageColor }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: { width: 120, height: 120 },
});
