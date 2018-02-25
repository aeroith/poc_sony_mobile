import { Easing } from 'react-native';
import Drawer from './index';

const drawerConfig = {
  drawerWidth: 250,
  type: Drawer.types.Default,
  maskAlpha: 0.8,
  showMask: true,
  drawerPosition: Drawer.positions.Left,
  easingFunc: Easing.linear,
  duration: 100,
};

export default drawerConfig;
