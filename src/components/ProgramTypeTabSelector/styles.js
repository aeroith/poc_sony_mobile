import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  tabItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    flexBasis: 120,
  },
  tabItemContainerActive: {
    borderBottomWidth: 2,
    borderBottomColor: colorPalette.red,
  },
  tabItemText: {
    color: colorPalette.white,
    fontWeight: '500',
    fontSize: 15,
  },
  tabItemTextActive: {
    top: 1,
  }
});

export default styles;
