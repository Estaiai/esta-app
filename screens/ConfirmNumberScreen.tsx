import React, { useRef, useState } from 'react';
import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import AuthScreen from '../components/AuthScreen';
import Button from '../components/Button';
import { C } from '../theme';
import { notify } from '../utils';

export default function ConfirmNumberScreen({ navigation, route }: any) {
  const phone = route?.params?.phone || '+7 (700) 555 77 55';
  const [code, setCode] = useState(['', '', '', '']);
  const refs = useRef<(TextInput | null)[]>([]);

  const onChange = (text: string, i: number) => {
    const digit = text.replace(/\D/g, '').slice(-1);
    const copy = [...code];
    copy[i] = digit;
    setCode(copy);
    if (digit && i < 3) refs.current[i + 1]?.focus();
  };

  const onKeyPress = (key: string, i: number) => {
    if (key === 'Backspace' && !code[i] && i > 0) refs.current[i - 1]?.focus();
  };

  return (
    <AuthScreen center title="Подтвердить номер"
      subtitle={`Мы только что отправили код на\n${phone}`}>
      <View style={styles.row}>
        {code.map((c, i) => (
          <TextInput
            key={i}
            ref={(r) => { refs.current[i] = r; }}
            value={c}
            onChangeText={(t) => onChange(t, i)}
            onKeyPress={(e) => onKeyPress(e.nativeEvent.key, i)}
            keyboardType="number-pad"
            maxLength={1}
            style={[styles.box, !!c && styles.boxFilled]}
          />
        ))}
      </View>

      <Button
        title="Продолжить"
        disabled={!code.every((c) => c !== '')}
        onPress={() => navigation.navigate('ResetPassword')}
      />

      <Pressable style={{ alignItems: 'center', marginTop: 20 }}
        onPress={() => notify('Готово', 'Код отправлен повторно')}>
        <Text style={styles.resend}>Отправить код еще раз</Text>
      </Pressable>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginBottom: 24 },
  box: {
    width: 56, height: 56, borderRadius: 12, backgroundColor: C.inputBg,
    textAlign: 'center', fontSize: 22, fontWeight: '700', color: C.text,
    borderWidth: 1, borderColor: 'transparent',
  },
  boxFilled: { borderColor: C.primary, backgroundColor: C.white },
  resend: { color: C.muted, fontSize: 13, textDecorationLine: 'underline' },
});