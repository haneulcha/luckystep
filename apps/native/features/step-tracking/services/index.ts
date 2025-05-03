import { Platform } from "react-native";

// 우선 개발 환경에서 native module 건너뛰고 작업하기 위함
const isDev = __DEV__;

// 이후에 플랫폼 별로 코드 분리해서 작업하기 위함
const stepTrackingStatus = async () => {
  if (isDev) return false;

  if (Platform.OS === "ios") {
    try {
      const { checkAvailability, getAuthStatus } = await import("./healthkit");
      const isAvailable = await checkAvailability();
      if (!isAvailable)
        return {
          available: isAvailable,
          status: "unavailable",
        };

      const status = await getAuthStatus();
      return {
        available: isAvailable,
        status: status.status,
      };
    } catch (error) {
      console.warn("HealthKit 권한 확인 중 오류 발생", error);
      return {
        available: false,
        status: "unauthorized",
      };
    }
  }

  return false;
};

const getStepCount = async ({ from, to }: { from: Date; to: Date }) => {
  if (isDev) return 0;

  if (Platform.OS === "ios") {
    try {
      const { getStepCount } = await import("./healthkit");
      const stepCount = await getStepCount({ from, to });
      return stepCount;
    } catch (error) {
      console.warn("HealthKit 걸음 수 조회 중 오류 발생", error);
      return;
    }
  }

  return 0;
};

export { stepTrackingStatus, getStepCount };
