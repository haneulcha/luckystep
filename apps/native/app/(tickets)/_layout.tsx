import { Stack } from 'expo-router';

const TicketsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: '복권 뽑기',
          headerBackVisible: true,
          headerBackButtonDisplayMode: 'minimal',
          headerShadowVisible: false,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="acquisition-result"
        options={{
          title: '추첨 결과',
          headerShown: true,
          headerBackVisible: false,
        }}
      />
    </Stack>
  );
};

export default TicketsLayout;
