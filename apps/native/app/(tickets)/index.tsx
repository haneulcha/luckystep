import { useCallback, useEffect, useRef } from 'react';
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

const TicketsScreen = () => {
  const cardRefs = useRef<FlipCardHandle[]>([]);
  const isAnimating = useRef(false);

  const playCardAnimation = useCallback(async () => {
    if (isAnimating.current || cardRefs.current.length === 0) return;
    isAnimating.current = true;

    try {
      // 1. 카드 모으기
      await Promise.all(cardRefs.current.map((card) => card.toggleGatherCards()));

      // 2. 잠시 대기 (모인 상태 유지)
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 3. 카드 펼치기
      await Promise.all(cardRefs.current.map((card) => card.toggleGatherCards()));
    } finally {
      isAnimating.current = false;
    }
  }, []);

  useEffect(() => {
    // 초기 마운트 후 애니메이션 실행
    const timeoutId = setTimeout(playCardAnimation, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <SafeAreaView className="flex-1 border">
      <View className="flex w-full flex-row flex-wrap justify-center gap-4 border px-4">
        {cards.map((card, index) => (
          <View key={card.id}>
            <FlipCard
              cardStyle={styles.flipCard}
              FlippedContent={<FlippedContent card={card} />}
              RegularContent={<RegularContent />}
              index={index}
              ref={(el) => {
                if (el) cardRefs.current[index] = el;
              }}
            />
          </View>
        ))}
      </View>
      <Pressable onPress={playCardAnimation} className="mt-4">
        <Text>카드 모으기</Text>
      </Pressable>
    </SafeAreaView>
  );
};

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

export default TicketsScreen;
