import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AuthScreen from '../components/AuthScreen';
import Button from '../components/Button';
import { C } from '../theme';

const CITIES = ['Алматы', 'Астана', 'Шымкент', 'Караганда', 'Актобе', 'Атырау'];

export default function CityScreen({ navigation, route }: any) {
  const { name = '', phone = '' } = route?.params ?? {};
  const [city, setCity] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <AuthScreen
      title="Выберите город"
      subtitle={'Заведения которые будут показываться\nвам, будут зависеть от вашего города.'}
    >
      <Pressable style={styles.select} onPress={() => setOpen(!open)}>
        <Text style={[styles.selectText, !city && { color: C.muted }]}>
          {city || 'Выбрать город'}
        </Text>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={18} color={C.primary} />
      </Pressable>

      {open && (
        <View style={styles.list}>
          {CITIES.map((c) => (
            <Pressable key={c} style={styles.item} onPress={() => { setCity(c); setOpen(false); }}>
              <Text style={[styles.itemText, c === city && { color: C.primary, fontWeight: '700' }]}>
                {c}
              </Text>
              {c === city && <Ionicons name="checkmark" size={18} color={C.primary} />}
            </Pressable>
          ))}
        </View>
      )}

      <View style={{ flex: 1, minHeight: 40 }} />

      <Button
        title="Продолжить"
        disabled={!city}
        onPress={() =>
          navigation.reset({ index: 0, routes: [{ name: 'Home', params: { name, phone, city } }] })
        }
      />
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  select: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: C.inputBg, borderRadius: 12, height: 52, paddingHorizontal: 14,
  },
  selectText: { fontSize: 15, color: C.text },
  list: { backgroundColor: C.white, borderRadius: 12, marginTop: 8, borderWidth: 1, borderColor: '#ECECEF' },
  item: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 14,
  },
  itemText: { fontSize: 15, color: C.text },
});