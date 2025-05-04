import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import { Text, View } from 'react-native';
// import { useTimer } from 'react-timer-hook';

dayjs.extend(utc);
dayjs.extend(duration);

const data = {
  round: 410,
  prize: 20_000_000,
  startDate: '2025-04-28T12:00:00+09:00',
  endDate: '2025-05-03T19:00:00+09:00',
  next: {
    round: 411,
    prize: 25_000_000,
    startDate: '2025-05-05T12:00:00+09:00',
    endDate: '2025-05-12T19:00:00+09:00',
  },
};

const TopBanner = () => {
  // const { days, hours, minutes, seconds } = useTimer({
  //   expiryTimestamp: dayjs(data.next.startDate).toDate(),
  //   autoStart: dayjs().isBefore(dayjs(data.next.startDate)),
  // });

  return (
    <View className="w-full gap-4 bg-gelb-40 p-4">
      <View className="mt-1 flex-row items-center gap-2">
        <Ionicons name="flower-outline" size={24} color="black" />
        <Text className="font-bold text-lg text-mono-10">LUCKYSTEPS</Text>
      </View>
      <View className="rounded-lg bg-violet-40 p-4">
        <Text className="text-center font-bold text-mono-90 text-sm">{data.round}회차</Text>
        <Text className="text-center font-extrabold text-mono-90 text-xl">{data.prize.toLocaleString()}원</Text>
        {/* <Text className="text-center font-bold text-mono-90 text-sm tabular-nums">
          {days}일 {hours}시간 {minutes}분 {seconds}초
        </Text> */}
      </View>
    </View>
  );
};

export default TopBanner;
