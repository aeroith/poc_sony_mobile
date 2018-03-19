import colorPalette from '../../config/colorPalette';

const parallaxBackgroundHeight = 250;

const style = {
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
    shadowColor: colorPalette.black,
    shadowOpacity: 0.4,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 2,
    color: colorPalette.white,
  },
  wrapper: {
    width: '100%',
  }
};

export default style;
