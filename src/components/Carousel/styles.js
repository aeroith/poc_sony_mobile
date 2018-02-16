import { StyleSheet, Dimensions } from 'react-native';
import colorPalette from '../../config/colorPalette';

const { width } = Dimensions.get('window');
const height = 250;

const INDICATOR_SIZE = 8;
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
    flexBasis: 250,
    overflow: 'hidden',
  },
  subContainer: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width,
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
  indicatorContainer: {
    flexDirection: 'row',
    right: 50,
    alignItems: 'center',
  },
  indicatorActive: {
    backgroundColor: colorPalette.carouselActive,
  },
  indicator: {
    marginLeft: 7,
    backgroundColor: colorPalette.carousel,
    borderColor: colorPalette.grayText1,
    width: INDICATOR_SIZE,
    height: INDICATOR_SIZE,
    borderRadius: INDICATOR_SIZE / 2
  },
});
