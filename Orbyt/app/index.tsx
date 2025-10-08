import { useOrbytColor } from '@/hooks/defaultColors';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import env from '@/config/env';



export default function SignInScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const bgColor = useOrbytColor('background');
  const textColor = useOrbytColor('text');
  const mainColor = useOrbytColor('main');
  const itemBg = useOrbytColor('backgroundItem');
  const borderColor = useOrbytColor('borderItem');
  const secondary = useOrbytColor('secondary');

  const validate = () => {
    if (!email.trim()) return 'Preencha o e-mail.';
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(email)) return 'E-mail inválido.';
    if (password.length < 6) return 'A senha deve ter pelo menos 6 caracteres.';
    return null;
  };

  const onSubmit = async () => {
    const err = validate();
    if (err) return Alert.alert('Erro', err);

    setLoading(true);
    console.log(env.BASE_URL)
    try {
      const response = await fetch(`${env.BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, hash: password }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data?.message || 'Erro ao fazer login.');
      if (!data.acces_taken) throw new Error('Token não retornado pela API.');

      await AsyncStorage.setItem('acces_taken', data.acces_taken);
      router.replace('/(tabs)'); 
    } catch (e: unknown) {
      if (e instanceof Error) Alert.alert('Erro', e.message);
      else Alert.alert('Erro', 'Ocorreu um erro desconhecido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: bgColor, justifyContent: 'center', paddingHorizontal: 24, paddingTop: Platform.OS === 'android' ? 24 : 0 }}>
      <Text style={{ fontSize: 28, fontWeight: '700', color: textColor, marginBottom: 16 }}>Bem-vindo de volta</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
        placeholderTextColor={secondary}
        style={{ backgroundColor: itemBg, borderColor, borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12, color: textColor }}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Senha"
        secureTextEntry
        placeholderTextColor={secondary}
        style={{ backgroundColor: itemBg, borderColor, borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12, color: textColor }}
      />
      <TouchableOpacity onPress={onSubmit} style={{ backgroundColor: mainColor, borderRadius: 8, padding: 14, alignItems: 'center', opacity: loading ? 0.7 : 1 }}>
        <Text style={{ color: '#fff', fontWeight: '600' }}>{loading ? 'Entrando...' : 'Entrar'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/signup')} style={{ marginTop: 16, alignItems: 'center' }}>
        <Text style={{ color: textColor }}>
          Ainda não tem conta?{' '}
          <Text style={{ fontWeight: '700', textDecorationLine: 'underline'}}>
            Criar conta
          </Text>
        </Text>

      </TouchableOpacity>
    </View>
  );
}
