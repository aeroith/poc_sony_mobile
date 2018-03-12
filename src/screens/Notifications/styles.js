import { StyleSheet } from 'react-native';
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
  }
});
export default styles;
