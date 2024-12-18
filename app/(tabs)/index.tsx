import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from 'react-native';

export default function Tab() {
  NavigationBar.setBackgroundColorAsync("white");
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#002856"/>
      <Text>News & Resources</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
