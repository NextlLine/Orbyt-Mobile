import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function AppInitScreen() {

    const router = useRouter();
    const colorScheme = useColorScheme();

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const token = await AsyncStorage.getItem('access_token');
                await new Promise(resolve => setTimeout(resolve, 1000));

                if (token) {
                    router.replace('/(tabs)');
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 120,
    },
});
