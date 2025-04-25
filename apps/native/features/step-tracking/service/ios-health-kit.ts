import Healthkit, {
  HKQuantityTypeIdentifier,
  useMostRecentQuantitySample,
  HKUnits,
  useIsHealthDataAvailable,
  useHealthkitAuthorization,
  HKAuthorizationRequestStatus,
  HKStatisticsOptions,
  useStatisticsForQuantity,
  useSources,
} from "@kingstinct/react-native-healthkit";
import { useEffect, useState } from "react";

const useGetStepCount = () => {
  const [currentTimeStamp, setCurrentTimeStamp] = useState(new Date());
  const [authStatus, requestAuth] = useHealthkitAuthorization([
    HKQuantityTypeIdentifier.stepCount,
  ]);
  const isAvailable = useIsHealthDataAvailable();
  const steps = useMostRecentQuantitySample(
    HKQuantityTypeIdentifier.stepCount,
    HKUnits.Count
  );

  const statistics = useStatisticsForQuantity(
    HKQuantityTypeIdentifier.stepCount,
    [HKStatisticsOptions.cumulativeSum],
    new Date("2025-04-25T00:00:00Z"),
    currentTimeStamp
  );
  // const samples = useQuantitySamples(
  //   HKQuantityTypeIdentifier.stepCount,
  //   new Date("2025-04-24T00:00:00Z"),
  //   new Date("2025-04-25T00:00:00Z")
  // );

  useEffect(() => {
    if (!isAvailable) return;
    if (
      authStatus === HKAuthorizationRequestStatus.shouldRequest ||
      authStatus === HKAuthorizationRequestStatus.unknown
    )
      return;

    console.log("subscribe");
    const unsubscribe = Healthkit.subscribeToChanges(
      HKQuantityTypeIdentifier.stepCount,
      () => {
        console.log("step count changed");
        setCurrentTimeStamp(new Date());
      }
    );

    return () => {
      Promise.resolve(unsubscribe).then((unsubscribe) => unsubscribe());
    };
  }, [isAvailable, authStatus]);

  useEffect(() => {
    if (!isAvailable) return;
    if (authStatus !== HKAuthorizationRequestStatus.shouldRequest) return;
    requestAuth().then((status) => {
      console.log({ status });
      if (status === HKAuthorizationRequestStatus.shouldRequest) {
        // setHasRequestedAuthorization(true);
      }
    });
  }, [authStatus, isAvailable, requestAuth]);
  // console.log({ steps, isAvailable, statistics });
  return { steps, isAvailable, statistics: statistics?.sumQuantity };
};

export default useGetStepCount;
