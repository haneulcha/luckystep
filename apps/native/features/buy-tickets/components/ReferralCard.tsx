import Card from '@/features/shared/ui/Card';
import ListItem from '@/features/shared/ui/ListItem';
import { Button, View } from 'react-native';

const ReferralCard = () => {
  return (
    <Card title="친구 미션">
      <View className="flex-row items-center gap-4">
        <ListItem
          title="친구 데려오기"
          description="친구도 나도 50장!"
          icon={{ name: 'people', color: 'white', bgColor: 'bg-indigo-30' }}
          action={<Button title="초대하기" />} // TODO: 초대하기 버튼 추가
        />
      </View>
    </Card>
  );
};

export default ReferralCard;
