import { Stack } from 'expo-router';

const LotteriesLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: true, headerBackVisible: true }}>
      <Stack.Screen
        name="index"
        options={{
          title: '복권 뽑기',
          headerShown: true,
          headerBackVisible: true,
          headerBackButtonDisplayMode: 'minimal',
          headerShadowVisible: false,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="pending"
        options={{
          title: '복권 뽑기',
          headerShown: true,
          headerBackVisible: true,
          headerBackButtonDisplayMode: 'minimal',
          headerShadowVisible: false,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="generated"
        options={{
          title: '복권 뽑기',
          headerShown: true,
          headerBackVisible: true,
          headerBackButtonDisplayMode: 'minimal',
          headerShadowVisible: false,
          headerTitle: '',
        }}
      />
    </Stack>
  );
};

export default LotteriesLayout;
