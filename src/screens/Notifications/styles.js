import { Dimensions, StyleSheet } from 'react-native';
const { width, height: deviceHeight } = Dimensions.get('window');
import colorPalette from '../../config/colorPalette';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.grayBg4,
  },
  emptyContainer: {
    width: '100%',
    flexGrow: 0,
    flexBasis: 80,
    flexShrink: 0,
    borderBottomColor: colorPalette.red,
    borderBottomWidth: 2,
  },
  notificationItem: {
    height: 80,
    backgroundColor: colorPalette.grayBg5,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderBottomColor: colorPalette.grayText3,
    borderTopColor: colorPalette.grayText3
  },
  moreMenu: {
    width: '100%',
    flex: 1,
    height: deviceHeight,
    position: 'absolute',
    left: 0,
    backgroundColor: colorPalette.transparent,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  moreMenuBg: {
    position: 'absolute',
    width: '100%',
    height: deviceHeight,
    backgroundColor: colorPalette.som,
    zIndex: 999
  },
  moreMenuImg: {
    zIndex: 1000,
    marginBottom: 30,
  },
  moreMenuTouchable: {
    zIndex: 1000,
    marginVertical: 15
  },
  moreMenuText: {
    fontSize: 16,
    fontWeight: '600',
    color: colorPalette.dirtyWhite
  }
});
export default styles;