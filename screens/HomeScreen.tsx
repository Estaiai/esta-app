import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { places } from '../data';
import { C } from '../theme';

export default function HomeScreen({ navigation, route }: any) {
  const { name = '', phone = '', city = 'Алматы' } = route?.params ?? {};
  const [query, setQuery] = useState('');

  const data = places.filter((p) =>
    p.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View>
          <Text style={styles.hello}>Привет{name ? `, ${name}` : ''}! 👋</Text>
          <View style={styles.cityRow}>
            <Ionicons name="location" size={14} color={C.primary} />
            <Text style={styles.city}>{city}</Text>
          </View>
        </View>
        <Pressable
          style={styles.avatar}
          onPress={() => navigation.navigate('Profile', { name, phone, city })}
        >
          <Ionicons name="person" size={20} color={C.primary} />
        </Pressable>
      </View>

      <View style={styles.search}>
        <Ionicons name="search" size={18} color={C.muted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Поиск заведений"
          placeholderTextColor={C.muted}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <Text style={styles.section}>Заведения рядом</Text>

      <FlatList
        data={data}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.empty}>Ничего не найдено</Text>}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate('PlaceDetails', { place: item })}
          >
            <View style={[styles.thumb, { backgroundColor: item.color }]}>
              <Text style={{ fontSize: 34 }}>{item.emoji}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.cat}>{item.category}</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#FFB400" />
                <Text style={styles.rating}>{item.rating}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={C.muted} />
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.white },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 12,
  },
  hello: { fontSize: 20, fontWeight: '700', color: C.text },
  cityRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  city: { fontSize: 13, color: C.muted },
  avatar: {
    width: 42, height: 42, borderRadius: 21, backgroundColor: C.primaryLight,
    alignItems: 'center', justifyContent: 'center',
  },
  search: {
    flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: C.inputBg,
    borderRadius: 12, height: 48, paddingHorizontal: 14, marginHorizontal: 20, marginTop: 20,
  },
  searchInput: { flex: 1, fontSize: 15, color: C.text },
  section: { fontSize: 17, fontWeight: '700', color: C.text, margin: 20, marginBottom: 12 },
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 14, padding: 12, marginBottom: 12,
    borderRadius: 16, backgroundColor: C.white, borderWidth: 1, borderColor: '#ECECEF',
  },
  thumb: { width: 72, height: 72, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: '700', color: C.text },
  cat: { fontSize: 13, color: C.muted, marginTop: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  rating: { fontSize: 13, fontWeight: '600', color: C.text },
  empty: { textAlign: 'center', color: C.muted, marginTop: 40 },
});