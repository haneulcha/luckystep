import Card from '@/features/shared/ui/Card';
import ListItem from '@/features/shared/ui/ListItem';
import { Button, Text, View } from 'react-native';

const DailyMissionCard = () => {
  return (
    <Card title="보너스 미션">
      <View className="gap-4">
        {missions.map((mission) => {
          const props = {
            title: mission.title,
            description: `매일 ${mission.offer}장`,
            icon: {
              name: assets[mission.type].icon,
              color: assets[mission.type].color,
              bgColor: assets[mission.type].bgColor,
            },
            button: {
              title: '받기',
              disabled: mission.hasCompleted,
            },
          };

          return <ListItem key={mission.id} action={<Button {...props.button} />} {...props} />;
        })}
      </View>
    </Card>
  );
};

export default DailyMissionCard;

const assets = {
  attendance: {
    icon: 'today',
    color: 'white',
    bgColor: 'bg-gelb-70',
  },
  ad: {
    icon: 'play-circle',
    color: 'white',
    bgColor: 'bg-lila-40',
  },
} as const;

type Mission = {
  id: number;
  type: 'attendance' | 'ad';
  title: string;
  offer: number;
  hasCompleted: boolean;
};

const missions: Mission[] = [
  {
    id: 1,
    type: 'attendance',
    title: '출석하기',
    offer: 1,
    hasCompleted: false,
  },
  {
    id: 2,
    type: 'ad',
    title: '광고보기',
    offer: 1,
    hasCompleted: true,
  },
  {
    id: 3,
    type: 'ad',
    title: '광고보기',
    offer: 2,
    hasCompleted: false,
  },
  {
    id: 4,
    type: 'ad',
    title: '광고보기',
    offer: 3,
    hasCompleted: false,
  },
];
