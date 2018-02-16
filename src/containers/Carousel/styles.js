import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';


export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colorPalette.grayBg4,
  },
  back: {
    margin: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 20,
    color: colorPalette.grayText1
  },
});
