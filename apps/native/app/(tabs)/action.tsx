import { Redirect } from 'expo-router';

export default function ActionScreen() {
  // This screen will never be shown as we prevent navigation in the tab press handler
  return <Redirect href="/" />;
}
