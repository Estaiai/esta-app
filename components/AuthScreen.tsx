import React from 'react';
import {
  View, Text, Pressable, ScrollView,
  KeyboardAvoidingView, Platform, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { C } from '../theme';

type Props = {
  title: string;
  subtitle?: string;
  center?: boolean;
  children: React.ReactNode;
};

export default function AuthScreen({ title, subtitle, center, children }: Props) {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.backWrap}>
            {navigation.canGoBack() && (
              <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
                <Ionicons name="arrow-back" size={22} color={C.text} />
              </Pressable>
            )}
          </View>

          <View style={styles.head}>
            <Text style={[styles.title, center && { textAlign: 'center' }]}>{title}</Text>
            {!!subtitle && (
              <Text style={[styles.subtitle, center && { textAlign: 'center' }]}>{subtitle}</Text>
            )}
          </View>

          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.white },
  scroll: { paddingHorizontal: 20, paddingBottom: 30, flexGrow: 1 },
  backWrap: { height: 40, justifyContent: 'center', marginTop: 8 },
  head: { marginTop: 24, marginBottom: 24 },
  title: { fontSize: 22, fontWeight: '700', color: C.text },
  subtitle: { fontSize: 13, color: C.muted, marginTop: 6, lineHeight: 19 },
});