import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const height = width * 0.8;


export default StyleSheet.create({
  scrollContainer: {
    height: 200,
  },
  image: {
    width,
    height,
  },
});
