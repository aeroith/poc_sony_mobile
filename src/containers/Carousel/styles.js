import { Dimensions, StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colorPalette.grayBg4,
  }
});
