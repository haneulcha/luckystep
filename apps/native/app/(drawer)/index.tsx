import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import {
  stepTrackingStatus,
  getStepCount,
} from "@/features/step-tracking/services";
import { getUntilNow } from "@/features/step-tracking/utils";
import useStepTracker from "@/features/step-tracking/hook/useStepTracker";

export default function App() {
  const {
    isPedometerAvailable,
    todayStepCount,
    currentStepCount,
    pastStepCounts,
  } = useStepTracker(); // sensor
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
    <View style={styles.container}>
      <Text>healthkit</Text>
      <Text>{stepCount ?? "not available"}</Text>

      <Text>--------------------------------</Text>
      <Text>expo-sensors</Text>
      <Text>{isPedometerAvailable ? "available" : "not available"}</Text>
      <Text>{currentStepCount}</Text>
      <Text>{todayStepCount?.steps}</Text>
      <Text>
        {pastStepCounts.map((stepCount) => stepCount.steps).join(", ")}
      </Text>
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
