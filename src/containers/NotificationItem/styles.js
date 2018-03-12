import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 0,
    flexBasis: 80,
    backgroundColor: colorPalette.grayBg5,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderBottomColor: colorPalette.grayText3,
    borderTopColor: colorPalette.grayText3
  }
});

export default styles;
