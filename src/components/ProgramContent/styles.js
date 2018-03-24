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
    borderBottomWidth: 1,
    borderColor: colorPalette.grayBorder1,
  },
  stickySectionText: {
    color: colorPalette.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  stickySectionWrapper: {
    flex: 1,
    paddingTop: 28,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  stickySeasonButton: {
    height: '100%',
    width: 100,
  },
});

const stickyHeaderStyle = {
  height: STICKY_HEADER_HEIGHT
};

export { stickyHeaderStyle };
export default styles;
