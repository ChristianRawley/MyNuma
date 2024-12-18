import { Link } from 'expo-router';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function Bookmarks() {
  return (
    <View style={styles.container}>
        <Text>Bookmarks</Text>
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
