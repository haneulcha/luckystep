import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import { Text, View } from 'react-native';
import { useTimer } from 'react-timer-hook';

dayjs.extend(utc);
dayjs.extend(duration);

type Phase = 'in-progress' | 'waiting';

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

const getPhase = (startDate: string, endDate: string): Phase => {
  const now = dayjs();
  if (now.isAfter(dayjs(startDate)) && now.isBefore(dayjs(endDate))) {
    return 'in-progress';
  }
  return 'waiting';
};

const TopBanner = () => {
  const phase = getPhase(data.startDate, data.endDate);
  const { days, hours, minutes, seconds } = useTimer({
    expiryTimestamp: dayjs(data.next.startDate).toDate(),
    autoStart: phase === 'waiting',
  });

  return (
    <View className="w-full gap-4 bg-gelb-40 p-6">
      <View className="mt-1 flex-row items-center gap-2">
        <Ionicons name="flower-outline" size={24} color="white" />
        <Text className="font-extrabold text-mono-10 text-xl">LUCKYSTEPS</Text>
      </View>

      <View className="rounded-lg bg-gelb-70">
        <View className="mt-2 items-center py-4">
          <Text className="text-center font-bold text-mono-10 text-sm">{data.round}회차</Text>
          <Text className="text-center font-extrabold text-mono-10 text-xl">{data.prize.toLocaleString()}원</Text>
          <Text className="text-center font-bold text-mono-10 text-sm tabular-nums">
            {days}일 {hours}시간 {minutes}분 {seconds}초
          </Text>
        </View>

        <View className="h-px w-full bg-gelb-30" />

        <View className="flex-row items-center gap-2">
          {/* TODO: Link */}
          <View className="flex-1 flex-row items-center justify-center gap-2 border-gelb-30 border-r p-4">
            <Ionicons name="trophy-outline" size={20} color="#F5F5F5" />
            <Text className="text-center font-bold text-mono-10 text-sm">명예의 전당</Text>
          </View>
          {/* TODO: Link */}
          <View className="flex-1 flex-row items-center justify-center gap-2 p-4">
            <Ionicons name="cash-outline" size={20} color="#F5F5F5" />
            <Text className="text-center font-bold text-mono-10 text-sm">당첨금 안내</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TopBanner;
