import type React from 'react';
import { Pressable, SafeAreaView, type StyleProp, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import Animated, {
  interpolate,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import FlipCard from '@/features/buy-tickets/components/flip-card';

const RegularContent = () => {
  return (
    <View className="flex-1 rounded-lg bg-blue-500 p-4">
      <Text className="text-white">Regular content ✨</Text>
    </View>
  );
};

const FlippedContent = () => {
  return (
    <View className="flex-1 rounded-lg bg-blue-500 p-4">
      <Text className="text-white">Flipped content 🚀</Text>
    </View>
  );
};

export default function App() {
  const isFlipped = useSharedValue(false);

  const handlePress = () => {
    isFlipped.value = !isFlipped.value;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlipCard
        isFlipped={isFlipped}
        cardStyle={styles.flipCard}
        FlippedContent={<FlippedContent />}
        RegularContent={<RegularContent />}
      />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.toggleButton} onPress={handlePress}>
          <Text style={styles.toggleButtonText}>Toggle card</Text>
        </Pressable>
      </View>
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
    width: 170,
    height: 200,
    backfaceVisibility: 'hidden',
  },
});
