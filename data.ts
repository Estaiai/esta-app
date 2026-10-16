export type Place = {
  id: string;
  name: string;
  category: string;
  rating: number;
  emoji: string;
  color: string;
  address: string;
  hours: string;
  description: string;
};

export const places: Place[] = [
  { id: '1', name: 'Coffee House', category: 'Кофейня', rating: 4.8, emoji: '☕', color: '#F3E5FA',
    address: 'ул. Абая, 12', hours: '08:00 – 23:00',
    description: 'Уютная кофейня со свежей выпечкой и авторскими напитками.' },
  { id: '2', name: 'Sushi Master', category: 'Японская кухня', rating: 4.6, emoji: '🍣', color: '#FDE7E9',
    address: 'пр. Достык, 45', hours: '11:00 – 00:00',
    description: 'Свежие роллы и суши, доставка и зал на 40 мест.' },
  { id: '3', name: 'Burger Town', category: 'Фастфуд', rating: 4.4, emoji: '🍔', color: '#FFF3D6',
    address: 'ул. Сатпаева, 7', hours: '10:00 – 02:00',
    description: 'Сочные бургеры из мраморной говядины и картофель фри.' },
  { id: '4', name: 'Pizza Bella', category: 'Итальянская кухня', rating: 4.7, emoji: '🍕', color: '#E3F4E8',
    address: 'ул. Толе би, 90', hours: '10:00 – 23:30',
    description: 'Пицца на тонком тесте из дровяной печи и домашняя паста.' },
];