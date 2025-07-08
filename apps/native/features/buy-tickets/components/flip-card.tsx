import { Dimensions, Pressable, type View } from 'react-native';

import Animated, {
  interpolate,
  useAnimatedStyle,
  withTiming,
  Easing,
  useSharedValue,
  withSequence,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';

import { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export type FlipCardHandle = {
  toggleGatherCards: () => Promise<void>;
};

type FlipCardProps = {
  cardStyle: StyleProp<ViewStyle>;
  direction?: 'x' | 'y';
  duration?: number;
  RegularContent: React.ReactNode;
  FlippedContent: React.ReactNode;
  index: number;
};

const FlipCard = ({
  cardStyle,
  direction = 'y',
  duration = 500,
  RegularContent,
  FlippedContent,
  index,
  ref,
}: FlipCardProps & { ref: React.Ref<FlipCardHandle> }) => {
  const isFlipped = useSharedValue(false);
  const isDirectionX = direction === 'x';
  const position = useSharedValue({ x: 0, y: 0 });
  const isGathered = useSharedValue(false);
  const cardWidth = 120; // styles.flipCard의 width
  const cardHeight = 200; // styles.flipCard의 height
  const pressableRef = useRef<View>(null);
  const [initialPosition, setInitialPosition] = useState<{
    pageX: number;
    pageY: number;
  } | null>(null);

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

  // onLayout 이벤트로 레이아웃 완료 후 위치 측정
  const handleLayout = (event: LayoutChangeEvent) => {
    if (initialPosition) return;
    if (pressableRef.current) {
      pressableRef.current.measure(
        (x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
          setInitialPosition({ pageX, pageY });
        },
      );
    }
  };

  // 카드가 모이는/펼쳐지는 애니메이션
  const toggleGatherCards = () => {
    if (!initialPosition) return Promise.resolve();

    return new Promise<void>((resolve) => {
      const cardCenterX = initialPosition.pageX + cardWidth / 2;
      const cardTopY = initialPosition.pageY;

      const screenCenterX = SCREEN_WIDTH / 2;
      const screenTopY = 0;

      const targetX = isGathered.value ? 0 : screenCenterX - cardCenterX;
      const targetY = isGathered.value ? 0 : screenTopY - cardTopY;

      position.value = withSequence(
        withDelay(
          index * 50,
          withTiming({ x: targetX, y: targetY }, { duration: 500, easing: Easing.inOut(Easing.circle) }, (finished) => {
            if (finished) {
              isGathered.value = !isGathered.value;
              runOnJS(resolve)();
            }
          }),
        ),
      );
    });
  };

  useImperativeHandle(ref, () => ({
    toggleGatherCards,
  }));

  return (
    <Pressable ref={pressableRef} onPress={handlePress} onLayout={handleLayout}>
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
