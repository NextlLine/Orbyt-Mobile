import { observer } from "mobx-react-lite";
import { useOrbytColor } from '@/hooks/defaultColors';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SignUpInteractor } from './signup.interactor';

const interactor = new SignUpInteractor();

export default observer(function SignUpScreen() {
  const router = useRouter();

  const bgColor = useOrbytColor('background');
  const textColor = useOrbytColor('text');
  const mainColor = useOrbytColor('main');
  const itemBg = useOrbytColor('backgroundItem');
  const borderColor = useOrbytColor('borderItem');
  const secondary = useOrbytColor('secondary');

  const onSubmit = async () => {
    const ok = await interactor.onSubmit();
    if (ok) router.back(); 
  };


  return (
    <View style={{ flex: 1, backgroundColor: bgColor, justifyContent: 'center', paddingHorizontal: 24, paddingTop: Platform.OS === 'android' ? 24 : 0 }}>
      <Text style={{ fontSize: 28, fontWeight: '700', color: textColor, marginBottom: 16 }}>Crie sua conta</Text>

      <TextInput
        value={interactor.entity.name}
        onChangeText={text => interactor.entity.name = text}
        placeholder="Nome"
        placeholderTextColor={secondary}
        style={{ backgroundColor: itemBg, borderColor, borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12, color: textColor }}
      />

      <TextInput
        value={interactor.entity.doc}
        onChangeText={text => interactor.entity.doc = text}
        placeholder="CPF"
        keyboardType="numeric"
        placeholderTextColor={secondary}
        style={{ backgroundColor: itemBg, borderColor, borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12, color: textColor }}
      />

      <TextInput
        value={interactor.entity.email}
        onChangeText={text => interactor.entity.email = text}
        placeholder="E-mail"
        placeholderTextColor={secondary}
        style={{ backgroundColor: itemBg, borderColor, borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12, color: textColor }}
      />

      <TextInput
        value={interactor.entity.password}
        onChangeText={text => interactor.entity.password = text}
        placeholder="Senha"
        secureTextEntry
        placeholderTextColor={secondary}
        style={{ backgroundColor: itemBg, borderColor, borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12, color: textColor }}
      />

      <TextInput
        value={interactor.entity.confirmPassword}
        onChangeText={text => interactor.entity.confirmPassword = text}
        placeholder="Confirme a senha"
        secureTextEntry
        placeholderTextColor={secondary}
        style={{ backgroundColor: itemBg, borderColor, borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12, color: textColor }}
      />

      <TouchableOpacity
        onPress={onSubmit}
        style={{ backgroundColor: mainColor, borderRadius: 8, padding: 14, alignItems: 'center', opacity: interactor.entity.loading ? 0.7 : 1 }}
      >
        <Text style={{ color: '#fff', fontWeight: '600' }}>{interactor.entity.loading ? 'Criando...' : 'Criar conta'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.back()}
        style={{ marginTop: 16, alignItems: 'center' }}
      >
        <Text style={{ color: textColor }}>
          Já tem conta?{' '}
          <Text style={{ fontWeight: '700', textDecorationLine: 'underline' }}>Entrar</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
});
