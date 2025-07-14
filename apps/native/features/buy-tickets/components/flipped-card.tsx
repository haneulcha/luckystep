import { Text, View } from 'react-native';

type FlippedCardProps = {
  title: string;
};

const FlippedCard = ({ title }: FlippedCardProps) => {
  return (
    <View className="flex aspect-[1/1.414] w-24 items-center justify-center rounded-lg border bg-gelb-30 p-4">
      <Text className="text-center text-4xl text-white">{title}</Text>
    </View>
  );
};

export default FlippedCard;
