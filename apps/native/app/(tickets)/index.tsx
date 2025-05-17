import { useRef, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import FlipCard from '@/features/buy-tickets/components/flip-card';

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
  const [isGathering, setIsGathering] = useState(false);
  const containerRef = useRef<View>(null);
  const cardRefs = useRef<View[]>([]);

  const handleGatherCards = () => {
    setIsGathering(!isGathering);
  };

  const getContainerSize = () => {
    if (!containerRef.current) return { width: 0, height: 0 };
    const size = { width: 0, height: 0 };
    containerRef.current.measure((x, y, width, height) => {
      size.width = width;
      size.height = height;
    });
    return size;
  };

  const getCardPosition = (index: number) => {
    const cardRef = cardRefs.current[index];
    if (!cardRef) return { x: 0, y: 0 };

    const position = { x: 0, y: 0 };
    cardRef.measure((x, y) => {
      position.x = x;
      position.y = y;
    });

    return position;
  };

  return (
    <SafeAreaView className="flex-1 border">
      <View ref={containerRef} className="flex w-full flex-row flex-wrap justify-center gap-4 border px-4">
        {cards.map((card, index) => (
          <View
            key={card.id}
            ref={(ref) => {
              if (ref) cardRefs.current[index] = ref;
            }}
          >
            <FlipCard
              cardStyle={styles.flipCard}
              FlippedContent={<FlippedContent card={card} />}
              RegularContent={<RegularContent />}
              index={index}
              isGathering={isGathering}
              containerWidth={getContainerSize().width}
              containerHeight={getContainerSize().height}
              initialPosition={getCardPosition(index)}
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
