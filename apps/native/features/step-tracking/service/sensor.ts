import { Pedometer } from "expo-sensors";

const checkPedometerAvailability = async () => {
  const isAvailable = await Pedometer.isAvailableAsync();
  return isAvailable;
};

const getPermissions = async () => {
  const permission = await Pedometer.getPermissionsAsync();
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
