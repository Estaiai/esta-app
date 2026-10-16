import { Alert, Platform } from 'react-native';

export function notify(title: string, message?: string) {
  if (Platform.OS === 'web') {
    (globalThis as any).alert(message ? `${title}\n${message}` : title);
  } else {
    Alert.alert(title, message);
  }
}