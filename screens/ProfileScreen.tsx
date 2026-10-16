import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../theme';

type RowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  onPress?: () => void;
  danger?: boolean;
};

function Row({ icon, label, value, onPress, danger }: RowProps) {
  return (
    <Pressable style={styles.row} onPress={onPress} disabled={!onPress}>
      <View style={[styles.iconBox, danger && { backgroundColor: '#FDE7E9' }]}>
        <Ionicons name={icon} size={18} color={danger ? C.error : C.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.label, danger && { color: C.error }]}>{label}</Text>
        {!!value && <Text style={styles.value}>{value}</Text>}
      </View>
      {onPress && !danger && <Ionicons name="chevron-forward" size={18} color={C.muted} />}
    </Pressable>
  );
}

export default function ProfileScreen({ navigation, route }: any) {
  const { name = 'Гость', phone = '+7 (700) 555 77 55', city = 'Алматы' } = route?.params ?? {};

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.top}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="arrow-back" size={22} color={C.text} />
        </Pressable>
        <Text style={styles.topTitle}>Профиль</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.avatarWrap}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{(name[0] || 'Г').toUpperCase()}</Text>
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.phone}>{phone}</Text>
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <Row icon="location" label="Город" value={city} onPress={() => navigation.navigate('City')} />
        <Row icon="call" label="Телефон" value={phone} />
        <Row icon="lock-closed" label="Сменить пароль" onPress={() => navigation.navigate('ResetPassword')} />
        <Row icon="log-out" label="Выйти" danger
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.white },
  top: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, height: 48,
  },
  topTitle: { fontSize: 17, fontWeight: '700', color: C.text },
  avatarWrap: { alignItems: 'center', marginVertical: 28 },
  avatar: {
    width: 92, height: 92, borderRadius: 46, backgroundColor: C.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 36, fontWeight: '700', color: C.white },
  name: { fontSize: 20, fontWeight: '700', color: C.text, marginTop: 14 },
  phone: { fontSize: 14, color: C.muted, marginTop: 4 },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: '#F0F0F3',
  },
  iconBox: {
    width: 38, height: 38, borderRadius: 10, backgroundColor: C.primaryLight,
    alignItems: 'center', justifyContent: 'center',
  },
  label: { fontSize: 15, fontWeight: '600', color: C.text },
  value: { fontSize: 13, color: C.muted, marginTop: 2 },
});