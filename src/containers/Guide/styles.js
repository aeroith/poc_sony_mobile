import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';


const styles = StyleSheet.create({
  mainContainer: {
    flex: 7,
    width: '100%',
    backgroundColor: colorPalette.som
  },
  searchBarIconStyle: {
    color: colorPalette.greenBg1,
  },
  searchBarContainer: {
    backgroundColor: colorPalette.som,
    width: '100%',
    flex: 7,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
