import { StyleSheet } from 'react-native';
import colorPalette from '../../config/colorPalette';
import config from '../../components/Drawer/config';

const zIndexDrawer = 999999;
const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    zIndex: zIndexDrawer,
  },
  drawer: {
    width: config.drawerWidth,
    zIndex: zIndexDrawer,
    backgroundColor: colorPalette.grayBg4,
    paddingTop: 20,
  },
  mask: {
    backgroundColor: 'black',
    zIndex: zIndexDrawer,
  },
});
export default styles;
