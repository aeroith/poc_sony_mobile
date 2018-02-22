import { StyleSheet, Dimensions } from 'react-native';
import colorPalette from '../../config/colorPalette';

const { width: deviceWidth } = Dimensions.get('window');
const TRIANGLE_SIZE = 16;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flex: 4,
  },
  bottomBar: {
    backgroundColor: colorPalette.grayBg2,
    flex: 1,
  },
  tabItem: {
    position: 'relative',
    paddingHorizontal: deviceWidth / 16,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colorPalette.grayBg1,
    borderLeftWidth: 1,
  },
  tabItemActive: {
    borderTopWidth: 2,
    borderTopColor: colorPalette.cyan1,
    borderStyle: 'solid',
  },
  tabItemText: {
    color: colorPalette.grayText1
  },
  tabItemTextActive: {
    top: -1,
    color: colorPalette.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  triangle: {
    bottom: -4, // also including border width
    alignSelf: 'center',
    width: 10,
    height: 10,
    zIndex: 999,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: TRIANGLE_SIZE / 2,
    borderRightWidth: TRIANGLE_SIZE / 2,
    borderBottomWidth: 0,
    borderLeftWidth: TRIANGLE_SIZE / 2,
    borderTopColor: colorPalette.white,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textDayNumber: {
    color: colorPalette.white,
    marginLeft: 4,
  },
  textDayNumberActive: {
    top: -1,
  },
});

export default styles;
