import colorPalette from '../../config/colorPalette';

const parallaxBackgroundHeight = 250;
const textShadow = {
  shadowColor: colorPalette.black,
  shadowOpacity: 0.4,
  shadowOffset: { width: 2, height: 2 },
  shadowRadius: 2,
};

const foregroundStyles = {
  container: {
    height: parallaxBackgroundHeight,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  headerText: {
    fontSize: 25,
    fontWeight: '600',
    marginRight: 14,
    backgroundColor: 'transparent',
    ...textShadow,
    color: colorPalette.white,
  },
  wrapper: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  dateRange: {
    fontSize: 13,
    color: colorPalette.grayText1,
    fontWeight: '400',
    paddingTop: 6,
    ...textShadow,
  }
};

const contentStyles = {
  wrapper: {
    shadowColor: colorPalette.black,
    shadowOpacity: 1,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 15,
  }
};

export { foregroundStyles, contentStyles };
