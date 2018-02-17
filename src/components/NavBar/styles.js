import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';

const styles = StyleSheet.create({
  navBarWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 80,
    zIndex: 999999,
  },
  linearGradientWrapper: {
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
    height: 80,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  linearGradientWrapper__searchBarOpen: {
    paddingTop: 0,
  },
  navBarHeaderText: {
    color: colorPalette.white,
    fontWeight: 'bold',
    fontSize: 16,
    maxWidth: 120,
    backgroundColor: 'transparent'
  },
  navBarText: {
    backgroundColor: 'transparent',
    color: colorPalette.white,
    width: 60,
  },
  navBarButton: {
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  }
});
export default styles;
