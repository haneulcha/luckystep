import { TabList, TabSlot, TabTrigger, Tabs } from 'expo-router/ui';
import { Text, View } from 'react-native';

const BottomNavigationTabs = () => {
  return (
    <Tabs>
      <TabSlot />
      <TabList>
        <TabTrigger name="index" href="/(tabs)">
          <Text>홈</Text>
        </TabTrigger>
        <TabTrigger name="my-logs" href="/my-logs">
          <Text>응모 내역</Text>
        </TabTrigger>
        <TabTrigger name="action" href="/action">
          <Text>응모하기</Text>
        </TabTrigger>
        <TabTrigger name="draw-lottery" href="/draw-lottery">
          <Text>추첨 결과</Text>
        </TabTrigger>
        <TabTrigger name="settings" href="/settings">
          <Text>설정</Text>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
};

export default BottomNavigationTabs;
