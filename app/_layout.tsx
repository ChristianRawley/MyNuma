import { Stack } from 'expo-router/stack';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: true, title: 'My Numa', headerStyle: {backgroundColor: '#002856'}, headerTitleStyle: {color: '#ffffff'} }} />
    </Stack>
  );
}