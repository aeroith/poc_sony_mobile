import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.grayBg4,
  },
  emptyContainer: {
    width: '100%',
    flexGrow: 0,
    flexBasis: 60,
    flexShrink: 0,
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
