import { Pressable } from 'react-native';

import Animated, {
  interpolate,
  useAnimatedStyle,
  withTiming,
  Easing,
  useSharedValue,
  withSequence,
  withDelay,
} from 'react-native-reanimated';

import { useEffect, useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

type FlipCardProps = {
  cardStyle: StyleProp<ViewStyle>;
  direction?: 'x' | 'y';
  duration?: number;
  RegularContent: React.ReactNode;
  FlippedContent: React.ReactNode;
  index: number;
  isGathering?: boolean;
  containerWidth: number;
  containerHeight: number;
  initialPosition: { x: number; y: number };
};

const FlipCard = ({
  cardStyle,
  direction = 'y',
  duration = 500,
  RegularContent,
  FlippedContent,
  index,
  isGathering = false,
  containerWidth,
  containerHeight,
  initialPosition,
}: FlipCardProps) => {
  const isFlipped = useSharedValue(false);
  const isDirectionX = direction === 'x';
  const position = useSharedValue({ x: 0, y: 0 });
  const isGathered = useSharedValue(false);
  const cardWidth = 120; // styles.flipCard의 width
  const cardHeight = 200; // styles.flipCard의 height

  const regularCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [0, 180]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration, easing: Easing.inOut(Easing.circle) });

    return {
      transform: [
        isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
        { translateX: position.value.x },
        { translateY: position.value.y },
      ],
    };
  });

  const flippedCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [180, 360]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration, easing: Easing.inOut(Easing.circle) });

    return {
      transform: [
        isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
        { translateX: position.value.x },
        { translateY: position.value.y },
      ],
    };
  });

  const handlePress = () => {
    isFlipped.value = !isFlipped.value;
  };

  // 카드가 모이는/펼쳐지는 애니메이션
  const toggleGatherCards = () => {
    // 카드의 중심점을 기준으로 계산
    const cardCenterX = initialPosition.x + cardWidth / 2;
    const cardTopY = initialPosition.y;

    // 컨테이너의 중심점
    const containerCenterX = containerWidth / 2;
    const containerTopY = 0;

    // 목표 위치 계산
    const targetX = isGathered.value ? 0 : containerCenterX - cardCenterX;
    const targetY = isGathered.value ? 0 : containerTopY - cardTopY;

    position.value = withSequence(
      withDelay(
        index * 100, // 각 카드마다 100ms 딜레이
        withTiming({ x: targetX, y: targetY }, { duration: 500, easing: Easing.inOut(Easing.circle) }, (finished) => {
          if (finished) {
            isGathered.value = !isGathered.value;
          }
        }),
      ),
    );
  };

  // isGathering이 변경되면 카드들이 모이거나 펼쳐지기 시작
  useEffect(() => {
    toggleGatherCards();
  }, [isGathering]);

  return (
    <Pressable onPress={handlePress}>
      <Animated.View className="absolute z-0" style={[cardStyle, regularCardAnimatedStyle]}>
        {RegularContent}
      </Animated.View>
      <Animated.View className="z-1" style={[cardStyle, flippedCardAnimatedStyle]}>
        {FlippedContent}
      </Animated.View>
    </Pressable>
  );
};

export default FlipCard;
