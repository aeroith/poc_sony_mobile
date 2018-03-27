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
  },
  overlay: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});

export default style;
