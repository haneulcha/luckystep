import { Pedometer } from "expo-sensors";
import type { PermissionResponse } from "expo-sensors/build/Pedometer";
import { useEffect, useState } from "react";
import { checkPedometerAvailability, getPermissions } from "../service/sensor";

// TODO: use useSyncExternalStore
const useStepTracker = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState(false);
  const [permission, setPermission] = useState<PermissionResponse | null>(null);

  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [pastStepCounts, setPastStepCounts] = useState<
    { date: string; steps: number }[]
  >([]);

  const canCountStep = isPedometerAvailable && permission?.status === "granted";

  useEffect(() => {
    (async () => {
      const isAvailable = await checkPedometerAvailability();
      setIsPedometerAvailable(isAvailable);
      console.log({ isAvailable });
      if (!isAvailable) {
        // TODO: show error
        return;
      }
    })();

    (async () => {
      const permission = await getPermissions();
      setPermission(permission);
    })();
  }, []);

  useEffect(() => {
    if (!canCountStep) return;

    const subscribe = async () => {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end); // iOS only
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
      }

      // last 7 days
      const dates = Array.from({ length: 7 }, (_, i) => {
        const today = new Date();
        const end = new Date();
        end.setDate(today.getDate() - i);
        const start = new Date();
        start.setDate(end.getDate() - 1);
        return { start, end };
      });

      const pastStepCounts = await Promise.all(
        dates.map(async (date) => {
          const pastStepCountResult = await Pedometer.getStepCountAsync(
            date.start,
            date.end
          ); // iOS only
          return {
            date: date.start.toISOString().split("T")[0],
            day: date.start.toLocaleDateString("ko-KR", { weekday: "short" }),
            steps: pastStepCountResult?.steps ?? 0,
          };
        })
      );
      setPastStepCounts(pastStepCounts);
      return Pedometer.watchStepCount((result) => {
        setCurrentStepCount(result.steps);
      });
    };

    const subscription = subscribe();
    return () => {
      subscription.then((subscription) => {
        subscription?.remove();
      });
    };
  }, [canCountStep]);

  return {
    isPedometerAvailable,
    pastStepCount,
    currentStepCount,
    permission,
    pastStepCounts,
  };
};

export default useStepTracker;
