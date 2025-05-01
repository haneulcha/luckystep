import {
  HKQuantityTypeIdentifier,
  useIsHealthDataAvailable,
  useHealthkitAuthorization,
  HKAuthorizationRequestStatus,
} from "@kingstinct/react-native-healthkit";
import { useEffect, useState } from "react";
import { getDayRange, getUntilNow } from "../utils";
import type { StepCount } from "../types";
import * as HK from "../services/healthkit";

const useGetStepCount = () => {
  const isAvailable = useIsHealthDataAvailable();
  const [authStatus, requestAuth] = useHealthkitAuthorization([
    HKQuantityTypeIdentifier.stepCount,
  ]);
  const [stepCount, setStepCount] = useState<StepCount | null>(null);
  const [pastStepCounts, setPastStepCounts] = useState<StepCount[]>([]);

  /** 최근 24시간 동안의 걸음 수 조회 */
  useEffect(() => {
    if (!isAvailable) return;
    if (authStatus !== HKAuthorizationRequestStatus.unnecessary) return;

    const { start, end } = getUntilNow();
    HK.getStepCount({ from: start, to: end }).then((stepCount) => {
      setStepCount({ date: { start, end }, steps: stepCount });
    });
  }, [isAvailable, authStatus]);

  /** 과거 7일 걸음 수 조회 */
  useEffect(() => {
    if (!isAvailable) return;
    if (authStatus !== HKAuthorizationRequestStatus.unnecessary) return;

    (async () => {
      const results = await Promise.all(
        getDayRange(7).map(async ({ start, end }) => {
          const stepCount = await HK.getStepCount({
            from: start,
            to: end,
          });

          return {
            date: { start, end },
            steps: stepCount,
          };
        })
      );
      setPastStepCounts(results);
    })();
  }, [isAvailable, authStatus]);

  /** 권한 요청 */
  useEffect(() => {
    if (!isAvailable) return;
    if (authStatus !== HKAuthorizationRequestStatus.shouldRequest) return;
    requestAuth().then((status) => {
      if (status === HKAuthorizationRequestStatus.shouldRequest) {
        // setHasRequestedAuthorization(true);
      }
    });
  }, [authStatus, isAvailable, requestAuth]);

  return { isAvailable, stepCount, pastStepCounts };
};

export default useGetStepCount;
