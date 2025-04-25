import { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Pedometer } from "expo-sensors";
import type { PermissionResponse } from "expo-sensors/build/Pedometer";
import useStepTracker from "@/features/step-tracking/hook/useStepTracker";
import { appleHealthKitInit } from "@/features/step-tracking/service/ios-health-kit";
import AppleHealthKit, {
  type HealthValue,
  type HealthKitPermissions,
} from "react-native-health";

const permissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.Steps],
  },
} as HealthKitPermissions;

AppleHealthKit.initHealthKit(permissions, (error: string) => {
  console.log("initHealthKit", error);
});

export default function App() {
  // const { permission, pastStepCount, currentStepCount, pastStepCounts, isPedometerAvailable } =
  //   useStepTracker();

  const handleHealthKit = async () => {
    console.log("start");
    await appleHealthKitInit();
    console.log("end");
  };

  return (
    <View style={styles.container}>
      <Text>isPedometerAvailable: </Text>
      <Button title="HealthKit" onPress={handleHealthKit} />
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
