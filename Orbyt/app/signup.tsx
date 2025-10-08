import { useOrbytColor } from '@/hooks/defaultColors';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import env from '@/config/env';


export default function SignUpScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [doc, setDoc] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const bgColor = useOrbytColor('background');
  const textColor = useOrbytColor('text');
  const mainColor = useOrbytColor('main');
  const itemBg = useOrbytColor('backgroundItem');
  const borderColor = useOrbytColor('borderItem');
  const secondary = useOrbytColor('secondary');

  const validate = () => {
    if (!name.trim()) return 'Informe seu nome.';
    if (!doc.trim()) return 'Informe seu CPF.';
    if (!email.trim()) return 'Preencha o e-mail.';
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(email)) return 'E-mail inválido.';
    if (password.length < 6) return 'A senha deve ter pelo menos 6 caracteres.';
    if (password !== confirmPassword) return 'As senhas não coincidem.';
    return null;
  };

  const onSubmit = async () => {
    const err = validate();
    if (err) return Alert.alert('Erro', err);

    setLoading(true);
    try {
      const response = await fetch(`${env.BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, hash: password, doc }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Erro ao criar conta.');
      }

      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      router.back();

      setName('');
      setDoc('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (e: unknown) {
      if (e instanceof Error) Alert.alert('Erro', e.message);
      else Alert.alert('Erro', 'Ocorreu um erro desconhecido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: bgColor, justifyContent: 'center', paddingHorizontal: 24, paddingTop: Platform.OS === 'android' ? 24 : 0 }}>
      <Text style={{ fontSize: 28, fontWeight: '700', color: textColor, marginBottom: 16 }}>Crie sua conta</Text>

      <TextInput value={name} onChangeText={setName} placeholder="Nome" placeholderTextColor={secondary}
        style={{ backgroundColor: itemBg, borderColor, borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12, color: textColor }} />
      <TextInput value={doc} onChangeText={setDoc} placeholder="CPF" placeholderTextColor={secondary} keyboardType="numeric"
        style={{ backgroundColor: itemBg, borderColor, borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12, color: textColor }} />
      <TextInput value={email} onChangeText={setEmail} placeholder="E-mail" placeholderTextColor={secondary}
        style={{ backgroundColor: itemBg, borderColor, borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12, color: textColor }} />
      <TextInput value={password} onChangeText={setPassword} placeholder="Senha" secureTextEntry placeholderTextColor={secondary}
        style={{ backgroundColor: itemBg, borderColor, borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12, color: textColor }} />
      <TextInput value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Confirme a senha" secureTextEntry placeholderTextColor={secondary}
        style={{ backgroundColor: itemBg, borderColor, borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12, color: textColor }} />

      <TouchableOpacity onPress={onSubmit} style={{ backgroundColor: mainColor, borderRadius: 8, padding: 14, alignItems: 'center', opacity: loading ? 0.7 : 1 }}>
        <Text style={{ color: '#fff', fontWeight: '600' }}>{loading ? 'Criando...' : 'Criar conta'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 16, alignItems: 'center' }}>
        <Text style={{ color: textColor }}>
          Já tem conta?{' '}
          <Text style={{ fontWeight: '700', textDecorationLine: 'underline' }}>
            Entrar
          </Text>
        </Text>

      </TouchableOpacity>
    </View>
  );
}
