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
  content: {
    shadowColor: colorPalette.black,
    shadowOpacity: 1,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 14,
  },
  contentWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  contentSection: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: colorPalette.grayText2,
  },
  contentHeaderText: {
    fontSize: 16,
    paddingBottom: 10,
    color: colorPalette.white,
  },
  contentText: {
    fontSize: 14,
    color: colorPalette.grayText1,
    lineHeight: 22,
  },
  seasonButton: {
    height: 60,
    maxWidth: 150,
    backgroundColor: 'transparent',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  seasonButtonText: {
    fontSize: 16,
    color: colorPalette.white,
  },
  seasonButtonIcon: {
    paddingLeft: 10,
  },
  socialIconButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderColor: colorPalette.grayText1,
    borderWidth: 1,
    borderRadius: 30,
    marginRight: 18,
    marginBottom: 19,
  },
});

const stickyHeaderStyle = {
  height: STICKY_HEADER_HEIGHT
};

export { stickyHeaderStyle };
export default styles;
