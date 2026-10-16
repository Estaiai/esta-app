import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../theme';

type Props = TextInputProps & {
  icon?: keyof typeof Ionicons.glyphMap;
  secure?: boolean;
};

export default function Input({ icon, secure = false, onChangeText, ...rest }: Props) {
  const [focused, setFocused] = useState(false);
  const active = focused || !!rest.value;

  // Поле телефона: только цифры (и +)
  const isPhone = rest.keyboardType === 'phone-pad';
  const handleChange = (text: string) => {
    onChangeText?.(isPhone ? text.replace(/[^\d+]/g, '') : text);
  };

  // У пароля иконку (замок) не показываем
  const showIcon = !!icon && !secure;

  return (
    <View style={[styles.box, focused && styles.focused]}>
      {showIcon && (
        <Ionicons
          name={icon}
          size={18}
          color={active ? C.primary : C.muted}
          style={{ marginRight: 10 }}
        />
      )}
      <TextInput
        {...rest}
        onChangeText={handleChange}
        inputMode={isPhone ? 'tel' : undefined}
        secureTextEntry={secure}
        autoComplete={secure ? 'new-password' : 'off'}
        autoCorrect={false}
        importantForAutofill="no"
        textContentType="none"
        placeholderTextColor={C.muted}
        autoCapitalize="none"
        style={styles.input}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.inputBg,
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  focused: { borderColor: C.primary, backgroundColor: C.white },
  input: { flex: 1, fontSize: 15, color: C.text },
});