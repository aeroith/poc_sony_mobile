import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorPalette.grayBg3,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: colorPalette.white,
  },
  instructions: {
    textAlign: 'center',
    color: colorPalette.grayText1,
    marginBottom: 5,
  },
});

export default styles;
