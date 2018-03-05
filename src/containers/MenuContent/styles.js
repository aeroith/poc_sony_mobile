import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';

const fontSize = 14;

const styles = StyleSheet.create({
  menuContentWrapper: {
    flex: 1,
  },
  menuItemWrapper: {
    flexDirection: 'row',
    alignContent: 'center',
    paddingRight: 15,
    paddingLeft: 20,
    height: 50,
  },
  menuItemBordered: {
    borderBottomColor: colorPalette.grayBg5,
    borderBottomWidth: 2,
    borderStyle: 'solid',
  },
  menuItemTextWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  menuItemText: {
    fontSize,
    color: colorPalette.white,
  },
  channelInfoText: {
    paddingLeft: 15,
    marginTop: -8,
  },
  selectedMenuItem: {
    borderRightColor: colorPalette.red,
    borderRightWidth: 3,
  },
  menuSection: {
    borderColor: colorPalette.grayBg5,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderStyle: 'solid',
    marginTop: 15,
  },
  menuSectionHeader: {
    backgroundColor: colorPalette.grayBg5,
    color: colorPalette.white,
    paddingVertical: 12,
    paddingLeft: 20,
    fontSize: 12,
    marginBottom: 10,
  },
});
export default styles;
