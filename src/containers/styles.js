import { StyleSheet } from 'react-native';
import colorPalette from '../config/colorPalette';

const zIndexDrawer = 999999;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    zIndex: 1,
    position: 'relative',
  },
  app: {
    flex: 1,
    zIndex: 1,
  },
  statusBar: {
    zIndex: 11,
  },
  drawerContent: {
    flex: 1,
    zIndex: zIndexDrawer,
  },
  drawerContainer: {
    flex: 1,
    zIndex: zIndexDrawer,
  },
  drawer: {
    zIndex: zIndexDrawer,
    backgroundColor: colorPalette.grayBg4,
    paddingTop: 30,
  },
  mask: {
    backgroundColor: 'black',
    zIndex: zIndexDrawer,
  },
});

const drawerCustomStyles = { drawer: styles.drawer, mask: styles.mask };
export { drawerCustomStyles };
export default styles;
