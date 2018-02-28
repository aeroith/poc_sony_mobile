import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  spinner: {
    position: 'absolute',
    marginLeft: -10,
    marginTop: -10,
  },
  image: {
    opacity: 1,
  },
  imageLoading: {
    opacity: 0,
  }
});

export default style;
