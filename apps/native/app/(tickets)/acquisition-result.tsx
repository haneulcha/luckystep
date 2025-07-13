import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

const TicketAcquisitionResult = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <View className="flex-1 items-center justify-center bg-gelb-20">
      <Text>TicketAcquisitionResult</Text>
      <Text>{id ? id : 'id is required'}</Text>
      <Button title="나갈랭~" onPress={() => router.dismissAll()} />
    </View>
  );
};

export default TicketAcquisitionResult;
