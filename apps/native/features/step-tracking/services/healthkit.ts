import Healthkit, {
  HKQuantityTypeIdentifier,
  HKAuthorizationRequestStatus,
} from "@kingstinct/react-native-healthkit";

const checkAvailability = async () => {
  return await Healthkit.isHealthDataAvailable();
};

/**
 * 권한 요청 여부
 * - 실제 권한을 받았는지 여부는 알 수 없음
 */
const getAuthStatus = async (): Promise<{
  status: "requested" | "unauthorized";
}> => {
  try {
    const status = await Healthkit.getRequestStatusForAuthorization([
      HKQuantityTypeIdentifier.stepCount,
    ]);

    if (status === HKAuthorizationRequestStatus.unnecessary) {
      return { status: "requested" };
    }

    await Healthkit.requestAuthorization([HKQuantityTypeIdentifier.stepCount]);
    return { status: "requested" };
  } catch (error) {
    return { status: "unauthorized" };
  }
};

/**
 * 걸음 수 조회
 */
const getStepCount = async ({ from, to }: { from: Date; to: Date }) => {
  return Healthkit.queryQuantitySamples(HKQuantityTypeIdentifier.stepCount, {
    from,
    to,
  }).then((statistics) => {
    const stepCountPerDevice = statistics.reduce((acc, cur) => {
      const device = cur.sourceRevision?.source.name;
      if (!device) return acc;
      if (!acc[device]) acc[device] = 0;
      acc[device] += cur.quantity;
      return acc;
    }, {} as Record<string, number>);

    if (Object.keys(stepCountPerDevice).length === 0) return;

    return Math.max(...Object.values(stepCountPerDevice));
  });
};

export { checkAvailability, getAuthStatus, getStepCount };
