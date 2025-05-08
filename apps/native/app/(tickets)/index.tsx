import { Link } from 'expo-router';
import { Text, View } from 'react-native';

const Ticket = () => {
  return (
    <View className="flex-1 items-center justify-center border bg-gelb-20">
      <Text>Ticket 잉잉</Text>
      <Link replace href="/(tickets)/acquisition-result">
        이동
      </Link>
    </View>
  );
};

export default Ticket;
