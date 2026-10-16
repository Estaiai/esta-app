import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import AuthScreen from '../components/AuthScreen';
import Input from '../components/Input';
import Button from '../components/Button';
import { C } from '../theme';

export default function LoginScreen({ navigation }: any) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  };

  return (
    <AuthScreen title="Привет, с возвращением!" subtitle="Войдите в свой аккаунт">
      <Input icon="call" placeholder="Номер телефона" keyboardType="phone-pad"
        value={phone} onChangeText={setPhone} />
      <Input icon="lock-closed" placeholder="Пароль" secure
        value={password} onChangeText={setPassword} />

      <Pressable style={styles.forgot} onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.link}>Забыл пароль?</Text>
      </Pressable>

      <Button title="Войти" onPress={onLogin} />

      <View style={styles.bottom}>
        <Text style={styles.muted}>У вас нет аккаунта?</Text>
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Зарегистрироваться</Text>
        </Pressable>
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  forgot: { alignSelf: 'flex-end', marginBottom: 24 },
  link: { color: C.primary, fontSize: 13, fontWeight: '600' },
  muted: { color: C.muted, fontSize: 13 },
  bottom: { alignItems: 'center', marginTop: 24, gap: 4 },
});