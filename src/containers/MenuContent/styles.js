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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colorPalette.grayBg5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  menuSectionHeaderText: {
    fontSize: 12,
    color: colorPalette.white,
  },
  menuSectionHeaderIcon: {

  }
});
export default styles;
