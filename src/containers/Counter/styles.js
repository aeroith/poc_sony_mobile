import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorPalette.grayBg4,
  },
  back: {
    margin: 10,
    fontSize: 20,
    color: colorPalette.grayText1,
  },
});
export default styles;
