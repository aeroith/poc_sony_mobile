import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';

const styles = StyleSheet.create({
  searchBarWrapper: {
    height: 30,
    marginTop: 30,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  searchBarTextInput: {
    borderColor: colorPalette.grayText2,
    color: colorPalette.white,
    fontWeight: '300',
    fontSize: 13,
    borderWidth: 1,
    height: 30,
    paddingHorizontal: 10,
    borderRadius: 4,
  }
});
export default styles;
