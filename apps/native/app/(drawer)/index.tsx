import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Pedometer } from "expo-sensors";
import type { PermissionResponse } from "expo-sensors/build/Pedometer";
import useStepTracker from "@/features/step-tracking/hook/useStepTracker";

export default function App() {
  const { permission, pastStepCount, currentStepCount, pastStepCounts, isPedometerAvailable } =
    useStepTracker();

  return (
    <View style={styles.container}>
      <Text>isPedometerAvailable: {isPedometerAvailable}</Text>
      <Text>Permission: {permission?.status}</Text>

      <Text>Steps taken in the last 24 hours: {pastStepCount}</Text>
      <Text>Walk! And watch this go up: {currentStepCount}</Text>
      <Text>Past step counts: {JSON.stringify(pastStepCounts)}</Text>
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
