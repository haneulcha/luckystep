import DailyMissionCard from '@/features/buy-tickets/components/DailyMissionCard';
import ReferralCard from '@/features/buy-tickets/components/ReferralCard';
import ScratchcardCard from '@/features/buy-tickets/components/ScratchcardCard';
import SocialCard from '@/features/buy-tickets/components/SocialCard';
import StepLotteryButtonsSlider from '@/features/buy-tickets/components/StepLotteryButtonsSlider';
import TopBanner from '@/features/dashboard/components/TopBanner';
import { colors } from '@/features/shared/const/colors';
import { ScrollView, View } from 'react-native';

export default function App() {
  return (
    <ScrollView
      contentContainerClassName="flex-grow pb-10"
      style={{
        backgroundColor: colors.gelb[40],
      }}
    >
      <TopBanner />

      <View className="gap-5 bg-mono-30 p-6">
        <ReferralCard />
        <StepLotteryButtonsSlider />
        <ScratchcardCard />
        <DailyMissionCard />
        <SocialCard />
      </View>
    </ScrollView>
  );
}
