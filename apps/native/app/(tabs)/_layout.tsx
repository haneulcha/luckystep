import { Link } from "expo-router";
import { Tabs } from "expo-router/tabs";
import { TabBarIcon } from "@/components/tabbar-icon";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarIconStyle: {
          marginBottom: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="flower-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-logs"
        options={{
          title: "응모 내역",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="file-tray-full-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="draw-lottery"
        options={{
          title: "추첨 결과",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="trophy-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "설정",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="settings-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
