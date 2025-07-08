import { useEffect, useRef, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import FlipCard, { type FlipCardHandle } from '@/features/buy-tickets/components/flip-card';

const cards = Array.from({ length: 6 }, (_, index) => ({
  id: index,
  title: `Card ${index + 1}`,
  description: `Card ${index + 1} description`,
}));

const RegularContent = () => {
  return (
    <View className="flex-1 rounded-lg bg-blue-500 p-4">
      <Text className="text-white">카드의 뒷면</Text>
    </View>
  );
};

const FlippedContent = ({ card }: { card: (typeof cards)[number] }) => {
  return (
    <View className="flex-1 rounded-lg bg-gelb-30 p-4">
      <Text className="text-white">{card.title}</Text>
    </View>
  );
};

export default function TicketsScreen() {
  const containerRef = useRef<View>(null);
  const cardRefs = useRef<FlipCardHandle[]>([]);

  const handleGatherCards = () => {
    for (const card of cardRefs.current) {
      card.toggleGatherCards();
    }
  };

  useEffect(() => {
    if (cardRefs.current.length === 0) return;
    const timeoutId = setTimeout(() => {
      handleGatherCards();
    }, 1000);

    const id = setTimeout(() => {
      handleGatherCards();
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(id);
    };
  }, []);

  return (
    <SafeAreaView className="flex-1 border">
      <View ref={containerRef} className="flex w-full flex-row flex-wrap justify-center gap-4 border px-4">
        {cards.map((card, index) => (
          <View key={card.id}>
            <FlipCard
              cardStyle={styles.flipCard}
              FlippedContent={<FlippedContent card={card} />}
              RegularContent={<RegularContent />}
              index={index}
              ref={(ref) => {
                if (ref) cardRefs.current[index] = ref;
              }}
            />
          </View>
        ))}
      </View>
      <Pressable onPress={handleGatherCards} className="mt-4">
        <Text>카드 모으기</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButton: {
    backgroundColor: '#b58df1',
    padding: 12,
    borderRadius: 48,
  },
  toggleButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  flipCard: {
    width: 120,
    height: 200,
    backfaceVisibility: 'hidden',
  },
});
