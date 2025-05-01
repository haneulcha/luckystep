import { Pedometer } from "expo-sensors";
import type { PermissionResponse } from "expo-sensors/build/Pedometer";
import { useEffect, useState } from "react";
import type { StepCount } from "../types";
import { checkPedometerAvailability, getPermissions } from "../services/sensor";
import { getDayRange, getUntilNow } from "../utils";

// TODO: use useSyncExternalStore
// 기기 기준으로 걸음 수 측정 (워치 등 미포함)
const useStepTracker = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState(false);
  const [permission, setPermission] = useState<PermissionResponse | null>(null);

  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [todayStepCount, setTodayStepCount] = useState<StepCount | null>(null);
  const [pastStepCounts, setPastStepCounts] = useState<StepCount[]>([]);

  const canCountStep = isPedometerAvailable && permission?.status === "granted";

  /** 걸음 수 측정 가능 여부 및 권한 확인 */
  useEffect(() => {
    (async () => {
      const isAvailable = await checkPedometerAvailability();
      setIsPedometerAvailable(isAvailable);
      if (!isAvailable) {
        // TODO: show error
        return;
      }

      const permission = await getPermissions();
      setPermission(permission);
    })();
  }, []);

  /** 오늘 걸음 수 측정 */
  useEffect(() => {
    if (!canCountStep) return;

    const { start, end } = getUntilNow();
    Pedometer.getStepCountAsync(start, end).then((result) => {
      setTodayStepCount({ date: { start, end }, steps: result.steps });
    });
  }, [canCountStep]);

  /** 과거 7일 걸음 수 */
  useEffect(() => {
    if (!canCountStep) return;

    (async () => {
      const results = await Promise.all(
        getDayRange(7).map(async ({ start, end }) => {
          // iOS only
          const pastStepCountResult = await Pedometer.getStepCountAsync(
            start,
            end
          );
          return {
            date: { start, end },
            steps: pastStepCountResult?.steps ?? 0,
          };
        })
      );
      setPastStepCounts(results);
    })();
  }, [canCountStep]);

  /** 실시간 걸음 수 측정 */
  useEffect(() => {
    if (!canCountStep) return;

    const subscribe = async () => {
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
    todayStepCount,
    currentStepCount,
    pastStepCounts,
  };
};

export default useStepTracker;
