import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AuthScreen from '../components/AuthScreen';
import Input from '../components/Input';
import Button from '../components/Button';
import { C } from '../theme';
import { notify } from '../utils';

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);

  const onRegister = () => {
    if (!name.trim() || !phone.trim() || password.length < 6) {
      notify('Ошибка', 'Заполните все поля (пароль от 6 символов)');
      return;
    }
    if (!agree) {
      notify('Ошибка', 'Примите условия использования');
      return;
    }
    navigation.navigate('City', { name, phone });
  };

  return (
    <AuthScreen title="Регистрация" subtitle={'Создайте учетную запись,\nчтобы продолжить!'}>
      <Input icon="person" placeholder="Ваше имя" value={name} onChangeText={setName} />
      <Input icon="call" placeholder="Номер телефона" keyboardType="phone-pad"
        value={phone} onChangeText={setPhone} />
      <Input icon="lock-closed" placeholder="Пароль" secure
        value={password} onChangeText={setPassword} />

      <Pressable style={styles.agreeRow} onPress={() => setAgree(!agree)}>
        <View style={[styles.checkbox, agree && styles.checked]}>
          {agree && <Ionicons name="checkmark" size={14} color={C.white} />}
        </View>
        <Text style={styles.agreeText}>
          Создавая учетную запись, вы соглашаетесь с нашими{' '}
          <Text style={styles.link}>Условиями</Text> использования.
        </Text>
      </Pressable>

      <Button title="Зарегистрироваться" onPress={onRegister} />

      <View style={styles.bottom}>
        <Text style={styles.muted}>Уже есть аккаунт? </Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Войти</Text>
        </Pressable>
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  agreeRow: { flexDirection: 'row', alignItems: 'flex-start', marginVertical: 10, marginBottom: 22 },
  checkbox: {
    width: 20, height: 20, borderRadius: 5, borderWidth: 1.5, borderColor: C.muted,
    alignItems: 'center', justifyContent: 'center', marginRight: 10, marginTop: 1,
  },
  checked: { backgroundColor: C.primary, borderColor: C.primary },
  agreeText: { flex: 1, fontSize: 12, color: C.text, lineHeight: 17 },
  link: { color: C.primary, fontWeight: '600', fontSize: 12 },
  muted: { color: C.muted, fontSize: 12 },
  bottom: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
});