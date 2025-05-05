import Card from '@/features/shared/ui/Card';
import { Ionicons } from '@expo/vector-icons';
import { Button, Text, View } from 'react-native';

const ReferralCard = () => {
  return (
    <Card title="친구 미션">
      <View className="flex-row items-center gap-4">
        <View className="size-16 flex-row items-center justify-center gap-2 rounded-lg bg-gelb-60">
          <Ionicons name="people" size={24} color="white" />
        </View>

        <View className="flex-1 justify-center gap-2">
          <Text className="font-bold text-md text-mono-90">친구 데려오기</Text>
          <Text className="text-mono-70 text-sm">친구도 나도 50장!</Text>
        </View>

        {/* TODO: Link */}
        <Button title="초대하기" />
      </View>
    </Card>
  );
};

export default ReferralCard;
