import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Text, View } from 'react-native';

type ListItemProps = {
  title: string;
  description: string;
  icon: {
    name: ComponentProps<typeof Ionicons>['name'];
    color: string;
    bgColor: string;
  };
  action: React.ReactNode;
};

const ListItem = ({ title, description, icon, action }: ListItemProps) => {
  return (
    <View className="flex-row items-center gap-4">
      <View className={['size-16 flex-row items-center justify-center gap-2 rounded-lg', icon.bgColor].join(' ')}>
        <Ionicons name={icon.name} size={24} color={icon.color} />
      </View>

      <View className="flex-1 justify-center gap-2">
        <Text className="font-bold text-md text-mono-90">{title}</Text>
        <Text className="text-mono-70 text-sm">{description}</Text>
      </View>

      {action}
    </View>
  );
};

export default ListItem;
