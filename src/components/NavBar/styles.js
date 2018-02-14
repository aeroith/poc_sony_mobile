import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';

const styles = StyleSheet.create({
  navBarWrapper: {
    backgroundColor: colorPalette.grayBg3,
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
    height: 60,
    borderBottomColor: '#ededed',
    borderStyle: 'solid',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  navBarText: {
    color: colorPalette.white,
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default styles;
