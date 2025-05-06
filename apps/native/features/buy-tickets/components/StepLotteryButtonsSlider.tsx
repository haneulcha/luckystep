import Card from '@/features/shared/ui/Card';
import useStepTracker from '@/features/step-tracking/hook/useStepTracker';
import { Ionicons } from '@expo/vector-icons';

import { ScrollView, Text, View } from 'react-native';

const threshold = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

// TODO: 카드와 헤더, 뱃지 재사용 컴포넌트로 분리
const StepLotteryButtonsSlider = () => {
  const { cumulativeStepCount } = useStepTracker(); // sensor

  return (
    <Card
      title="걷기 미션"
      titleAdornment={
        cumulativeStepCount > 0 ? (
          <Text className="w-fit flex-grow-0 rounded-md bg-indigo-10 px-1.5 py-1 font-semibold text-indigo-70 text-xs">
            현재 {cumulativeStepCount.toLocaleString()} 걸음
          </Text>
        ) : undefined
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
            {cumulativeStepCount >= step ? (
              <View className="w-full rounded-full border-2 border-indigo-40">
                <View className="aspect-square size-20 items-center justify-center rounded-full border-4 border-mono-10 bg-mono-30 p-3">
                  {/* indigo-70 */}
                  <Ionicons name="paw" size={28} color="#293b90" />
                </View>
              </View>
            ) : (
              <View className="w-full rounded-full border-2 border-indigo-10">
                <View className="aspect-square size-20 items-center justify-center rounded-full border-4 border-mono-10 bg-mono-30 p-3">
                  {/* mono-60 */}
                  <Ionicons name="paw" size={28} color="#c4c4c4" />
                </View>
              </View>
            )}

            <Text className="text-mono-90 text-sm">{step.toLocaleString()}보</Text>
          </View>
        ))}
      </ScrollView>
    </Card>
  );
};

export default StepLotteryButtonsSlider;
