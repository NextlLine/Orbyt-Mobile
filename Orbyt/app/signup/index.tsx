import { observer } from "mobx-react-lite";
import { useOrbytColor } from '@/hooks/defaultColors';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SignUpInteractor } from './_signup.interactor';

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
    if (ok) router.replace('/signin');
  };


  return (
    <View style={{ flex: 1, backgroundColor: bgColor, justifyContent: 'center', paddingHorizontal: 24, paddingTop: Platform.OS === 'android' ? 24 : 0 }}>
      <Text style={{ fontSize: 28, fontWeight: '700', color: textColor, marginBottom: 16 }}>Create account</Text>

      <TextInput
        value={interactor.entity.name}
        onChangeText={text => interactor.entity.setName(text)}
        placeholder="Name"
        placeholderTextColor={secondary}
        style={{ backgroundColor: itemBg, borderColor, borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12, color: textColor }}
      />

      <TextInput
        value={interactor.entity.doc}
        onChangeText={text => interactor.entity.setDoc(text)}
        placeholder="CPF"
        keyboardType="numeric"
        placeholderTextColor={secondary}
        style={{ backgroundColor: itemBg, borderColor, borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12, color: textColor }}
      />

      <TextInput
        value={interactor.entity.email}
        onChangeText={text => interactor.entity.setEmail(text)}
        placeholder="E-mail"
        placeholderTextColor={secondary}
        style={{ backgroundColor: itemBg, borderColor, borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12, color: textColor }}
      />

      <TextInput
        value={interactor.entity.password}
        onChangeText={text => interactor.entity.setPassword(text)}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="password"
        placeholderTextColor={secondary}
        style={{ backgroundColor: itemBg, borderColor, borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12, color: textColor }}
      />

      <TextInput
        value={interactor.entity.confirmPassword}
        onChangeText={text => interactor.entity.setConfirmPassword(text)}
        placeholder="Confirm password"
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="password"
        placeholderTextColor={secondary}
        style={{ backgroundColor: itemBg, borderColor, borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12, color: textColor }}
      />

      <TouchableOpacity
        onPress={onSubmit}
        style={{ backgroundColor: mainColor, borderRadius: 8, padding: 14, alignItems: 'center', opacity: interactor.entity.loading ? 0.7 : 1 }}
      >
        <Text style={{ color: '#fff', fontWeight: '600' }}>{interactor.entity.loading ? 'Creating...' : 'Create account'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.back()}
        style={{ marginTop: 16, alignItems: 'center' }}
      >
        <Text style={{ color: textColor }}>
          Already have an account?{' '}
          <Text style={{ fontWeight: '700', textDecorationLine: 'underline' }}>Sign in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
});
