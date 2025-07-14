import FlippedCard from '@/features/buy-tickets/components/flipped-card';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

const TicketAcquisitionResult = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const title = id ? id.toString() : '0';
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <FlippedCard title={title} />
      <Button title="나갈랭~" onPress={() => router.dismissAll()} />
    </View>
  );
};

export default TicketAcquisitionResult;
