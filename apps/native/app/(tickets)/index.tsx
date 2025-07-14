import { useCallback, useEffect, useRef, useState } from 'react';
import { type LayoutChangeEvent, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import FlipCard, { type FlipCardHandle } from '@/features/buy-tickets/components/flip-card';
import FlippedCard from '@/features/buy-tickets/components/flipped-card';
import { useRouter } from 'expo-router';

const cards = Array.from({ length: 7 }, (_, index) => ({
  id: index,
  title: `${index + 1}`,
  description: `Card ${index + 1} description`,
}));

const RegularContent = () => {
  return (
    <View className="flex flex-1 items-center justify-center rounded-lg bg-grun-50 p-4">
      <Text className="text-4xl text-white">?</Text>
    </View>
  );
};

const TicketsScreen = () => {
  const router = useRouter();
  const cardRefs = useRef<FlipCardHandle[]>([]);
  const [disabled, setDisabled] = useState(true);
  const isAnimating = useRef(false);
  const containerRef = useRef<View>(null);

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
      setDisabled(false);
    }
  }, []);

  const handleFlipEnd = useCallback(
    (id: number) => () => {
      router.replace({
        pathname: '/acquisition-result',
        params: {
          id,
        },
      });
    },
    [router],
  );

  useEffect(() => {
    // 초기 마운트 후 애니메이션 실행
    const timeoutId = setTimeout(playCardAnimation, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <Text className="text-center text-4xl">골라 골라</Text>
      <View ref={containerRef} className="mt-40 flex w-full flex-row flex-wrap justify-center gap-4 px-4">
        {cards.map((card, index) => (
          <View key={card.id}>
            <FlipCard
              disabled={disabled}
              cardStyle={styles.flipCard}
              FlippedContent={<FlippedCard title={card.title} />}
              RegularContent={<RegularContent />}
              index={index}
              ref={(el) => {
                if (el) cardRefs.current[index] = el;
              }}
              onFlipEnd={handleFlipEnd(card.id)}
            />
          </View>
        ))}
      </View>
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
    width: 80,
    height: 120,
    backfaceVisibility: 'hidden',
  },
});

export default TicketsScreen;
