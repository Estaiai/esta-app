import React, { useState } from 'react';
import AuthScreen from '../components/AuthScreen';
import Input from '../components/Input';
import Button from '../components/Button';
import { notify } from '../utils';

export default function ForgotPasswordScreen({ navigation }: any) {
  const [phone, setPhone] = useState('');

  const onContinue = () => {
    if (phone.trim().length < 6) {
      notify('Ошибка', 'Введите корректный номер телефона');
      return;
    }
    navigation.navigate('ConfirmNumber', { phone });
  };

  return (
    <AuthScreen
      center
      title="Восстановление пароля"
      subtitle="Введите свой номер телефона, чтобы восстановить пароль"
    >
      <Input icon="call" placeholder="+7 (700) 555 77 55" keyboardType="phone-pad"
        value={phone} onChangeText={setPhone} />
      <Button title="Продолжить" onPress={onContinue} />
    </AuthScreen>
  );
}