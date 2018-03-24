import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';

const STICKY_HEADER_HEIGHT = 65;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.grayBg4,
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    paddingTop: 28,
    paddingLeft: 50,
    borderBottomWidth: 1,
    borderColor: colorPalette.grayBorder1,
  },
  stickySectionText: {
    color: colorPalette.white,
    fontWeight: 'bold',
    fontSize: 16,
  }
});
export default styles;
