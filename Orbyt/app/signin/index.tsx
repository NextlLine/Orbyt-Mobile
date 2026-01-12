import { useOrbytColor } from '@/hooks/defaultColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Platform, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SignInInteractor } from './_signin.interactor';
import { runInAction } from 'mobx';

const interactor = new SignInInteractor();

export default observer(function SignInScreen() {
  const router = useRouter();
  const [remindMe, setRemindMe] = useState(false);

  const bgColor = useOrbytColor('background');
  const textColor = useOrbytColor('text');
  const mainColor = useOrbytColor('main');
  const itemBg = useOrbytColor('backgroundItem');
  const borderColor = useOrbytColor('borderItem');
  const secondary = useOrbytColor('secondary');

  const signin = async () => {
    const token = await interactor.signin();
    if (token) {
      if (remindMe) {
        await AsyncStorage.setItem('remind_me', interactor.entity.email);
        await AsyncStorage.setItem('acces_taken', token);
      } else {
        await AsyncStorage.removeItem('remind_me');
      }
      await AsyncStorage.setItem('acces_taken', token);
      router.replace('/(tabs)/news');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: bgColor, justifyContent: 'center', paddingHorizontal: 24, paddingTop: Platform.OS === 'android' ? 24 : 0 }}>
      <Text style={{ fontSize: 28, fontWeight: '700', color: textColor, marginBottom: 16 }}>Welcome back</Text>

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

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <Switch value={remindMe} onValueChange={setRemindMe} />
        <Text style={{ color: textColor, marginLeft: 8 }}>Remind me</Text>
      </View>

      <TouchableOpacity
        onPress={signin}
        style={{ backgroundColor: mainColor, borderRadius: 8, padding: 14, alignItems: 'center', opacity: interactor.entity.loading ? 0.7 : 1 }}
      >
        <Text style={{ color: '#fff', fontWeight: '600' }}>
          {interactor.entity.loading ? 'Loading...' : 'Load'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push('/signup')}
        style={{ marginTop: 16, alignItems: 'center' }}
      >
        <Text style={{ color: textColor }}>
          Have no account? <Text style={{ fontWeight: '700', textDecorationLine: 'underline' }}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
});