import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';

const STICKY_HEADER_HEIGHT = 65;
const episodeItemHeight = 55;

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
  stickSectionLeftContent: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stickySectionMidContent: {
    color: colorPalette.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  stickySectionRightContent: {
    width: 50,
  },
  stickySectionWrapper: {
    flex: 1,
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stickySocialButton: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    shadowColor: colorPalette.black,
    shadowOpacity: 1,
    shadowOffset: { width: 2, height: -20 },
    shadowRadius: 40,
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
    height: 40,
    width: 40,
    borderColor: colorPalette.grayText1,
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 18,
    marginBottom: 19,
  },
  episodes: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  episode: {
    flexDirection: 'row',
    height: episodeItemHeight,
    marginBottom: 5,
  },
  episodeNumber: {
    height: episodeItemHeight,
    width: 30,
    backgroundColor: colorPalette.grayBg2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  episodeNumberText: {
    color: colorPalette.white,
    fontWeight: 'bold',
  },
  episodeImage: {
    height: episodeItemHeight,
    width: 75,
    backgroundColor: colorPalette.grayBg2,
  },
  episodeDescription: {
    flex: 1,
    padding: 15,
    height: episodeItemHeight,
    justifyContent: 'center',
    backgroundColor: colorPalette.grayBg2,
    borderRightWidth: 2,
    borderRightColor: colorPalette.grayText1
  },
  episodeName: {
    fontSize: 14,
    color: colorPalette.white,
    lineHeight: 22,
  },
});

const stickyHeaderStyle = {
  height: STICKY_HEADER_HEIGHT
};

export { stickyHeaderStyle };
export default styles;
