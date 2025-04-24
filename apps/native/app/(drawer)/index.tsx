import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Pedometer } from "expo-sensors";
import type { PermissionResponse } from "expo-sensors/build/Pedometer";

type Permission = PermissionResponse;

export default function App() {
  const [permission, setPermission] = useState<Permission | null>(null);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  useEffect(() => {
    const subscribe = async () => {
      const isAvailable = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(String(isAvailable));

      if (isAvailable) {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 1);

        const pastStepCountResult = await Pedometer.getStepCountAsync(
          start,
          end
        );
        if (pastStepCountResult) {
          setPastStepCount(pastStepCountResult.steps);
        }

        return Pedometer.watchStepCount((result) => {
          setCurrentStepCount(result.steps);
        });
      }
    };

    const subscription = subscribe();
    return () => {
      subscription.then((subscription) => {
        subscription?.remove();
      });
    };
  }, []);

  useEffect(() => {
    async function getPermission() {
      const permission = await Pedometer.requestPermissionsAsync();
      return permission;
    }
    getPermission().then((permission) => {
      setPermission(permission);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Permission: {permission?.status}</Text>
      <Text>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
      <Text>Steps taken in the last 24 hours: {pastStepCount}</Text>
      <Text>Walk! And watch this go up: {currentStepCount}</Text>
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
