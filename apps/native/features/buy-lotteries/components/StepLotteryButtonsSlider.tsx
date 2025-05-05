import Card from '@/features/shared/ui/Card';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';

const threshold = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

// TODO: 카드와 헤더, 뱃지 재사용 컴포넌트로 분리
const StepLotteryButtonsSlider = () => {
  return (
    <Card
      title="걷기 미션"
      titleAdornment={
        <Text className="w-fit flex-grow-0 rounded-md bg-blau-50 px-1.5 py-1 font-bold text-mono-10 text-xs">
          현재 85 걸음
        </Text>
      }
    >
      {/* TODO: 걸음 수에 따라 선택 가능 여부, 이미 응모한 케이스 disable, 다음 걸음 수 카드 모양 변경 */}
      <ScrollView
        className="-mx-5"
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-4 px-5"
      >
        {threshold.map((step) => (
          <View key={step} className="items-center gap-2 py-1">
            <View className="w-full rounded-full border-2 border-blau-50">
              <View className="aspect-square size-20 items-center justify-center rounded-full border-4 border-mono-50 bg-mono-20 p-3">
                <Ionicons name="paw" size={28} color="bg-lila-50" />
              </View>
            </View>

            <Text className="text-mono-90 text-xs">{step.toLocaleString()}보</Text>
          </View>
        ))}
      </ScrollView>
    </Card>
  );
};

export default StepLotteryButtonsSlider;
