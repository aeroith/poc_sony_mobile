import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';
import { CAROUSEL_HEIGHT as height } from '../../containers/Carousel/styles';

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
    flex: 1,
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
    overflow: 'hidden',
  },
  contentContainer: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    bottom: 0,
    marginHorizontal: 20,
    marginVertical: 15,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainHeaderContainer: {
    flexShrink: 0,
    flexBasis: 80,
    paddingVertical: 7,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainHeader: {
    fontSize: 25,
    color: colorPalette.white,
    fontWeight: '600',
    marginRight: 14,
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
  indicatorFirstChild: {
    marginLeft: 0,
  },
  tag: {
    marginLeft: 14,
  },
  tagFirstChild: {
    marginLeft: 0,
  }
});
