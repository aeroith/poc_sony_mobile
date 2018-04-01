import { StyleSheet } from 'react-native';
import colorPalette from '../config/colorPalette';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    zIndex: 1,
    position: 'relative',
    backgroundColor: colorPalette.som,
  },
  app: {
    flex: 1,
    zIndex: 1,
    backgroundColor: 'black',
    opacity: 1,
  },
  statusBar: {
    zIndex: 11,
  },
  hideAppContent: {
    opacity: 0,
  },
});
export default styles;
