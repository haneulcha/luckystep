import { StyleSheet, Text, View } from "react-native";
import useStepTracker from "@/features/step-tracking/hook/useStepTracker";
import useGetStepCount from "@/features/step-tracking/hook/useStepCounter";

export default function App() {
  const {
    isPedometerAvailable,
    todayStepCount,
    currentStepCount,
    pastStepCounts,
  } = useStepTracker();

  const {
    isAvailable,
    stepCount: stepCountHealthKit,
    pastStepCounts: pastStepCountsHealthKit,
  } = useGetStepCount();

  return (
    <View style={styles.container}>
      <Text>expo-sensors</Text>
      <Text>연동 여부: {isPedometerAvailable?.toString()}</Text>
      <Text>현재 걸음 수: {currentStepCount}</Text>
      <Text>오늘 걸음 수: {todayStepCount?.steps}</Text>
      <>
        <Text>과거 7일 걸음 수: </Text>
        <View>
          {pastStepCounts.map((step) => {
            return (
              <Text key={step.date.start.toISOString()}>
                {step.date.start.toISOString()} / {step.steps}
              </Text>
            );
          })}
        </View>
      </>
      <Text>--------------------------------</Text>
      <Text>HealthKit</Text>
      <Text>연동 여부: {isAvailable?.toString()}</Text>
      <Text>오늘 걸음 수: {stepCountHealthKit?.steps}</Text>
      <>
        <Text>과거 7일 걸음 수: </Text>
        <View>
          {pastStepCountsHealthKit.map((step) => {
            return (
              <Text key={step.date.start.toISOString()}>
                {step.date.start.toISOString()} / {step.steps}
              </Text>
            );
          })}
        </View>
      </>
      <Text>--------------------------------</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
