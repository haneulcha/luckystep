import { useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withDelay, withTiming } from 'react-native-reanimated';
import type { SvgProps } from 'react-native-svg';
import CloverAsset from './CloverAsset';

const AnimatedCloverAsset = Animated.createAnimatedComponent(CloverAsset);

export default function Clover({ width = 320, height = 320, ...props }: SvgProps) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withDelay(500, withTiming(360, { duration: 2000 }));
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <AnimatedCloverAsset 
      width={width} 
      height={height} 
      style={animatedStyle} 
      {...props} 
    />
  );
}
