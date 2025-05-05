import type { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type CardProps = PropsWithChildren<{
  title: string;
  titleAdornment?: React.ReactNode;
  headerAction?: React.ReactNode;
}>;

const Card = ({ children, title, titleAdornment, headerAction }: CardProps) => {
  return (
    <View className="w-full gap-4 rounded-lg bg-mono-10 p-5">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Text className="font-bold text-md text-mono-90">{title}</Text>
          {titleAdornment}
        </View>
        {headerAction}
      </View>

      {children}
    </View>
  );
};

export default Card;
