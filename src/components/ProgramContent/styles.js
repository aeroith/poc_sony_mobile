import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';

const STICKY_HEADER_HEIGHT = 65;

const episodeItemDimensions = {
  height: 55,
  imageWidth: 75,
};

const stickyHeaderStyle = {
  height: STICKY_HEADER_HEIGHT,
  button: {
    height: 50,
    width: 50,
  }
};

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
  stickySectionLeftContent: {
    width: stickyHeaderStyle.button.width,
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
    width: stickyHeaderStyle.button.width,
  },
  stickySectionWrapper: {
    flex: 1,
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stickySocialButton: {
    height: stickyHeaderStyle.button.height,
    width: stickyHeaderStyle.button.width,
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
    height: episodeItemDimensions.height,
    marginBottom: 5,
  },
  episodeNumber: {
    height: episodeItemDimensions.height,
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
    height: episodeItemDimensions.height,
    width: episodeItemDimensions.imageWidth,
    backgroundColor: colorPalette.grayBg2,
  },
  episodeDescription: {
    flex: 1,
    padding: 15,
    height: episodeItemDimensions.height,
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

export { stickyHeaderStyle, episodeItemDimensions };
export default styles;
