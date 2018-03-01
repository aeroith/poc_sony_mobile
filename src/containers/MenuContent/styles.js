import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';

const fontSize = 14;

const styles = StyleSheet.create({
  menuContentWrapper: {
    flex: 1,
  },
  menuItemWrapper: {
    flexDirection: 'row',
    paddingBottom: 15,
    paddingHorizontal: 10,
  },
  menuItemBordered: {
    borderBottomColor: colorPalette.grayBg5,
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
  menuItemText: {
    flex: 1,
    fontSize,
    textAlignVertical: 'center',
    paddingTop: fontSize / 1.2,
    paddingHorizontal: 15,
    color: colorPalette.white,
  },
  channelInfoImage: {
    marginLeft: 15,
  },
  channelInfoText: {
    height: 40
  },
  selectedMenuItem: {
    borderRightColor: colorPalette.red,
    borderRightWidth: 3,
  },
});
export default styles;
