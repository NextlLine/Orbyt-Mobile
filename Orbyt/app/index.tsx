import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SignInInteractor } from './signin/signin.interactor';

export default function AppInitScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem('acces_taken');
        const remindMe = await AsyncStorage.getItem('remind_me');

        await new Promise(resolve => setTimeout(resolve, 1000)); // splash delay

        if (token && remindMe) {
          router.replace('/(tabs)/news');
        } else if (remindMe) {
          const interactor = new SignInInteractor();
          const successToken = await interactor.loginWithStored(remindMe); 
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
    <View
      style={[
        styles.container,
        { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' },
      ]}
    >
      <Image
        source={require('@/assets/images/whiteIcon.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: { width: 120, height: 120 },
});
