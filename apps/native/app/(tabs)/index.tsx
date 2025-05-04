import TopBanner from '@/features/dashboard/components/TopBanner';
import useStepTracker from '@/features/step-tracking/hook/useStepTracker';
import { getStepCount, stepTrackingStatus } from '@/features/step-tracking/services';
import { getUntilNow } from '@/features/step-tracking/utils';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function App() {
  const { isPedometerAvailable, todayStepCount, currentStepCount, pastStepCounts } = useStepTracker(); // sensor
  const [stepCount, setStepCount] = useState<number>(); // healthkit

  useEffect(() => {
    (async () => {
      const status = await stepTrackingStatus();
      if (!status) return;

      const { start, end } = getUntilNow();
      const stepCount = await getStepCount({ from: start, to: end });
      setStepCount(stepCount);
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-primary-foreground" edges={['top']}>
      <TopBanner />

      <Text>healthkit</Text>
      <Text>{stepCount ?? 'not available'}</Text>

      <Text>--------------------------------</Text>
      <Text>expo-sensors</Text>
      <Text>{isPedometerAvailable ? 'available' : 'not available'}</Text>
      <Text>{currentStepCount}</Text>
      <Text>{todayStepCount?.steps}</Text>
      <Text>{pastStepCounts.map((stepCount) => stepCount.steps).join(', ')}</Text>
    </SafeAreaView>
  );
}
