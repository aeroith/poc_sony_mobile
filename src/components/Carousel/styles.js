import { StyleSheet, Dimensions } from 'react-native';
import colorPalette from '../../config/colorPalette';

const { width } = Dimensions.get('window');
const height = width * 0.9;

const INDICATOR_SIZE = 10;
// const scrollBarVal = this.animVal.interpolate({
//   inputRange: [30, 60],
//   outputRange: [-this.itemWidth, this.itemWidth],
//   extrapolate: 'clamp',
// })

export default StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
  },
  innerFrame: {
    position: 'absolute',
    height,
    width,
    backgroundColor: 'rgba(0, 0, 0, .4)'
  },
  scrollContainer: {
    flex: 1,
    flexGrow: 0,
    flexBasis: 300,
    overflow: 'hidden',
  },
  subContainer: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    flexDirection: 'row',
  },
  mainHeader: {
    fontSize: 25,
    position: 'absolute',
    bottom: 35,
    left: 20,
    color: colorPalette.white,
    backgroundColor: colorPalette.transparent,
    shadowColor: colorPalette.black,
    shadowOpacity: 0.4,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 2,
    fontWeight: '600',
  },
  subHeader: {
    fontSize: 13,
    color: colorPalette.grayText1,
    backgroundColor: colorPalette.transparent,
    shadowColor: colorPalette.black,
    shadowOpacity: 0.8,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 2,
    fontWeight: '400',
  },
  image: {
    width,
    height,
    resizeMode: 'cover',
  },
  indicatorActive: {
    backgroundColor: colorPalette.grayText1,
  },
  indicator: {
    backgroundColor: colorPalette.transparent,
    borderWidth: 1.5,
    borderColor: colorPalette.grayText1,
    width: INDICATOR_SIZE,
    height: INDICATOR_SIZE,
    borderRadius: INDICATOR_SIZE / 2
  }
});
