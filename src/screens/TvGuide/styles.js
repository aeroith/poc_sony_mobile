import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colorPalette.white,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: colorPalette.grayText1,
  },
  instructions: {
    textAlign: 'center',
    color: colorPalette.grayText1,
    marginBottom: 5,
  },
});

export default styles;
