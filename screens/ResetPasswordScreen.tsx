import React, { useState } from 'react';
import AuthScreen from '../components/AuthScreen';
import Input from '../components/Input';
import Button from '../components/Button';
import { notify } from '../utils';

export default function ResetPasswordScreen({ navigation }: any) {
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');

  const onContinue = () => {
    if (password.length < 8) {
      notify('Ошибка', 'Пароль должен быть не менее 8 символов');
      return;
    }
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      notify('Ошибка', 'Нужны прописные и строчные буквы');
      return;
    }
    if (password !== repeat) {
      notify('Ошибка', 'Пароли не совпадают');
      return;
    }
    notify('Успешно', 'Пароль изменён');
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <AuthScreen center title="Сбросить пароль"
      subtitle={'Не менее 8 символов, с\nпрописными и строчными буквами'}>
      <Input icon="lock-closed" placeholder="Пароль" secure
        value={password} onChangeText={setPassword} />
      <Input icon="lock-closed" placeholder="Повторить пароль" secure
        value={repeat} onChangeText={setRepeat} />
      <Button title="Продолжить" onPress={onContinue} style={{ marginTop: 10 }} />
    </AuthScreen>
  );
}