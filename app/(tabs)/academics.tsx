import { View, Text, StyleSheet } from 'react-native';

export default function Tab() {
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Text style={styles.linkText}>Search courses</Text>
        <View>
          <Text style={styles.searchButton}>Select term</Text>
        </View>
        <View style={styles.searchButton}>
          <Text>Select subject</Text>
        </View>
        <View style={styles.searchButton}>
          <Text>Select status</Text>
        </View>
        <View style={styles.searchButton}>
          <Text>Select section</Text>
        </View>
        <View style={styles.searchEnter}>
          <Text style={styles.searchEnterText}>Search classes</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 12,
  },
  link: {
    width: '100%',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  linkContainer: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  linkText: {
    fontSize: 16,
    fontWeight: '500'
  },
  search: {
    width: '100%',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    backgroundColor: '#fff',
  },
  searchButton: {
    width: '100%',
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    backgroundColor: '#eee',
  },
  searchEnter: {
    width: '100%',
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#002856',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchEnterText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff'
  }
});