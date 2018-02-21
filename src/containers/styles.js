import { StyleSheet } from 'react-native';

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
    shadowColor: '#000',
    // shadowOpacity: 0.4,
    // shadowRadius: 10,
    zIndex: zIndexDrawer,
  },
  mask: {
    backgroundColor: 'black',
    zIndex: zIndexDrawer,
  },
});

const drawerCustomStyles = { drawer: styles.drawer, mask: styles.mask };
export { drawerCustomStyles };
export default styles;
