import { Path, Svg } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

export default function CloverAsset({ width = 320, height = 320, ...props }: SvgProps) {
  const Color = '#22c55e';
  
  return (
    <Svg width={width} height={height} viewBox="0 0 100 100" {...props}>
      {/* Top leaf - fuller heart shape */}
      <Path
        d="M50 50 C42 40, 32 32, 36 22 C40 18, 46 22, 50 32 C54 22, 60 18, 64 22 C68 32, 58 40, 50 50"
        fill={Color}
      />
      {/* Right leaf - fuller heart shape */}
      <Path
        d="M50 50 C60 42, 68 32, 78 36 C82 40, 78 46, 68 50 C78 54, 82 60, 78 64 C68 68, 60 58, 50 50"
        fill={Color}
      />
      {/* Bottom leaf - fuller heart shape */}
      <Path
        d="M50 50 C58 60, 68 68, 64 78 C60 82, 54 78, 50 68 C46 78, 40 82, 36 78 C32 68, 42 60, 50 50"
        fill={Color}
      />
      {/* Left leaf - fuller heart shape */}
      <Path
        d="M50 50 C40 58, 32 68, 22 64 C18 60, 22 54, 32 50 C22 46, 18 40, 22 36 C32 32, 40 42, 50 50"
        fill={Color}
      />
    </Svg>
  );
}