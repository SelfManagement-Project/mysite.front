import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const platformStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
    padding: width > 768 ? 20 : 10,
  },
  header: {
    backgroundColor: '#3498db',
    padding: 10,
    color: '#ffffff',
    fontSize: 18,
  },
  footer: {
    backgroundColor: '#2ecc71',
    padding: 10,
    color: '#ffffff',
    fontSize: 16,
  },
});
