import { Pedometer } from "expo-sensors";

const checkPedometerAvailability = async () => {
  const isAvailable = await Pedometer.isAvailableAsync();
  return isAvailable;
};

const getPermissions = async () => {
  let permission = await Pedometer.getPermissionsAsync();
  if (permission.canAskAgain) {
    permission = await Pedometer.requestPermissionsAsync();
  }
  return permission;
};

const getStepCount = async (start: Date, end: Date) => {
  const stepCount = await Pedometer.getStepCountAsync(start, end);
  return stepCount;
};

const watchStepCount = async (callback: Pedometer.PedometerUpdateCallback) => {
  return Pedometer.watchStepCount(callback);
};

export {
  checkPedometerAvailability,
  getPermissions,
  getStepCount,
  watchStepCount,
};
