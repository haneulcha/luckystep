import BrokenHealthKit, {
  type HealthValue,
  type HealthKitPermissions,
} from "react-native-health";

const NativeModules = require("react-native").NativeModules;
const AppleHealthKit = NativeModules.AppleHealthKit as typeof BrokenHealthKit;
AppleHealthKit.Constants = BrokenHealthKit.Constants;

/* Permission options */
const permissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.Steps],
  },
} as HealthKitPermissions;

const appleHealthKitInit = async () => {
  console.log("init start");
  AppleHealthKit.initHealthKit(permissions, (error: string) => {
    /* Called after we receive a response from the system */
    console.log("initHealthKit", error);
    if (error) {
      console.log("[ERROR] Cannot grant permissions!");
    }

    /* Can now read or write to HealthKit */

    const options = {
      startDate: new Date(2020, 1, 1).toISOString(),
    };

    AppleHealthKit.getStepCount(
      options,
      (error: string, results: HealthValue) => {
        console.log("error", error);
        console.log("results", results);
      }
    );
  });
};

export { appleHealthKitInit };
