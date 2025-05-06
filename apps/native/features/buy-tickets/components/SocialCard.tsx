import { Button, View } from 'react-native';

import Card from '@/features/shared/ui/Card';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';

const SocialCard = () => {
  return (
    <Card title="대결 미션" headerAction={<Ionicons name="information-circle-outline" size={20} color="gray" />}>
      <View className="flex-row items-center gap-4">
        <View className="size-16 flex-row items-center justify-center gap-2 rounded-lg bg-rot-50">
          <Ionicons name="pizza" size={24} color="white" />
        </View>

        <View className="flex-1 justify-center gap-2">
          <Text className="font-bold text-md text-mono-90">피자 빨리 먹기</Text>
          <Text className="text-mono-70 text-sm">매일 한판씩 속도전!</Text>
        </View>

        {/* TODO: Link */}
        <Button title="대결하기" />
      </View>
    </Card>
  );
};

export default SocialCard;
