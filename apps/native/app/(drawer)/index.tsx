import { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Pedometer } from "expo-sensors";
import type { PermissionResponse } from "expo-sensors/build/Pedometer";
import useStepTracker from "@/features/step-tracking/hook/useStepTracker";
import useGetStepCount from "@/features/step-tracking/service/ios-health-kit";

export default function App() {
  const {
    permission,
    pastStepCount,
    currentStepCount,
    pastStepCounts,
    isPedometerAvailable,
  } = useStepTracker();

  const { steps, isAvailable, statistics } = useGetStepCount();

  return (
    <View style={styles.container}>
      <Text>steps: {steps?.quantity}</Text>
      <Text>statistics: {statistics?.quantity}</Text>
      <Text>isAvailable: {isAvailable?.toString()}</Text>
      <Text>--------------------------------</Text>
      <Text>pastStepCount: {pastStepCount}</Text>
      <Text>currentStepCount: {currentStepCount}</Text>
      <Text>pastStepCounts: {pastStepCounts.length}</Text>
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
