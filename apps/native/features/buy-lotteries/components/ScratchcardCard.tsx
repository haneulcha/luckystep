import Card from '@/features/shared/ui/Card';
import ListItem from '@/features/shared/ui/ListItem';
import { Button, Text, View } from 'react-native';

const ScratchcardCard = () => {
  return (
    <Card title="즉석복권 미션">
      <View className="gap-4">
        {scratchcards.map(({ id, type, title, result, prizes }) => {
          const isCompleted = !!result;
          const maxAmount = prizes.reduce((acc, cur) => {
            return Math.max(acc, cur.amount);
          }, 0);

          const props = {
            title,
            description: `최대 ${maxAmount.toLocaleString()}원`,
            icon: Speetto[type].icon,
            button: {
              title: isCompleted
                ? result?.prize?.type === 'lottery'
                  ? `${result?.prize?.amount}장 받음`
                  : '지급 완료'
                : '복권 긁기',
              disabled: isCompleted,
            },
          };

          return <ListItem {...props} action={<Button {...props.button} />} key={id} />;
        })}
      </View>
    </Card>
  );
};

export default ScratchcardCard;

const Speetto = {
  '5': {
    icon: {
      name: 'accessibility',
      color: 'white',
      bgColor: 'bg-blau-50',
    },
  },
  '30': {
    icon: {
      name: 'accessibility',
      color: 'white',
      bgColor: 'bg-lila-50',
    },
  },
} as const;

// 서버 데이터 타입
type Scratchcard = {
  id: number;
  type: '5' | '30';
  title: string;
  result?: { hasWon: boolean; prize?: { id: number; type: string; amount: number } };
  prizes: { id: number; type: string; amount: number; probability: number }[];
};

const scratchcards: Scratchcard[] = [
  {
    id: 1,
    type: '5',
    title: '럭키슈피또 5',
    result: {
      hasWon: true,
      prize: {
        id: 1,
        type: 'lottery',
        amount: 5,
      },
    },
    prizes: [
      {
        id: 1,
        type: 'lottery',
        amount: 5,
        probability: 0.1,
      },
      {
        id: 2,
        type: 'lottery',
        amount: 10,
        probability: 0.1,
      },
      {
        id: 3,
        type: 'gifticon',
        amount: 1_000,
        probability: 0.1,
      },
      {
        id: 4,
        type: 'gifticon',
        amount: 5_000,
        probability: 0.1,
      },
    ],
  },
  {
    id: 2,
    type: '5',
    title: '럭키슈피또 5',
    prizes: [
      {
        id: 1,
        type: 'lottery',
        amount: 5,
        probability: 0.1,
      },
      {
        id: 2,
        type: 'lottery',
        amount: 10,
        probability: 0.1,
      },
      {
        id: 3,
        type: 'gifticon',
        amount: 1_000,
        probability: 0.1,
      },
      {
        id: 4,
        type: 'gifticon',
        amount: 5_000,
        probability: 0.1,
      },
    ],
  },
  {
    id: 3,
    type: '30',
    title: '럭키슈피또 30',
    prizes: [
      {
        id: 1,
        type: 'lottery',
        amount: 10,
        probability: 0.1,
      },
      {
        id: 2,
        type: 'lottery',
        amount: 30,
        probability: 0.1,
      },
      {
        id: 3,
        type: 'gifticon',
        amount: 10_000,
        probability: 0.1,
      },
      {
        id: 4,
        type: 'gifticon',
        amount: 50_000,
        probability: 0.1,
      },
    ],
  },
  {
    id: 4,
    type: '30',
    title: '럭키슈피또 30',
    result: {
      hasWon: false,
    },
    prizes: [
      {
        id: 1,
        type: 'lottery',
        amount: 10,
        probability: 0.1,
      },
      {
        id: 2,
        type: 'lottery',
        amount: 30,
        probability: 0.1,
      },
      {
        id: 3,
        type: 'gifticon',
        amount: 10_000,
        probability: 0.1,
      },
      {
        id: 4,
        type: 'gifticon',
        amount: 50_000,
        probability: 0.1,
      },
    ],
  },
];
