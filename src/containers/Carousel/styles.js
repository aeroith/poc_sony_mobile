import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';

// Must be passed from the container since images with url
// requires fixed height and width
export const CAROUSEL_HEIGHT = 300;

export default StyleSheet.create({
  container: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colorPalette.grayBg4,
  }
});
