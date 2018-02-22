import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';

// Must be passed from the container since images with url
// requires fixed height and width
export const CAROUSEL_HEIGHT = 300;

export default StyleSheet.create({
  container: {
    width: '100%',
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  searchBarContainer: {
    backgroundColor: colorPalette.som,
    width: '100%',
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarIconStyle: {
    color: colorPalette.greenBg1,
  }
});
