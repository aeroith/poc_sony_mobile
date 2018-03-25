import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';

const styles = StyleSheet.create({
  navBarWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 11,
  },
  navBarNoFloat: {
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: colorPalette.grayBorder1,
    borderStyle: 'solid',
  },
  navBarWrapperStaticWidth: {
    marginRight: 50,
  },
  linearGradientComponent: {
    position: 'relative',
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
  linearGradientWrapperNoFloat: {
    height: 65,
  },
  linearGradientWrapper__searchBarOpen: {
    paddingTop: 0,
    height: 35,
  },
  navBarHeaderText: {
    color: colorPalette.white,
    fontWeight: 'bold',
    fontSize: 16,
    maxWidth: 200,
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
  },
  programWrapper: {
    paddingTop: 30,
    paddingHorizontal: 15,
    height: 65,
    display: 'flex',
  }
});
export default styles;
