import { TabBarIcon } from '@/components/tabbar-icon';
import BottomNavigationTabs from '@/features/shared/ui/BottomNavigationTabs';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Tabs } from 'expo-router/tabs';
import { useCallback } from 'react';
import { Pressable, Text, View } from 'react-native';

const TabsLayout = () => {
  const handleActionPress = useCallback(() => {
    // Your action here, like showing bottom sheet
    console.log('Action button pressed');
  }, []);

  // return <BottomNavigationTabs />;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
        tabBarStyle: {
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'red',
          height: 96,
          // gap: 10,
        },
        tabBarItemStyle: {
          borderWidth: 1,
          borderColor: 'blue',
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
          // tabBarLabel: '응모하기',
          tabBarIcon: ({ color }) => <TabBarIcon name="ticket-outline" color="white" />,
          tabBarItemStyle: {
            // borderWidth: 1,
            marginTop: -44,
            // paddingBottom: 20,
          },
          tabBarIconStyle: {
            backgroundColor: '#FA8B30',
            width: 72,
            height: 72,
            borderRadius: 36,
            borderWidth: 8,
            borderColor: 'white',
            marginBottom: 4,
            // shadowColor: '#FA8B30',
            // shadowOffset: { width: 0, height: -4 },
            // shadowOpacity: 0.25,
            // shadowRadius: 3.84,
            // elevation: 3,
          },
          tabBarLabelStyle: {
            // borderWidth: 1,
            fontSize: 14,
          },
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
