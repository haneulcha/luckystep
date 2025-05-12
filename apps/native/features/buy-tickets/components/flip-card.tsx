import { StyleSheet, View } from 'react-native';

import Animated, { interpolate, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import type { StyleProp, ViewStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

type FlipCardProps = {
  isFlipped: SharedValue<boolean>;
  cardStyle: StyleProp<ViewStyle>;
  direction?: 'x' | 'y';
  duration?: number;
  RegularContent: React.ReactNode;
  FlippedContent: React.ReactNode;
};

const FlipCard = ({
  isFlipped,
  cardStyle,
  direction = 'y',
  duration = 500,
  RegularContent,
  FlippedContent,
}: FlipCardProps) => {
  const isDirectionX = direction === 'x';

  const regularCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [0, 90]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });
    console.log({ rotateValue });
    return {
      transform: [isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue }],
    };
  });

  const flippedCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [180, 360]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue }],
    };
  });

  return (
    <View>
      <Animated.View
        style={[
          flipCardStyles.regularCard,
          cardStyle,
          {
            transform: [{ rotateX: '45deg' }],
          },
        ]}
      >
        {RegularContent}
      </Animated.View>
      <Animated.View style={[flipCardStyles.flippedCard, cardStyle, flippedCardAnimatedStyle]}>
        {/* {FlippedContent} */}
      </Animated.View>

      <View
        style={{
          position: 'absolute',
          zIndex: 3,
          width: 100,
          height: 100,
          backgroundColor: 'red',
          //   transform: [{ rotateX: 'deg' }],
        }}
      />
    </View>
  );
};

const flipCardStyles = StyleSheet.create({
  regularCard: {
    position: 'absolute',
    zIndex: 1,
  },
  flippedCard: {
    zIndex: 2,
  },
});

export default FlipCard;
