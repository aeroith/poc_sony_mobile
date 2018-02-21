import { StyleSheet, Dimensions } from 'react-native';
import colorPalette from '../../config/colorPalette';

const { width: deviceWidth } = Dimensions.get('window');
const TRIANGLE_SIZE = 16;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabItem: {
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
    position: 'absolute',
    bottom: -(TRIANGLE_SIZE + 2), // also including border width
    alignSelf: 'center',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: TRIANGLE_SIZE / 2,
    borderRightWidth: TRIANGLE_SIZE / 2,
    borderBottomWidth: 0,
    borderLeftWidth: TRIANGLE_SIZE / 2,
    borderTopColor: colorPalette.grayBg1,
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
});

export default styles;
