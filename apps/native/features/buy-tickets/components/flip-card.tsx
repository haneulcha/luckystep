import { Dimensions, Pressable, type View } from 'react-native';

import Animated, {
  interpolate,
  useAnimatedStyle,
  withTiming,
  Easing,
  useSharedValue,
  withSequence,
  withDelay,
} from 'react-native-reanimated';

import { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export type FlipCardHandle = {
  toggleGatherCards: () => void;
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
    x: number;
    y: number;
    width: number;
    height: number;
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
          console.log('Measured position:', { x, y, width, height, pageX, pageY });
          // x, y: 부모 컴포넌트 내에서의 상대적 위치
          // pageX, pageY: 화면 전체에서의 절대적 위치
          setInitialPosition({ x: pageX, y: pageY, width, height, pageX, pageY });
        },
      );
    }
  };

  // 카드가 모이는/펼쳐지는 애니메이션
  const toggleGatherCards = () => {
    if (!initialPosition) return;

    // 카드의 중심점을 기준으로 계산 (절대 위치 사용)
    const cardCenterX = initialPosition.pageX + cardWidth / 2;
    const cardTopY = initialPosition.pageY;

    // 화면의 중앙점 (12시 방향을 위해 전체 화면 너비 사용)
    const screenCenterX = SCREEN_WIDTH / 2;
    const screenTopY = 0;

    // 목표 위치 계산 (카드가 12시 방향 중앙에 오도록)
    const targetX = isGathered.value ? 0 : screenCenterX - cardCenterX;
    const targetY = isGathered.value ? 0 : screenTopY - cardTopY;

    position.value = withSequence(
      withDelay(
        index * 50, // 각 카드마다 100ms 딜레이
        withTiming({ x: targetX, y: targetY }, { duration: 500, easing: Easing.inOut(Easing.circle) }, (finished) => {
          if (finished) {
            isGathered.value = !isGathered.value;
          }
        }),
      ),
    );
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
