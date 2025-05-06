import DailyMissionCard from '@/features/buy-tickets/components/DailyMissionCard';
import ReferralCard from '@/features/buy-tickets/components/ReferralCard';
import ScratchcardCard from '@/features/buy-tickets/components/ScratchcardCard';
import SocialCard from '@/features/buy-tickets/components/SocialCard';
import StepLotteryButtonsSlider from '@/features/buy-tickets/components/StepLotteryButtonsSlider';
import TopBanner from '@/features/dashboard/components/TopBanner';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    // <SafeAreaView className="flex-1 bg-primary-foreground" edges={['top']}>
    <ScrollView contentContainerClassName="flex-grow">
      <SafeAreaView className="flex-1 bg-gelb-40" edges={['top']}>
        <TopBanner />
      </SafeAreaView>

      <View className="gap-5 bg-mono-30 p-6">
        <ReferralCard />
        <StepLotteryButtonsSlider />
        <ScratchcardCard />
        <DailyMissionCard />
        <SocialCard />
      </View>
    </ScrollView>
    // </SafeAreaView>
  );
}
