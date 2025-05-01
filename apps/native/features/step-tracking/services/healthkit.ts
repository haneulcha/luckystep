import Healthkit, {
  HKQuantityTypeIdentifier,
} from "@kingstinct/react-native-healthkit";

// const checkAvailability = () => {
//   return Healthkit.isHealthDataAvailable();
// };

// const getAuthorization = async () => {
//   const authorization = await Healthkit.requestAuthorization([
//     HKQuantityTypeIdentifier.stepCount,
//   ]);

//   const status = await Healthkit.authorizationStatusFor(
//     HKQuantityTypeIdentifier.stepCount
//   );
//   return { authorization, status };
// };

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

    if (Object.keys(stepCountPerDevice).length === 0) return 0;

    return Math.max(...Object.values(stepCountPerDevice));
  });
};

export { getStepCount };
