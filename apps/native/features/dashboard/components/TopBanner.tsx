import { Ionicons } from '@expo/vector-icons';
import dayjs, { type Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTimer } from 'react-timer-hook';

dayjs.extend(utc);
dayjs.extend(duration);

const phaseMap = {
  'in-progress': {
    label: '진행중',
    color: 'bg-indigo-50',
  },
  waiting: {
    label: '마감',
    color: 'bg-mono-70',
  },
} as const;

const data = {
  round: 410,
  prize: 20_000_000,
  startDate: '2025-05-05T12:00:00+09:00',
  endDate: '2025-05-12T19:00:00+09:00',
  next: {
    round: 411,
    prize: 25_000_000,
    startDate: '2025-05-12T12:00:00+09:00',
    endDate: '2025-05-19T19:00:00+09:00',
  },
};

type Phase = keyof typeof phaseMap;

const getTargetDate = (startDate: string, endDate: string): { phase: Phase; date: Dayjs; diff: number } => {
  const now = dayjs();
  if (now.isAfter(dayjs(startDate)) && now.isBefore(dayjs(endDate))) {
    return {
      phase: 'in-progress',
      date: dayjs(endDate),
      diff: dayjs(endDate).diff(now, 'day'),
    };
  }

  return {
    phase: 'waiting',
    date: dayjs(startDate),
    diff: dayjs(startDate).diff(now, 'day'),
  };
};

const TopBanner = () => {
  const insets = useSafeAreaInsets();
  const { phase, date, diff } = getTargetDate(data.startDate, data.endDate);
  const { hours, minutes, seconds } = useTimer({
    expiryTimestamp: date.toDate(),
    autoStart: 1 > diff,
  });

  const timeCount = useMemo(() => {
    if (phase === 'in-progress') {
      return diff > 0 ? `${diff}일 후 마감` : `${hours}:${minutes}:${seconds} 후 마감`;
    }
    if (phase === 'waiting') {
      return diff > 0 ? `${diff}일 후 시작` : `${hours}:${minutes}:${seconds} 후 다음 회차 시작`;
    }
    return '';
  }, [diff, phase, hours, minutes, seconds]);

  return (
    <View className="w-full bg-mono-30">
      <View
        className="gap-4 bg-gelb-40 p-6"
        style={{
          paddingTop: insets.top,
        }}
      >
        {/* 타이틀 */}
        <View className="flex-row items-center gap-2">
          <Ionicons name="flower-outline" size={24} color="white" />
          <Text className="font-extrabold text-mono-10 text-xl">LUCKYSTEPS</Text>
        </View>

        <View className="rounded-3xl bg-gelb-70">
          <View className="mt-2 items-center gap-1 py-5">
            {/* 회차 */}
            <View className="flex-row items-center gap-2">
              <Text className="text-center font-bold text-md text-mono-10">{data.round}회차</Text>
              <Text className={`rounded-full px-2.5 py-1.5 font-bold text-mono-10 text-xs ${phaseMap[phase].color}`}>
                {phaseMap[phase].label}
              </Text>
            </View>

            {/* 당첨금 */}
            <Text className="text-center font-extrabold text-3xl text-mono-10">{data.prize.toLocaleString()}원</Text>

            {/* 남은 시간 */}
            <View className="flex-row items-center justify-center gap-1">
              <Ionicons name="time-outline" size={16} color="white" />
              <Text className="text-center font-bold text-mono-20 text-sm tabular-nums">{timeCount}</Text>
            </View>
          </View>

          <View className="h-px w-full bg-gelb-30" />

          <View className="flex-row items-center gap-2">
            {/* TODO: Link */}
            <View className="flex-1 flex-row items-center justify-center gap-2 border-gelb-30 border-r p-4">
              <Ionicons name="trophy" size={20} color="#F5F5F5" />
              <Text className="text-center font-bold text-mono-10 text-sm">명예의 전당</Text>
            </View>
            {/* TODO: Link */}
            <View className="flex-1 flex-row items-center justify-center gap-2 p-4">
              <Ionicons name="cash" size={20} color="#F5F5F5" />
              <Text className="text-center font-bold text-mono-10 text-sm">당첨금 안내</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TopBanner;
