import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.grayBg4,
  },
  programsContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  program: {
    marginVertical: 5,
    marginHorizontal: 5,
  },
});
export default styles;
