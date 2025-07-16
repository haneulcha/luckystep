import { TabBarIcon } from '@/components/tabbar-icon';
import { Ionicons } from '@expo/vector-icons';
import { Link, router, useRouter } from 'expo-router';
import { Tabs } from 'expo-router/tabs';
// import { TabList, TabSlot, TabTrigger, Tabs } from 'expo-router/ui';
import { useCallback } from 'react';
import { Pressable, Text, View } from 'react-native';

const tabs = [
  {
    name: 'index',
    href: '/',
    icon: 'home-outline',
    label: '홈',
  },
  {
    name: 'my-logs',
    href: '/my-logs',
    icon: 'file-tray-full-outline',
    label: '응모 내역',
  },
  {
    name: 'action',
    href: '/action',
    icon: 'ticket-outline',
    label: '응모하기',
  },
  {
    name: 'draw-lottery',
    href: '/draw-lottery',
    icon: 'trophy-outline',
    label: '추첨 결과',
  },
  {
    name: 'settings',
    href: '/settings',
    icon: 'settings-outline',
    label: '설정',
  },
] as const;

const TabsLayout = () => {
  const router = useRouter();
  const handleActionPress = useCallback(() => {
    // Your action here, like showing bottom sheet
    console.log('Action button pressed');
    router.push('/(lotteries)/pending');
  }, [router]);

  // return (
  //   <Tabs>
  //     <TabSlot />
  //     <TabList className="mb-safe border">
  //       {/* {tabs.map((tab) => (
  //         <TabTrigger key={tab.name} name={tab.name} href={tab.href} className="flex-1">
  //           <View className="w-full flex-col items-center justify-center gap-2 border py-1">
  //             <TabBarIcon name={tab.icon} color="black" />
  //             <Text className="text-xs">{tab.label}</Text>
  //           </View>
  //         </TabTrigger>
  //       ))} */}
  //     </TabList>
  //   </Tabs>
  // );
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
        tabBarStyle: {
          backgroundColor: 'white',
          height: 96,
        },
        tabBarIconStyle: {
          marginBottom: 4,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color }) => <TabBarIcon name="flower-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-logs"
        options={{
          title: '응모 내역',
          tabBarIcon: ({ color }) => <TabBarIcon name="file-tray-full-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="action"
        options={{
          title: '응모하기',
          tabBarIcon: ({ color }) => <TabBarIcon name="ticket-outline" color={color} />,
        }}
        listeners={{
          tabPress: (e) => {
            // Prevent default navigation
            e.preventDefault();
            handleActionPress();
          },
        }}
      />

      <Tabs.Screen
        name="draw-lottery"
        options={{
          title: '추첨 결과',
          tabBarIcon: ({ color }) => <TabBarIcon name="trophy-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: '설정',
          tabBarIcon: ({ color }) => <TabBarIcon name="settings-outline" color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
