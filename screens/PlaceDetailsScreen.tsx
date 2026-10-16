import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import { C } from '../theme';
import { notify } from '../utils';

export default function PlaceDetailsScreen({ navigation, route }: any) {
  const place = route?.params?.place;
  const [liked, setLiked] = useState(false);

  if (!place) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={{ padding: 20 }}>Заведение не найдено</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.cover, { backgroundColor: place.color }]}>
          <Pressable style={[styles.round, styles.backBtn]} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color={C.text} />
          </Pressable>
          <Pressable style={[styles.round, styles.heartBtn]} onPress={() => setLiked(!liked)}>
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={20}
              color={liked ? C.error : C.text}
            />
          </Pressable>
          <Text style={{ fontSize: 80 }}>{place.emoji}</Text>
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>{place.name}</Text>
          <Text style={styles.cat}>{place.category}</Text>

          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color="#FFB400" />
            <Text style={styles.rating}>{place.rating}</Text>
          </View>

          <Text style={styles.desc}>{place.description}</Text>

          <View style={styles.infoRow}>
            <Ionicons name="location" size={18} color={C.primary} />
            <Text style={styles.info}>{place.address}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="time" size={18} color={C.primary} />
            <Text style={styles.info}>{place.hours}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Забронировать столик"
          onPress={() => notify('Готово', `Столик в «${place.name}» забронирован`)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.white },
  cover: { height: 260, alignItems: 'center', justifyContent: 'center' },
  round: {
    position: 'absolute', top: 16, width: 44, height: 44, borderRadius: 22,
    backgroundColor: C.white, alignItems: 'center', justifyContent: 'center', zIndex: 10,
  },
  backBtn: { left: 16 },
  heartBtn: { right: 16 },
  body: { padding: 20 },
  title: { fontSize: 24, fontWeight: '700', color: C.text },
  cat: { fontSize: 14, color: C.muted, marginTop: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10 },
  rating: { fontSize: 15, fontWeight: '600', color: C.text },
  desc: { fontSize: 14, color: C.text, lineHeight: 21, marginVertical: 18 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  info: { fontSize: 14, color: C.text },
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#ECECEF' },
});