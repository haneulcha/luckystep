import Clover from '@/features/lotteries/components/Clover';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';

const PendingScreen = () => {
  return (
    <View className="flex items-center justify-center border">
      <Clover />
      <Text className="text-center text-lg">복권 생성 중</Text>
      <Text className="text-center text-sm">복권 생성 중입니다. 잠시만 기다려주세요.</Text>
      <Link href="/(tabs)" className="text-blue-500">
        뒤로 가기
      </Link>
    </View>
  );
};

export default PendingScreen;
