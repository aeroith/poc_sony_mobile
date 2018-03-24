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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
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
    paddingHorizontal: 18,
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

export { foregroundStyles };
