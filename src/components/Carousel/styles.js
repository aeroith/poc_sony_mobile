import { StyleSheet, Dimensions } from 'react-native';
import colorPalette from '../../config/colorPalette';

const { width } = Dimensions.get('window');
const height = 250;

const INDICATOR_SIZE = 8;

const headerShadowProps = {
  backgroundColor: colorPalette.transparent,
  shadowColor: colorPalette.black,
  shadowOpacity: 0.4,
  shadowOffset: { width: 2, height: 2 },
  shadowRadius: 2,
};

export default StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
  },
  innerFrame: {
    position: 'absolute',
    height,
    backgroundColor: 'rgba(0, 0, 0, .4)'
  },
  scrollContainer: {
    flex: 1,
    flexGrow: 0,
    flexBasis: height,
    overflow: 'hidden',
  },
  subContainer: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainHeader: {
    fontSize: 25,
    position: 'absolute',
    bottom: 35,
    left: 20,
    color: colorPalette.white,
    fontWeight: '600',
    ...headerShadowProps,
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
    ...headerShadowProps,
  },
  image: {
    width,
    height,
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
