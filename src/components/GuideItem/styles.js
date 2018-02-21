import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';

const styles = StyleSheet.create({
  guideItemContentContainer: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  guideItemTextTitle: {
    color: colorPalette.white,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 10,
    marginVertical: 2,
  },
  guideItemTextSubtitle: {
    fontSize: 12,
    color: colorPalette.white,
    marginLeft: 10,
    marginVertical: 2,
  },
  guideItemAiringContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 10,
    marginVertical: 2,
  },
  guideItemTextAiring: {
    fontSize: 12,
    color: colorPalette.white,
  },
  guideItemIconAiring: {
    color: colorPalette.white,
    marginRight: 5,
    bottom: -1.25,
  },
  guideItemMainContainer: {
    backgroundColor: colorPalette.som,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderBottomColor: colorPalette.grayText3,
    borderTopColor: colorPalette.grayText3
  },
  guideItemImageContainer: {
    borderRightWidth: 1,
    borderRightColor: colorPalette.grayText3,
    flex: 2,
    flexBasis: 125,
    flexGrow: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideItemImage: {
    margin: 12.5,
    width: 100,
    height: 60
  },
  guideItemNotificationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  guideItemNotificationIcon: {
    color: colorPalette.white,
  }
});

export default styles;
